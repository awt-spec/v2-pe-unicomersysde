import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Check, X as XIcon, Server, CreditCard, Cloud, HardDrive, Users, Globe, DollarSign, Layers } from "lucide-react";
import SysdeHint from "./SysdeHint";
import AnnexViewer from "./annex/AnnexViewer";
import { useT } from "@/i18n/LanguageContext";

const licenses = [
  { name: "Credit Core System", price: "USD 350,000", desc: "Préstamos, crédito, microcrédito", sub: "Licencia Anual", icon: Server },
  { name: "Tarjetas de Crédito", price: "USD 250,000", desc: "Emisión, gestión y procesamiento", sub: "Licencia Anual", icon: CreditCard },
];

const onPremiseCountries = [
  { phase: "1. Pilot", country: "Honduras", loans: "338,360", annual: "$121,810" },
  { phase: "2. Rollout", country: "Nicaragua", loans: "79,360", annual: "$28,570" },
  { phase: "3. Expansion", country: "Guyana", loans: "65,176", annual: "$23,463" },
  { phase: "3. Expansion", country: "Ecuador", loans: "144,688", annual: "$52,088" },
  { phase: "4. Scale", country: "Trinidad & Tobago", loans: "117,295", annual: "$42,226" },
  { phase: "4. Scale", country: "Jamaica", loans: "186,000", annual: "$66,960" },
  { phase: "4. Scale", country: "Guatemala", loans: "91,536", annual: "$32,953" },
  { phase: "5. Consol.", country: "El Salvador", loans: "419,494", annual: "$151,018" },
  { phase: "6. Full Scale", country: "Costa Rica", loans: "708,591", annual: "$255,093" },
];

const saasCountries = [
  { phase: "1. Pilot", country: "Honduras", loans: "338,360", annual: "$162,413" },
  { phase: "2. Rollout", country: "Nicaragua", loans: "79,360", annual: "$95,232" },
  { phase: "3. Expansion", country: "Guyana", loans: "65,176", annual: "$78,211" },
  { phase: "3. Expansion", country: "Ecuador", loans: "144,688", annual: "$121,538" },
  { phase: "4. Scale", country: "Trinidad & Tobago", loans: "117,295", annual: "$98,528" },
  { phase: "4. Scale", country: "Jamaica", loans: "186,000", annual: "$156,240" },
  { phase: "4. Scale", country: "Guatemala", loans: "91,536", annual: "$109,843" },
  { phase: "5. Consol.", country: "El Salvador", loans: "419,494", annual: "$201,357" },
  { phase: "6. Full Scale", country: "Costa Rica", loans: "708,591", annual: "$255,093" },
];

const implementation = [
  { phase: "1. Pilot", country: "Honduras", services: "$1,205,000", travel: "$15,000", total: "$1,220,000" },
  { phase: "2. Rollout", country: "Nicaragua", services: "$101,416", travel: "$0", total: "$101,416" },
  { phase: "3+", country: "Demás países", services: "$0", travel: "$0", total: "$0" },
];

const included = [
  "Usuarios ilimitados",
  "Sin costo por usuario, transacción, país adicional o instancia",
  "Clientes ilimitados",
  "Territorio: Ilimitado — BIG 9 + todos los países donde Unicomer opere",
  "Soporte incluido",
  "Capacitación incluida",
  "Implementación 100% remota",
];

const comparison = [
  { them: "Por usuario", us: "Usuarios ilimitados" },
  { them: "Por país", us: "Todos los países incluidos" },
  { them: "Por transacción", us: "Transacciones ilimitadas" },
  { them: "Por módulo extra", us: "Todos los módulos incluidos" },
  { them: "Soporte con topes de horas", us: "Soporte ilimitado" },
];

const paymentCalendar = [
  { year: "Año 1", core: "$350,000", tarjetas: "$250,000", impl: "$1,321,416", total: "$1,921,416", totalNum: 1921416, hasImpl: true },
  { year: "Año 2", core: "$350,000", tarjetas: "$250,000", impl: "—", total: "$600,000", totalNum: 600000, hasImpl: false },
  { year: "Año 3", core: "$350,000", tarjetas: "$250,000", impl: "—", total: "$600,000", totalNum: 600000, hasImpl: false },
  { year: "Año 4", core: "$350,000", tarjetas: "$250,000", impl: "—", total: "$600,000", totalNum: 600000, hasImpl: false },
  { year: "Año 5", core: "$350,000", tarjetas: "$250,000", impl: "—", total: "$600,000", totalNum: 600000, hasImpl: false },
];

const executiveCards = [
  { value: "$0", label: "por usuario adicional", desc: "Escalar no cuesta más", icon: Users, suffix: "" },
  { value: "~$67K", label: "por país / año", desc: "$600K ÷ 9 países", icon: Globe, suffix: "" },
  { value: "$0.36", label: "por crédito / año", desc: "2.15M créditos activos", icon: DollarSign, suffix: "" },
  { value: "1", label: "plataforma = 9 países", desc: "Consolidación total", icon: Layers, suffix: "" },
];

type Model = "onpremise" | "saas";

