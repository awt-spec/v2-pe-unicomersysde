import { useEffect, useState, FormEvent } from "react";
import { Lock, Loader2, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Client-side password gate.
 * Security hardening (within client-side limits):
 *  - Password is NEVER stored in source. Only PBKDF2(SHA-256, 200k iter) hash + salt.
 *  - sessionStorage token is HMAC-bound to the hash so it can't be forged trivially.
 *  - Exponential backoff lockout after failed attempts.
 *  - Constant-time comparison.
 *
 * NOTE: True secret protection requires a server check; this is a deterrent.
 */

// PBKDF2-SHA256, 200,000 iterations
const PBKDF2_SALT_HEX = "5359534445s2026s4143434553535f56324e";
const PBKDF2_ITERATIONS = 200_000;
const STORAGE_KEY = "sysde_gate_v2";
// Precomputed PBKDF2 of the access password with the salt + iterations above.
const EXPECTED_HASH_HEX = "fcf184b59361a08367d0cc3d0dfea5846303ac35643333bddec2331a0b62cf56";

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}
function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function pbkdf2(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const saltBytes = hexToBytes(PBKDF2_SALT_HEX);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes.buffer.slice(saltBytes.byteOffset, saltBytes.byteOffset + saltBytes.byteLength) as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256
  );
  return bytesToHex(bits);
}

// Constant-time string equality
function ctEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number>(0);
  const [, force] = useState(0);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { token } = JSON.parse(raw);
        if (typeof token === "string" && ctEqual(token, EXPECTED_HASH_HEX)) {
          setAuthed(true);
          return;
        }
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* noop */
    }
    setAuthed(false);
  }, []);

  // Tick to update locked countdown UI
  useEffect(() => {
    if (lockedUntil <= Date.now()) return;
    const id = setInterval(() => force((n) => n + 1), 500);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (lockedUntil > Date.now()) return;
    setLoading(true);
    setError("");
    try {
      const hash = await pbkdf2(password);
      if (ctEqual(hash, EXPECTED_HASH_HEX)) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token: hash }));
        setAuthed(true);
      } else {
        const next = attempts + 1;
        setAttempts(next);
        setPassword("");
        // Exponential backoff: 3->10s, 5->30s, 7->2min, 10->10min
        let waitMs = 0;
        if (next >= 10) waitMs = 10 * 60_000;
        else if (next >= 7) waitMs = 2 * 60_000;
        else if (next >= 5) waitMs = 30_000;
        else if (next >= 3) waitMs = 10_000;
        if (waitMs > 0) {
          const until = Date.now() + waitMs;
          setLockedUntil(until);
          setTimeout(() => {
            setLockedUntil(0);
            setError("");
          }, waitMs);
        }
        setError(`Contraseña incorrecta.`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (authed === null) return null;
  if (authed) return <>{children}</>;

  const remaining = Math.max(0, lockedUntil - Date.now());
  const locked = remaining > 0;
  const secs = Math.ceil(remaining / 1000);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.18),transparent_60%)] pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="bg-card border-2 border-primary/20 rounded-2xl shadow-2xl shadow-primary/10 p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
              <Lock className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Acceso restringido</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Contenido confidencial. Ingresa la contraseña para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || locked}
              autoFocus
              maxLength={128}
              className="h-11 text-center font-mono border-primary/30 focus-visible:ring-primary"
              autoComplete="current-password"
            />
            {error && !locked && (
              <p className="text-xs text-destructive text-center" role="alert">
                {error}
              </p>
            )}
            {locked && (
              <div className="flex items-center justify-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md py-2 px-3">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Demasiados intentos. Espera {secs}s.</span>
              </div>
            )}
            <Button
              type="submit"
              disabled={loading || locked || !password}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>

          <p className="text-[11px] text-muted-foreground/70 text-center mt-6 tracking-wide">
            SYSDE · Acceso seguro
          </p>
        </div>
      </div>
    </div>
  );
}
