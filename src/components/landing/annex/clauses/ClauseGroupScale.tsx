import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Users, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useT } from "@/i18n/LanguageContext";
import { countryPricing, tierForVolume, groupTotalLoans } from "../clausesPricingData";

const fmtUSD = (n: number, dec = 0) =>
  `USD $${n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
const fmtNum = (n: number) => n.toLocaleString("en-US");

type Lang = "es" | "en";
const L = (lang: Lang, es: string, en: string) => (lang === "es" ? es : en);

const THRESHOLD = 2_500_000;

export default function ClauseGroupScale() {
  const { lang } = useT();
  const lng = lang as Lang;

  // Crecimiento global por país (% sobre baseline) → más realista que un slider único
  const [growthPct, setGrowthPct] = useState(0);
  const [discount, setDiscount] = useState(15);

  // Volúmenes proyectados por país aplicando el mismo % de crecimiento
  const projected = useMemo(
    () => countryPricing.map((c) => ({
      ...c,
      projectedLoans: Math.round(c.loans * (1 + growthPct / 100)),
    })),
    [growthPct]
  );

  const totalProjected = projected.reduce((s, c) => s + c.projectedLoans, 0);
  const crossesThreshold = totalProjected >= THRESHOLD;

  // Costo país-por-país: tarifa REAL de cada país aplicada sobre su volumen proyectado
  // Importante: usamos la tarifa unitaria contractual de cada país (sin promedios)
  const currentMonthly = useMemo(
    () => projected.reduce((sum, c) => {
      const t = tierForVolume(c.projectedLoans);
      // Tarifa real del país (la del Anexo) o la del tramo si el volumen cambió de tramo
      const rate = c.unitPrice; // tarifa contractual fija del país
      const min = t.min;
      return sum + Math.max(c.projectedLoans * rate, min);
    }, 0),
    [projected]
  );

  // Tarifa revisada de grupo: descuento se aplica solo si cruza umbral
  const reviewedMonthly = crossesThreshold ? currentMonthly * (1 - discount / 100) : currentMonthly;
  const monthlySaving = currentMonthly - reviewedMonthly;
  const annualSaving = monthlySaving * 12;

  // Progreso visual al umbral
  const progressPct = Math.min(100, (totalProjected / THRESHOLD) * 100);

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-5 py-3 flex items-center gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-accent-foreground/20 flex items-center justify-center font-bold">2</div>
        <div>
          <h4 className="font-bold text-base">{L(lng, "Revisión de tarifa consolidada por escala de grupo", "Consolidated group-scale rate review")}</h4>
          <p className="text-[11px] text-accent-foreground/80">{L(lng, `Umbral grupo: ${fmtNum(THRESHOLD)} créditos · Tarifas reales por país (sin promedios)`, `Group threshold: ${fmtNum(THRESHOLD)} loans · Real per-country rates (no averages)`)}</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Explicación clara */}
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div className="text-sm text-foreground font-semibold">{L(lng, "¿Por qué esta cláusula?", "Why this clause?")}</div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {L(lng,
              `El modelo país por país, aunque escalonado, no captura el poder de negociación del grupo Unicomer como un todo. Cuando la suma consolidada de los 9 países supere ${fmtNum(THRESHOLD)} créditos activos, SYSDE revisa la tarifa unitaria a nivel grupo aplicando un descuento adicional (rango contractual indicativo: 10–20%). El ajuste se aplica automáticamente al cierre fiscal del año en que se cruza el umbral.`,
              `The country-by-country model, even when tiered, does not capture Unicomer's group bargaining power. When the consolidated sum of the 9 countries exceeds ${fmtNum(THRESHOLD)} active loans, SYSDE reviews the unit rate at group level by applying an additional discount (indicative contractual range: 10–20%). The adjustment is applied automatically at the fiscal year-end when the threshold is crossed.`)}
          </p>
        </div>

        {/* Tabla de tarifa REAL por país */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>{L(lng, "Cálculo país-por-país (tarifa real, sin promedios)", "Country-by-country calc (real rates, no averages)")}</span>
            <span className="font-mono text-accent">+{growthPct}% {L(lng, "crecimiento", "growth")}</span>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">{L(lng, "País", "Country")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lng, "Créd. base", "Base loans")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lng, "Créd. proyect.", "Projected")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lng, "Tarifa $/créd", "Rate $/loan")}</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">{L(lng, "Mensual", "Monthly")}</th>
              </tr>
            </thead>
            <tbody>
              {projected.map((c) => {
                const t = tierForVolume(c.projectedLoans);
                const m = Math.max(c.projectedLoans * c.unitPrice, t.min);
                const minApplied = c.projectedLoans * c.unitPrice < t.min;
                return (
                  <tr key={c.country} className="border-t border-border/50">
                    <td className="px-3 py-1.5 font-medium text-foreground">{c.country}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">{fmtNum(c.loans)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-foreground">{fmtNum(c.projectedLoans)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">{fmtUSD(c.unitPrice, 2)}</td>
                    <td className="px-3 py-1.5 text-right font-mono font-semibold text-foreground">
                      {fmtUSD(m, 0)}
                      {minApplied && <span className="ml-1 text-[9px] text-accent">(min)</span>}
                    </td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-accent bg-accent/5">
                <td className="px-3 py-2 font-bold text-accent">{L(lng, "Total grupo", "Group total")}</td>
                <td className="px-3 py-2 text-right font-mono font-bold text-muted-foreground">{fmtNum(groupTotalLoans)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold text-accent">{fmtNum(totalProjected)}</td>
                <td></td>
                <td className="px-3 py-2 text-right font-mono font-bold text-accent">{fmtUSD(currentMonthly, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Controles */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-accent" />
              {L(lng, "Crecimiento orgánico por país", "Organic growth per country")}: <span className="font-mono text-accent">+{growthPct}%</span>
            </label>
            <Slider value={[growthPct]} min={0} max={300} step={5} onValueChange={([v]) => setGrowthPct(v)} />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
              <span>0%</span><span>+100%</span><span>+200%</span><span>+300%</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              {L(lng, "Descuento de escala revisado", "Reviewed scale discount")}: <span className="font-mono text-accent">{discount}%</span>
            </label>
            <Slider value={[discount]} min={5} max={25} step={1} onValueChange={([v]) => setDiscount(v)} />
            <div className="text-[10px] text-muted-foreground mt-1">
              {L(lng, "Rango contractual indicativo: 10–20%", "Indicative contractual range: 10–20%")}
            </div>
          </div>
        </div>

        {/* Barra de progreso al umbral */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5 font-mono">
            <span>0</span>
            <span className={crossesThreshold ? "text-success font-bold" : ""}>
              {fmtNum(totalProjected)} / {fmtNum(THRESHOLD)}
              {crossesThreshold && <span className="ml-1">✓</span>}
            </span>
            <span>{fmtNum(THRESHOLD)} (umbral)</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden border border-border">
            <motion.div
              className={`h-full ${crossesThreshold ? "bg-success" : "bg-accent"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Comparativa */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {L(lng, "Sin revisión (país-por-país)", "No review (country-by-country)")}
            </div>
            <div className="text-xl font-bold font-mono text-foreground">{fmtUSD(currentMonthly, 0)}</div>
            <div className="text-xs text-muted-foreground font-mono">/{L(lng, "mes", "mo")} · {fmtUSD(currentMonthly * 12, 0)}/{L(lng, "año", "yr")}</div>
          </div>
          <div className={`rounded-lg border-2 p-3 ${crossesThreshold ? "border-success/40 bg-success/5" : "border-border bg-muted/20 opacity-60"}`}>
            <div className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${crossesThreshold ? "text-success" : "text-muted-foreground"}`}>
              {crossesThreshold ? L(lng, "✓ Tarifa revisada grupo", "✓ Reviewed group rate") : L(lng, "Aún no aplica", "Not yet triggered")}
            </div>
            <div className="text-xl font-bold font-mono text-foreground">{fmtUSD(reviewedMonthly, 0)}</div>
            <div className="text-xs text-muted-foreground font-mono">/{L(lng, "mes", "mo")} · {fmtUSD(reviewedMonthly * 12, 0)}/{L(lng, "año", "yr")}</div>
          </div>
        </div>

        {crossesThreshold && monthlySaving > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/15 to-success/5 p-4 flex items-center justify-between flex-wrap gap-3"
          >
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-success" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-success font-bold">{L(lng, "Ahorro automático aplicado al grupo", "Automatic group-wide saving")}</div>
                <div className="text-xs text-muted-foreground">{L(lng, "Aplica al cierre fiscal del año en que se cruza el umbral", "Applied at the fiscal year-end when threshold is crossed")}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success font-mono">−{fmtUSD(annualSaving, 0)}/{L(lng, "año", "yr")}</div>
              <div className="text-xs text-success font-semibold font-mono">−{fmtUSD(monthlySaving, 0)}/{L(lng, "mes", "mo")}</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
