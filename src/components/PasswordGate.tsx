import { useEffect, useState, FormEvent } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// SHA-256("Sysde$2026-Unic#9K")
const PASSWORD_HASH = "06ad7df2582690a36632c5cc62bb1c34d81360d2f2b702349a6f5c8984b8e089";
const STORAGE_KEY = "sysde_access_v1";
const SESSION_HOURS = 24;

async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { exp } = JSON.parse(raw);
        if (typeof exp === "number" && exp > Date.now()) {
          setAuthed(true);
          return;
        }
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch { /* noop */ }
    setAuthed(false);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (lockedUntil > Date.now()) return;
    setLoading(true);
    setError("");
    try {
      const hash = await sha256(password);
      if (hash === PASSWORD_HASH) {
        const exp = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ exp }));
        setAuthed(true);
      } else {
        const next = attempts + 1;
        setAttempts(next);
        setPassword("");
        if (next >= 5) {
          const until = Date.now() + 60_000;
          setLockedUntil(until);
          setError("Demasiados intentos. Espera 60 segundos.");
          setTimeout(() => { setLockedUntil(0); setAttempts(0); setError(""); }, 60_000);
        } else {
          setError(`Contraseña incorrecta (${next}/5).`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (authed === null) return null;
  if (authed) return <>{children}</>;

  const locked = lockedUntil > Date.now();

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Acceso restringido</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Esta propuesta es confidencial. Ingresa la contraseña para continuar.
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
              className="h-11 text-center font-mono"
              autoComplete="current-password"
            />
            {error && (
              <p className="text-xs text-destructive text-center" role="alert">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading || locked || !password}
              className="w-full h-11"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>

          <p className="text-[11px] text-muted-foreground/70 text-center mt-6">
            SYSDE · Unicomer RFP · Sesión válida por {SESSION_HOURS}h
          </p>
        </div>
      </div>
    </div>
  );
}
