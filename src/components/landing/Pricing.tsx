import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Check, X as XIcon, Server, CreditCard, Cloud, HardDrive, Users, Globe, DollarSign, Layers } from "lucide-react";
import SysdeHint from "./SysdeHint";
import AnnexViewer from "./annex/AnnexViewer";
import PricingHeroAnnouncement from "./PricingHeroAnnouncement";
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

  return (
    <section id="pricing" className="bg-background">
      {/* ═══════ ANUNCIO: PROPUESTA ECONÓMICA — Apple-style cinematic ═══════ */}
      <PricingHeroAnnouncement />

      <div className="container mx-auto px-4 py-24">

        <div className="max-w-6xl mx-auto">

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
