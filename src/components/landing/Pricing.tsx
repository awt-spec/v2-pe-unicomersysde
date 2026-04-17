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
        {/* ═══════ ANUNCIO: PROPUESTA ECONÓMICA ═══════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto mb-16 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card"
        >
          {/* Sweep light effect */}
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/20 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-6 shadow-lg shadow-accent/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Capítulo Final
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4"
            >
              Has llegado a la
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6"
            >
              Propuesta <span className="text-accent">Económica</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent mb-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Una <span className="text-foreground font-semibold">inversión fija</span> — una sola plataforma para todos los países donde Unicomer opere.
            </motion.p>
          </div>
        </motion.div>


        <div className="max-w-6xl mx-auto">

          {/* ═══════ ECUACIÓN HERO ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-card via-card to-muted/30 rounded-3xl border border-border p-10 md:p-16 mb-8 text-center overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            <p className="relative text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-12 font-medium">
              Despliegue Multi-País Sin Límites
            </p>

            <div
              className="relative flex items-end justify-center gap-4 md:gap-8 mb-4"
              style={{ fontFamily: "'Cambria Math', 'Latin Modern Math', 'STIX Two Math', Cambria, Georgia, serif" }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
                className="relative flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                <span className="relative text-7xl md:text-9xl font-bold text-accent leading-none tabular-nums tracking-tight">
                  9
                </span>
                <span className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground font-sans whitespace-nowrap">
                  países hoy
                </span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-5xl md:text-7xl font-light text-muted-foreground/60 leading-none pb-8"
              >
                +
              </motion.span>

              <motion.div
                initial={{ scale: 0, rotate: 10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.5 }}
                className="relative flex flex-col items-center"
              >
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="block text-7xl md:text-9xl italic font-bold text-foreground leading-none tracking-tight"
                >
                  x
                </motion.span>
                <span className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground font-sans whitespace-nowrap">
                  países futuros
                </span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="text-5xl md:text-7xl font-light text-muted-foreground/60 leading-none pb-8"
              >
                =
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, type: "spring", stiffness: 150, damping: 18 }}
                className="relative flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-accent/15 blur-2xl rounded-full" />
                <span
                  className="relative text-4xl md:text-6xl font-black text-accent leading-none tracking-tight pb-2"
                  style={{ fontFamily: "inherit" }}
                >
                  TODOS
                </span>
                <span className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground font-sans whitespace-nowrap">
                  países ilimitado
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="relative pt-6 mt-10 border-t border-border/50 max-w-xl mx-auto"
            >
              <p className="font-display text-base md:text-lg font-bold text-foreground tracking-wide mb-2">
                Big 9 cubiertos · Países futuros incluidos
              </p>
              <p className="text-sm text-muted-foreground">
                Una sola licencia para todos los países donde Unicomer opere — hoy y mañana, sin costos adicionales.
              </p>
            </motion.div>
          </motion.div>

          {/* ═══════ ANEXO 2 — VISOR COMPLETO ═══════ */}
          <AnnexViewer />

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
