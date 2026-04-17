import { useMemo, useState } from "react";
import { Building2, Receipt, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useT } from "@/i18n/LanguageContext";
import { onPremiseTotals } from "../annexDataI18n";

// Licencias anuales SaaS elegibles para esta cláusula
const LICENSE_CREDIT_CORE = 350000;
const LICENSE_CARDS = 250000;

const fmtUSD = (n: number, dec = 0) =>
  `USD $${n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;

type Lang = "es" | "en";
const L = (lang: Lang, es: string, en: string) => (lang === "es" ? es : en);

type Split = { name: string; pct: number };
type Mode = "onpremise" | "saas";
type Period = "annual" | "monthly";

interface Props {
  mode: Mode;
  /** Si se omite, el usuario podrá elegir entre Anual / Mensual (solo SaaS) */
  fixedPeriod?: Period;
}

export default function ClauseMultiEntityLicense({ mode, fixedPeriod }: Props) {
  const { lang } = useT();
  const lng = lang as Lang;

  const [period, setPeriod] = useState<Period>(fixedPeriod ?? "annual");

  // Base: licencia anual on-premise o licencia anual SaaS (Credit Core + Tarjetas + Factoring)
  const baseAmount = useMemo(() => {
    if (mode === "onpremise") return onPremiseTotals.totalAnnual;
    return period === "annual" ? SAAS_ANNUAL_LICENSE : SAAS_MONTHLY_LICENSE;
  }, [mode, period]);

  const periodLabel = useMemo(() => {
    if (mode === "onpremise") return L(lng, "licencia anual on-premise", "annual on-premise license");
    return period === "annual"
      ? L(lng, "licencia anual SaaS (Credit Core + Tarjetas + Factoring)", "annual SaaS license (Credit Core + Cards + Factoring)")
      : L(lng, "licencia anual SaaS prorrateada mensual", "annual SaaS license prorated monthly");
  }, [mode, period, lng]);

  const initial = (): Split[] => [
    { name: L(lng, "Entidad Honduras (HN)", "Honduras Entity (HN)"), pct: 33 },
    { name: L(lng, "Holding Regional", "Regional Holding"), pct: 50 },
    { name: L(lng, "Servicios Compartidos", "Shared Services"), pct: 17 },
  ];

  const [splits, setSplits] = useState<Split[]>(initial);

  const totalPct = splits.reduce((s, x) => s + x.pct, 0);
  const updatePct = (i: number, v: number) => {
    setSplits((s) => s.map((x, j) => (j === i ? { ...x, pct: v } : x)));
  };
  const updateName = (i: number, v: string) => {
    setSplits((s) => s.map((x, j) => (j === i ? { ...x, name: v } : x)));
  };
  const addEntity = () =>
    setSplits((s) => [...s, { name: L(lng, `Entidad ${s.length + 1}`, `Entity ${s.length + 1}`), pct: 0 }]);
  const removeEntity = (i: number) => setSplits((s) => s.filter((_, j) => j !== i));
  const reset = () => setSplits(initial());

  const decimals = mode === "saas" && period === "monthly" ? 2 : 0;

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-5 py-3 flex items-center gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-accent-foreground/20 flex items-center justify-center font-bold">€</div>
        <div className="flex-1">
          <h4 className="font-bold text-base">
            {L(lng, "Facturación multi-entidad de la ", "Multi-entity billing of the ")}
            {periodLabel}
          </h4>
          <p className="text-[11px] text-accent-foreground/80">
            {L(lng,
              "Misma flexibilidad fiscal · Aplica a la licencia recurrente · Sin recargo administrativo",
              "Same tax flexibility · Applies to the recurring license · No administrative surcharge")}
          </p>
        </div>
        {mode === "saas" && !fixedPeriod && (
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-[130px] h-8 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">{L(lng, "Anual", "Annual")}</SelectItem>
              <SelectItem value="monthly">{L(lng, "Mensual", "Monthly")}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L(lng,
            `La ${periodLabel} de ${fmtUSD(baseAmount, decimals)} puede repartirse entre las entidades fiscales que Unicomer defina (por país, por unidad de negocio, holding regional, etc.), sin recargo administrativo. Configura abajo el split y SYSDE emitirá factura por cada entidad legal en cada ciclo de facturación.`,
            `The ${periodLabel} of ${fmtUSD(baseAmount, decimals)} can be split across the tax entities Unicomer defines (by country, business unit, regional holding, etc.), with no administrative surcharge. Configure the split below and SYSDE will issue an invoice per legal entity each billing cycle.`)}
        </p>

        <div className="space-y-2">
          {splits.map((s, i) => {
            const amount = (baseAmount * s.pct) / 100;
            return (
              <div key={i} className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg border border-border bg-muted/20">
                <div className="col-span-12 sm:col-span-5">
                  <Input
                    value={s.name}
                    onChange={(e) => updateName(i, e.target.value)}
                    className="text-sm h-9"
                    placeholder={L(lng, "Nombre entidad", "Entity name")}
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
                  {fmtUSD(amount, decimals)}
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
            <Building2 className="h-3.5 w-3.5" /> {L(lng, "Añadir entidad", "Add entity")}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} className="gap-1">
            <RefreshCcw className="h-3.5 w-3.5" /> {L(lng, "Reset", "Reset")}
          </Button>
        </div>

        <div className={`rounded-xl border-2 p-4 flex items-center justify-between flex-wrap gap-3 ${
          totalPct === 100 ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"
        }`}>
          <div className="flex items-center gap-3">
            <Receipt className={`h-7 w-7 ${totalPct === 100 ? "text-success" : "text-destructive"}`} />
            <div>
              <div className={`text-[10px] uppercase tracking-wider font-bold ${totalPct === 100 ? "text-success" : "text-destructive"}`}>
                {totalPct === 100 ? L(lng, "✓ Split válido", "✓ Valid split") : L(lng, "⚠ Suma debe ser 100%", "⚠ Sum must equal 100%")}
              </div>
              <div className="text-xs text-muted-foreground">
                {L(lng, "Total facturado", "Total invoiced")}: <span className="font-mono font-bold text-foreground">{fmtUSD((baseAmount * totalPct) / 100, decimals)}</span>
                <span className="ml-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                  {mode === "onpremise"
                    ? L(lng, "/ año", "/ year")
                    : period === "annual" ? L(lng, "/ año", "/ year") : L(lng, "/ mes", "/ month")}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{L(lng, "Suma %", "Sum %")}</div>
            <div className={`text-2xl font-bold font-mono ${totalPct === 100 ? "text-success" : "text-destructive"}`}>{totalPct}%</div>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground italic">
          {L(lng,
            "✓ Una factura por entidad legal en cada ciclo · ✓ Deducible en cada jurisdicción · ✓ Sin recargo administrativo SYSDE",
            "✓ One invoice per legal entity each cycle · ✓ Locally deductible · ✓ No SYSDE administrative surcharge")}
        </p>
      </div>
    </div>
  );
}
