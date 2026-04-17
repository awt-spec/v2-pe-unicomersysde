import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Info, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useT } from "@/i18n/LanguageContext";
import { countryPricing, costingTiers, tierForVolume } from "../clausesPricingData";

const fmtUSD = (n: number, dec = 0) =>
  `USD $${n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
const fmtNum = (n: number) => n.toLocaleString("en-US");

type Lang = "es" | "en";
const L = (lang: Lang, es: string, en: string) => (lang === "es" ? es : en);

export default function ClauseRecalc() {
  const { lang } = useT();
  const lng = lang as Lang;

  const [country, setCountry] = useState("Costa Rica");
  const base = countryPricing.find((c) => c.country === country)!;
  const [loans, setLoans] = useState(base.loans);

  const onCountryChange = (c: string) => {
    setCountry(c);
    const cp = countryPricing.find((x) => x.country === c)!;
    setLoans(cp.loans);
  };

  const tier = tierForVolume(loans);
  const sysdeMonthly = Math.max(loans * tier.price, tier.min);
  const sysdeAnnual = sysdeMonthly * 12;

  // Cálculo por bloques (lo que NO hace SYSDE)
  const blockMonthly = useMemo(() => {
    let total = 0;
    for (const t of costingTiers) {
      if (loans < t.from) break;
      const ceiling = t.to ?? Infinity;
      const usedInTier = Math.min(loans, ceiling) - t.from + 1;
      total += Math.max(0, usedInTier) * t.price;
    }
    return Math.max(total, tier.min);
  }, [loans, tier.min]);

  const savingMonth = blockMonthly - sysdeMonthly;
  const savingPct = blockMonthly > 0 ? (savingMonth / blockMonthly) * 100 : 0;
  const minApplied = sysdeMonthly === tier.min && loans * tier.price < tier.min;

  // Identificar tramos relevantes para visualización
  const activeIdx = costingTiers.findIndex((t) => t === tier);

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-5 py-3 flex items-center gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-accent-foreground/20 flex items-center justify-center font-bold">1</div>
        <div>
          <h4 className="font-bold text-base">{L(lng, "Recálculo total al cruzar tramos de volumen", "Full recalculation when crossing volume tiers")}</h4>
          <p className="text-[11px] text-accent-foreground/80">{L(lng, "Modelo escalonado total · NO por bloques · Mínimo por país siempre respetado", "Full-step model · NOT block-based · Per-country minimum always applies")}</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Explicación didáctica */}
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div className="text-sm text-foreground font-semibold">{L(lng, "¿Cómo funciona esta cláusula?", "How does this clause work?")}</div>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1.5 pl-6 list-disc leading-relaxed">
            <li>
              {L(lng,
                "Cuando un país cruza el umbral de un tramo superior, TODO su volumen se recalcula a la nueva tarifa más baja.",
                "When a country crosses an upper-tier threshold, the ENTIRE volume is recalculated at the new lower rate.")}
            </li>
            <li>
              {L(lng,
                "No hay penalización por crecimiento: cuanto más crece el país, más barata es la tarifa unitaria.",
                "No growth penalty: the more a country grows, the cheaper the unit rate becomes.")}
            </li>
            <li>
              {L(lng,
                "Aplica siempre el mínimo mensual del tramo correspondiente para garantizar viabilidad operativa.",
                "The monthly minimum of the corresponding tier always applies to guarantee operational viability.")}
            </li>
          </ul>
        </div>

        {/* Tabla de tramos contractuales */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {L(lng, "Tabla de tramos contractuales", "Contractual tier table")}
          </div>
          <table className="w-full text-xs">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">{L(lng, "Tramo", "Tier")}</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">{L(lng, "Volumen créditos", "Loan volume")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lng, "Tarifa unit.", "Unit rate")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lng, "Mín. mensual", "Monthly min.")}</th>
              </tr>
            </thead>
            <tbody>
              {costingTiers.map((t, i) => (
                <tr key={i} className={`border-t border-border/50 ${i === activeIdx ? "bg-accent/10" : ""}`}>
                  <td className="px-3 py-1.5 font-bold text-foreground">T{i + 1}{i === activeIdx && <span className="ml-1 text-[9px] text-accent">◀ {L(lng, "ACTUAL", "CURRENT")}</span>}</td>
                  <td className="px-3 py-1.5 font-mono text-muted-foreground">
                    {fmtNum(t.from)} – {t.to ? fmtNum(t.to) : "∞"}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono font-semibold text-foreground">{fmtUSD(t.price, 2)}</td>
                  <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">{fmtUSD(t.min)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controles */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              {L(lng, "1️⃣ Selecciona un país", "1️⃣ Pick a country")}
            </label>
            <Select value={country} onValueChange={onCountryChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {countryPricing.map((c) => (
                  <SelectItem key={c.country} value={c.country}>
                    {c.country} — {fmtNum(c.loans)} · {fmtUSD(c.unitPrice, 2)}/{L(lng, "créd", "loan")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground mt-1">{L(lng, "Volumen y tarifa real del Anexo SaaS", "Actual volume and rate from SaaS Annex")}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              {L(lng, "2️⃣ Simula el crecimiento (créditos activos)", "2️⃣ Simulate growth (active loans)")}
            </label>
            <Input
              type="number"
              min={0}
              step={5000}
              value={loans}
              onChange={(e) => setLoans(Math.max(0, parseInt(e.target.value || "0", 10)))}
              className="font-mono"
            />
          </div>
        </div>

        <div>
          <Slider
            value={[loans]}
            min={0}
            max={1500000}
            step={5000}
            onValueChange={([v]) => setLoans(v)}
            className="my-3"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0</span><span>100k</span><span>200k</span><span>500k</span><span>1M</span><span>1.5M</span>
          </div>
        </div>

        {/* Comparativa lado a lado */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <div className="text-xs font-bold text-destructive uppercase tracking-wide">{L(lng, "Modelo por bloques", "Block-based model")}</div>
            </div>
            <div className="text-[10px] text-muted-foreground mb-2">{L(lng, "(competencia — NO usado por SYSDE)", "(competitors — NOT used by SYSDE)")}</div>
            <div className="text-2xl font-bold font-mono text-foreground tabular-nums">{fmtUSD(blockMonthly, 0)}</div>
            <div className="text-xs text-muted-foreground font-mono">/{L(lng, "mes", "mo")} · {fmtUSD(blockMonthly * 12, 0)}/{L(lng, "año", "yr")}</div>
            <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
              {L(lng,
                "Se factura cada bloque a su tarifa: los primeros 100k a $0,10, los siguientes 100k a $0,07, etc. Penaliza el crecimiento.",
                "Each block is billed at its rate: first 100k at $0.10, next 100k at $0.07, etc. Penalizes growth.")}
            </p>
          </div>

          <div className="rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/10 to-success/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div className="text-xs font-bold text-success uppercase tracking-wide">{L(lng, "Modelo SYSDE", "SYSDE model")}</div>
            </div>
            <div className="text-[10px] text-muted-foreground mb-2">{L(lng, "Recálculo total a la tarifa del tramo alcanzado", "Full recalculation at reached-tier rate")}</div>
            <div className="text-2xl font-bold font-mono text-foreground tabular-nums">{fmtUSD(sysdeMonthly, 0)}</div>
            <div className="text-xs text-muted-foreground font-mono">/{L(lng, "mes", "mo")} · {fmtUSD(sysdeAnnual, 0)}/{L(lng, "año", "yr")}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">
              {fmtNum(loans)} × {fmtUSD(tier.price, 2)} = {fmtUSD(loans * tier.price, 0)}
            </p>
            {minApplied && (
              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-accent font-semibold">
                <Info className="h-3 w-3" /> {L(lng, "Aplica mínimo del tramo", "Tier minimum applied")}
              </div>
            )}
          </div>
        </div>

        {/* Resultado: ahorro */}
        {savingMonth > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/15 to-success/5 p-4 flex items-center justify-between flex-wrap gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="bg-success/20 rounded-full p-2">
                <ArrowRight className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-success font-bold">{L(lng, "Ahorro SYSDE vs modelo por bloques", "SYSDE savings vs block model")}</div>
                <div className="text-xs text-muted-foreground">
                  {country} · {fmtNum(loans)} {L(lng, "créditos", "loans")}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success font-mono">−{fmtUSD(savingMonth, 0)}/mo</div>
              <div className="text-xs text-success font-semibold font-mono">−{fmtUSD(savingMonth * 12, 0)}/{L(lng, "año", "yr")} · {savingPct.toFixed(1)}%</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
