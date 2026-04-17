import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Building2, Receipt, RefreshCcw, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageContext";
import {
  countryPricing,
  costingTiers,
  tierForVolume,
  groupTotalLoans,
  implementationOneTime,
} from "./clausesPricingData";

const fmtUSD = (n: number, dec = 0) =>
  `USD $${n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
const fmtNum = (n: number) => n.toLocaleString("en-US");

type Lang = "es" | "en";

const L = (lang: Lang, es: string, en: string) => (lang === "es" ? es : en);

// ============================================================
// Cláusula 1 — Recálculo total al cruzar tramos
// ============================================================
function ClauseRecalc({ lang }: { lang: Lang }) {
  const [country, setCountry] = useState("Costa Rica");
  const base = countryPricing.find((c) => c.country === country)!;
  const [loans, setLoans] = useState(base.loans);

  // Cuando cambia país, resetea volumen al real
  const onCountryChange = (c: string) => {
    setCountry(c);
    const cp = countryPricing.find((x) => x.country === c)!;
    setLoans(cp.loans);
  };

  const tier = tierForVolume(loans);
  const sysdeMonthly = Math.max(loans * tier.price, tier.min);
  const sysdeAnnual = sysdeMonthly * 12;

  // Comparativa por bloques (modelo NO usado por SYSDE)
  const blockMonthly = useMemo(() => {
    let total = 0;
    let remaining = loans;
    for (const t of costingTiers) {
      if (remaining <= 0) break;
      const ceiling = t.to ?? Infinity;
      const span = Math.min(remaining, ceiling - t.from + 1);
      if (loans >= t.from) {
        const usedInTier = Math.min(loans, ceiling) - t.from + 1;
        total += Math.max(0, usedInTier) * t.price;
        remaining = loans - Math.min(loans, ceiling);
      }
    }
    return total;
  }, [loans]);

  const savingMonth = blockMonthly - sysdeMonthly;
  const savingPct = blockMonthly > 0 ? (savingMonth / blockMonthly) * 100 : 0;
  const minApplied = sysdeMonthly === tier.min && loans * tier.price < tier.min;

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-5 py-3 flex items-center gap-2">
        <div className="shrink-0 w-8 h-8 rounded-full bg-accent-foreground/20 flex items-center justify-center font-bold">1</div>
        <h4 className="font-bold text-base">{L(lang, "Recálculo total al cruzar tramos", "Full recalculation when crossing tiers")}</h4>
      </div>

      <div className="p-5 space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L(lang,
            "Cuando el volumen acumulado de un país supera un tramo, TODO el volumen se recalcula a la nueva tarifa (no por bloques). El mínimo por país siempre se respeta. Tarifas reales del Anexo SaaS por país.",
            "When a country's accumulated volume crosses a tier, the ENTIRE volume is recalculated at the new rate (not in blocks). The per-country minimum always applies. Real per-country rates from the SaaS Annex.")}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">{L(lang, "País", "Country")}</label>
            <Select value={country} onValueChange={onCountryChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {countryPricing.map((c) => (
                  <SelectItem key={c.country} value={c.country}>
                    {c.country} — {fmtNum(c.loans)} · {fmtUSD(c.unitPrice, 2)}/{L(lang, "créd", "loan")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              {L(lang, "Volumen simulado (créditos activos)", "Simulated volume (active loans)")}
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
            <span>0</span><span>500k</span><span>1M</span><span>1.5M</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {L(lang, "Tramo aplicable", "Applicable tier")}
            </div>
            <div className="text-sm font-bold text-foreground">
              {fmtNum(tier.from)} – {tier.to ? fmtNum(tier.to) : "∞"}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-mono">
              {fmtUSD(tier.price, 2)} / {L(lang, "créd / mes", "loan / mo")} · min {fmtUSD(tier.min)}/mo
            </div>
          </div>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
            <div className="text-[10px] uppercase tracking-wider text-destructive font-semibold mb-1">
              {L(lang, "❌ Cálculo por bloques (NO aplicado)", "❌ Block calc (NOT applied)")}
            </div>
            <div className="text-sm font-bold font-mono text-foreground">{fmtUSD(blockMonthly, 2)}/mo</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{L(lang, "Suma por estratos", "Strata-based sum")}</div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/10 to-success/5 p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-success font-bold mb-1">
                {L(lang, "✓ Cálculo SYSDE — recálculo total", "✓ SYSDE calc — full recalculation")}
              </div>
              <div className="text-2xl font-bold font-mono text-foreground tabular-nums">{fmtUSD(sysdeMonthly, 2)}/mo</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-mono">{fmtUSD(sysdeAnnual, 2)}/{L(lang, "año", "yr")}</div>
              {minApplied && (
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-accent font-semibold">
                  <Info className="h-3 w-3" /> {L(lang, "Aplica mínimo del tramo", "Tier minimum applied")}
                </div>
              )}
            </div>
            {savingMonth > 0 && (
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-success font-bold">{L(lang, "Ahorro vs bloques", "Saving vs blocks")}</div>
                <div className="text-lg font-bold text-success font-mono">−{fmtUSD(savingMonth, 2)}/mo</div>
                <div className="text-xs text-success font-semibold">−{savingPct.toFixed(1)}%</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Cláusula 2 — Revisión consolidada por escala de grupo
// ============================================================
function ClauseGroupScale({ lang }: { lang: Lang }) {
  const [extraLoans, setExtraLoans] = useState(0);
  const [discount, setDiscount] = useState(15); // % descuento revisado
  const threshold = 2_500_000;

  const totalLoans = groupTotalLoans + extraLoans;
  const crossesThreshold = totalLoans >= threshold;

  // Costo actual: suma exacta país por país con tarifa real (sin promedios)
  const currentMonthly = useMemo(
    () => countryPricing.reduce((sum, c) => {
      const t = tierForVolume(c.loans);
      return sum + Math.max(c.loans * t.price, t.min);
    }, 0),
    []
  );

  // Si cruza el umbral, se aplica descuento sobre el total actual
  const reviewedMonthly = crossesThreshold ? currentMonthly * (1 - discount / 100) : currentMonthly;
  const monthlySaving = currentMonthly - reviewedMonthly;
  const annualSaving = monthlySaving * 12;

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-5 py-3 flex items-center gap-2">
        <div className="shrink-0 w-8 h-8 rounded-full bg-accent-foreground/20 flex items-center justify-center font-bold">2</div>
        <h4 className="font-bold text-base">{L(lang, "Revisión consolidada por escala de grupo", "Consolidated group-scale review")}</h4>
      </div>

      <div className="p-5 space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L(lang,
            `El modelo país por país no aprovecha la escala consolidada del grupo. Una vez que la suma de los 9 países alcance ${fmtNum(threshold)} créditos activos consolidados, SYSDE revisa la tarifa a nivel grupo. Cálculo basado en la tarifa real de cada país (sin promedios).`,
            `The country-by-country model does not leverage group-wide scale. Once the 9-country sum reaches ${fmtNum(threshold)} consolidated active loans, SYSDE reviews the rate at group level. Computed from each country's actual rate (no averages).`)}
        </p>

        {/* Tabla de tarifa real por país */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">{L(lang, "País", "Country")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lang, "Créditos", "Loans")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lang, "Tarifa $/créd", "Rate $/loan")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lang, "Mensual", "Monthly")}</th>
              </tr>
            </thead>
            <tbody>
              {countryPricing.map((c) => {
                const t = tierForVolume(c.loans);
                const m = Math.max(c.loans * t.price, t.min);
                return (
                  <tr key={c.country} className="border-t border-border/50">
                    <td className="px-3 py-1.5 font-medium text-foreground">{c.country}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">{fmtNum(c.loans)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">{fmtUSD(c.unitPrice, 2)}</td>
                    <td className="px-3 py-1.5 text-right font-mono font-semibold text-foreground">{fmtUSD(m, 0)}</td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-accent bg-accent/5">
                <td className="px-3 py-2 font-bold text-accent">{L(lang, "Total grupo", "Group total")}</td>
                <td className="px-3 py-2 text-right font-mono font-bold text-accent">{fmtNum(groupTotalLoans)}</td>
                <td></td>
                <td className="px-3 py-2 text-right font-mono font-bold text-accent">{fmtUSD(currentMonthly, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              {L(lang, "Crecimiento futuro del grupo (créditos)", "Future group growth (loans)")}: <span className="font-mono text-accent">+{fmtNum(extraLoans)}</span>
            </label>
            <Slider value={[extraLoans]} min={0} max={1_500_000} step={25_000} onValueChange={([v]) => setExtraLoans(v)} />
            <div className="text-[10px] text-muted-foreground mt-1 font-mono">
              {L(lang, "Total proyectado", "Projected total")}: {fmtNum(totalLoans)} {crossesThreshold && <span className="text-success font-bold">✓ {L(lang, "cruza umbral", "crosses threshold")}</span>}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              {L(lang, "Descuento de escala revisado", "Reviewed scale discount")}: <span className="font-mono text-accent">{discount}%</span>
            </label>
            <Slider value={[discount]} min={5} max={25} step={1} onValueChange={([v]) => setDiscount(v)} />
            <div className="text-[10px] text-muted-foreground mt-1">
              {L(lang, "Rango contractual indicativo: 10–20%", "Indicative contractual range: 10–20%")}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {L(lang, "Facturación país-por-país", "Country-by-country billing")}
            </div>
            <div className="text-sm font-bold font-mono text-foreground">{fmtUSD(currentMonthly, 0)}/mo</div>
            <div className="text-xs text-muted-foreground font-mono">{fmtUSD(currentMonthly * 12, 0)}/{L(lang, "año", "yr")}</div>
          </div>
          <div className={`rounded-lg border-2 p-3 ${crossesThreshold ? "border-success/40 bg-success/5" : "border-border bg-muted/20 opacity-60"}`}>
            <div className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${crossesThreshold ? "text-success" : "text-muted-foreground"}`}>
              {crossesThreshold ? L(lang, "✓ Tarifa revisada grupo", "✓ Reviewed group rate") : L(lang, "Aún no aplica", "Not yet triggered")}
            </div>
            <div className="text-sm font-bold font-mono text-foreground">{fmtUSD(reviewedMonthly, 0)}/mo</div>
            <div className="text-xs text-muted-foreground font-mono">{fmtUSD(reviewedMonthly * 12, 0)}/{L(lang, "año", "yr")}</div>
          </div>
        </div>

        {crossesThreshold && monthlySaving > 0 && (
          <div className="rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/10 to-success/5 p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-success" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-success font-bold">{L(lang, "Ahorro automático aplicado", "Automatic saving applied")}</div>
                <div className="text-xs text-muted-foreground">{L(lang, "Cierre fiscal del año en que se cruza el umbral", "Applied at the fiscal year-end when threshold is crossed")}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-success font-mono">−{fmtUSD(annualSaving, 0)}/{L(lang, "año", "yr")}</div>
              <div className="text-xs text-success font-semibold">−{fmtUSD(monthlySaving, 0)}/mo</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Cláusula 3 — Facturación multi-entidad
// ============================================================
type Split = { name: string; pct: number };
function ClauseMultiEntity({ lang }: { lang: Lang }) {
  const [splits, setSplits] = useState<Split[]>([
    { name: L(lang, "Entidad Guatemala (GT)", "Guatemala Entity (GT)"), pct: 33 },
    { name: L(lang, "Holding Regional", "Regional Holding"), pct: 50 },
    { name: L(lang, "Servicios Compartidos", "Shared Services"), pct: 17 },
  ]);

  const totalPct = splits.reduce((s, x) => s + x.pct, 0);
  const updatePct = (i: number, v: number) => {
    setSplits((s) => s.map((x, j) => (j === i ? { ...x, pct: v } : x)));
  };
  const updateName = (i: number, v: string) => {
    setSplits((s) => s.map((x, j) => (j === i ? { ...x, name: v } : x)));
  };
  const addEntity = () =>
    setSplits((s) => [...s, { name: L(lang, `Entidad ${s.length + 1}`, `Entity ${s.length + 1}`), pct: 0 }]);
  const removeEntity = (i: number) => setSplits((s) => s.filter((_, j) => j !== i));
  const reset = () =>
    setSplits([
      { name: L(lang, "Entidad Guatemala (GT)", "Guatemala Entity (GT)"), pct: 33 },
      { name: L(lang, "Holding Regional", "Regional Holding"), pct: 50 },
      { name: L(lang, "Servicios Compartidos", "Shared Services"), pct: 17 },
    ]);

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-5 py-3 flex items-center gap-2">
        <div className="shrink-0 w-8 h-8 rounded-full bg-accent-foreground/20 flex items-center justify-center font-bold">3</div>
        <h4 className="font-bold text-base">{L(lang, "Facturación multi-entidad", "Multi-entity billing")}</h4>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L(lang,
            `El pago único de implementación de ${fmtUSD(implementationOneTime, 0)} puede repartirse entre las entidades fiscales que Unicomer defina, sin recargo administrativo. Configura abajo el split y SYSDE emitirá factura por cada entidad legal.`,
            `The one-time implementation payment of ${fmtUSD(implementationOneTime, 0)} can be split across the tax entities Unicomer defines, with no administrative surcharge. Configure the split below and SYSDE will issue an invoice per legal entity.`)}
        </p>

        <div className="space-y-2">
          {splits.map((s, i) => {
            const amount = (implementationOneTime * s.pct) / 100;
            return (
              <div key={i} className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg border border-border bg-muted/20">
                <div className="col-span-12 sm:col-span-5">
                  <Input
                    value={s.name}
                    onChange={(e) => updateName(i, e.target.value)}
                    className="text-sm h-9"
                    placeholder={L(lang, "Nombre entidad", "Entity name")}
                  />
                </div>
                <div className="col-span-7 sm:col-span-3 flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={s.pct}
                    onChange={(e) => updatePct(i, Math.max(0, Math.min(100, parseFloat(e.target.value || "0"))))}
                    className="text-sm h-9 font-mono"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-right font-mono text-sm font-semibold text-foreground">
                  {fmtUSD(amount, 0)}
                </div>
                <div className="col-span-1 sm:col-span-1 text-right">
                  {splits.length > 1 && (
                    <button
                      onClick={() => removeEntity(i)}
                      className="text-destructive hover:bg-destructive/10 rounded p-1 text-xs"
                      aria-label="remove"
                    >✕</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={addEntity} className="gap-1">
            <Building2 className="h-3.5 w-3.5" /> {L(lang, "Añadir entidad", "Add entity")}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} className="gap-1">
            <RefreshCcw className="h-3.5 w-3.5" /> {L(lang, "Reset", "Reset")}
          </Button>
        </div>

        <div className={`rounded-xl border-2 p-4 flex items-center justify-between flex-wrap gap-3 ${
          totalPct === 100 ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"
        }`}>
          <div className="flex items-center gap-3">
            <Receipt className={`h-7 w-7 ${totalPct === 100 ? "text-success" : "text-destructive"}`} />
            <div>
              <div className={`text-[10px] uppercase tracking-wider font-bold ${totalPct === 100 ? "text-success" : "text-destructive"}`}>
                {totalPct === 100 ? L(lang, "✓ Split válido", "✓ Valid split") : L(lang, "⚠ Suma debe ser 100%", "⚠ Sum must equal 100%")}
              </div>
              <div className="text-xs text-muted-foreground">
                {L(lang, "Total facturado", "Total invoiced")}: <span className="font-mono font-bold text-foreground">{fmtUSD((implementationOneTime * totalPct) / 100, 0)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{L(lang, "Suma %", "Sum %")}</div>
            <div className={`text-2xl font-bold font-mono ${totalPct === 100 ? "text-success" : "text-destructive"}`}>{totalPct}%</div>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground italic">
          {L(lang,
            "✓ Una factura por entidad legal · ✓ Deducible en cada jurisdicción · ✓ Sin recargo administrativo SYSDE",
            "✓ One invoice per legal entity · ✓ Locally deductible · ✓ No SYSDE administrative surcharge")}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Wrapper exportado
// ============================================================
export default function InteractiveClauses() {
  const { lang } = useT();

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2 rounded-lg border border-accent/20 bg-accent/5 p-3">
        <Calculator className="h-4 w-4 text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {L(lang,
            "Simuladores interactivos basados en las tarifas reales por país del Anexo SaaS. Modifica los parámetros para ver el impacto en facturación. Sin promedios — cada país conserva su tarifa unitaria contractual.",
            "Interactive simulators based on the actual per-country rates from the SaaS Annex. Adjust parameters to see billing impact. No averages — each country keeps its contractual unit rate.")}
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
        <ClauseRecalc lang={lang as Lang} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
        <ClauseGroupScale lang={lang as Lang} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
        <ClauseMultiEntity lang={lang as Lang} />
      </motion.div>
    </div>
  );
}