/* Animated counter */
const AnimatedCounter = ({ target, prefix = "", suffix = "", duration = 1500 }: { target: number; prefix?: string; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

const Pricing = () => {
  const { t } = useT();
  const [model, setModel] = useState<Model>("onpremise");
  const countries = model === "onpremise" ? onPremiseCountries : saasCountries;
  const totalAnnual = model === "onpremise" ? "$774,180" : "$1,278,455";
  const totalLoans = "2,150,500";

  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Inversión <span className="text-accent">Fija</span>
          </h2>
          <p className="text-muted-foreground text-lg">Una sola plataforma — todos los países</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">

          {/* ═══════ BIG 9 BANNER ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-8 md:p-10 mb-8 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">Despliegue Multi-País Sin Límites</p>
            <div className="flex flex-col items-center gap-2">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="font-display text-7xl md:text-8xl font-black text-accent tabular-nums"
              >
                9
              </motion.span>
              <p className="font-display text-lg md:text-xl font-bold text-foreground tracking-wide">BIG 9 CUBIERTOS + TODOS LOS PAÍSES</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Incluyendo todos los países actuales y futuros donde Unicomer opere — sin costos adicionales de licencia
              </p>
            </div>
          </motion.div>

          {/* ═══════ ANEXO 2 — VISOR COMPLETO ═══════ */}
          <AnnexViewer />

          {/* ═══════ VISUAL PAYMENT TIMELINE (después del Anexo 2) ═══════ */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8 mt-20"
          >
            <h3 className="font-display text-lg font-bold text-foreground mb-1">Cronograma de Pagos</h3>
            <p className="text-xs text-muted-foreground mb-8">Proyección de inversión total a 5 años</p>

            {/* Desktop timeline */}
            <div className="hidden md:block relative">
              <div className="flex items-start justify-between relative">
                <div className="absolute top-6 left-[10%] right-[10%] h-[3px] bg-border rounded-full" />
                <motion.div
                  className="absolute top-6 left-[10%] h-[3px] rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={timelineInView ? { width: "80%" } : { width: 0 }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                />

                {paymentCalendar.map((item, i) => (
                  <div
                    key={item.year}
                    className="relative flex flex-col items-center z-10 cursor-pointer group"
                    style={{ width: "20%" }}
                    onMouseEnter={() => setActiveNode(i)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 400, damping: 20 }}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                        item.hasImpl
                          ? "bg-accent text-white shadow-lg shadow-accent/30 ring-4 ring-accent/20"
                          : "bg-card border-2 border-accent text-accent group-hover:bg-accent group-hover:text-white"
                      )}
                    >
                      {i + 1}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="text-sm font-bold text-foreground mt-3"
                    >
                      {item.year}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.6 + i * 0.2 }}
                      className={cn(
                        "text-sm font-bold tabular-nums mt-1",
                        item.hasImpl ? "text-accent" : "text-foreground"
                      )}
                    >
                      {item.total}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.7 + i * 0.2 }}
                      className="text-[10px] text-muted-foreground mt-1 text-center leading-tight"
                    >
                      {item.hasImpl ? "Licencias + Implementación" : "Solo licencias"}
                    </motion.p>

                    {activeNode === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-14 bg-foreground text-background rounded-xl p-4 shadow-2xl w-52 z-50"
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-foreground rotate-45 rounded-sm" />
                        <p className="text-xs font-bold mb-2">{item.year} — Desglose</p>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between"><span className="opacity-70">Credit Core</span><span className="font-medium tabular-nums">{item.core}</span></div>
                          <div className="flex justify-between"><span className="opacity-70">Tarjetas</span><span className="font-medium tabular-nums">{item.tarjetas}</span></div>
                          {item.hasImpl && <div className="flex justify-between"><span className="opacity-70">Implementación</span><span className="font-medium tabular-nums">{item.impl}</span></div>}
                          <div className="flex justify-between border-t border-background/20 pt-1.5 font-bold"><span>Total</span><span className="tabular-nums">{item.total}</span></div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline (vertical) */}
            <div className="md:hidden space-y-4">
              {paymentCalendar.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    item.hasImpl ? "bg-accent text-white" : "bg-card border-2 border-accent text-accent"
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{item.year}</p>
                    <p className="text-[10px] text-muted-foreground">{item.hasImpl ? "Licencias + Implementación" : "Solo licencias"}</p>
                  </div>
                  <p className={cn("text-sm font-bold tabular-nums", item.hasImpl ? "text-accent" : "text-foreground")}>{item.total}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>


          {/* Included + comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-20 md:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-4">{t("pricing.included.title")}</h3>
              <ul className="space-y-3">
                {[1,2,3,4,5,6,7].map((n) => (
                  <li key={n} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-accent" />
                    </div>
                    {t(`pricing.included.${n}`)}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-6">{t("pricing.compare.title")}</h3>
              <div className="space-y-4">
                {[1,2,3,4,5].map((n) => (
                  <div key={n} className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <XIcon size={14} className="text-destructive shrink-0" />
                      <span>{t(`pricing.compare.them.${n}`)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                      <Check size={14} className="text-accent shrink-0" />
                      <span>{t(`pricing.compare.us.${n}`)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  <span>{t("pricing.compare.them")}</span>
                  <span className="text-accent">{t("pricing.compare.us")}</span>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <SysdeHint text={t("pricing.hint.cta")} />
              </div>
            </motion.div>
          </div>

          {/* ═══════ EXECUTIVE CLOSING QUOTE ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-10"
              />
              <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-relaxed">
                "La pregunta no es cuánto cuesta SAF+.{" "}
                <span className="text-accent">Es cuánto le cuesta a Unicomer NO tenerlo.</span>"
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mt-10"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Pricing;
