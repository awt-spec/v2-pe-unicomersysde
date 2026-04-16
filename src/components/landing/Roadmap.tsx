import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Zap, Globe, Brain, Shield, BarChart3,
  Smartphone, CreditCard, Users, ChevronRight, Star, Lock, ChevronLeft
} from "lucide-react";

type Tab = "unicomer" | "producto";

interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "done" | "in-progress" | "planned";
  highlights: string[];
}

const unicomerRoadmap: RoadmapItem[] = [
  {
    quarter: "Q3 2026",
    title: "Go-Live Honduras — Core Crédito",
    description: "Despliegue del motor de crédito, scoring y desembolso integrado con Salesforce.",
    icon: <Rocket className="w-5 h-5" />,
    status: "in-progress",
    highlights: ["Motor de decisión crediticia", "APIs Salesforce ↔ SAF+", "Planes revolving & cuotas"],
  },
  {
    quarter: "Q4 2026",
    title: "Cobranza Inteligente + Canales Digitales",
    description: "Estrategias de cobranza automatizadas y portal de autogestión para clientes.",
    icon: <Brain className="w-5 h-5" />,
    status: "planned",
    highlights: ["Segmentación automática de mora", "Portal web & app móvil", "Notificaciones multicanal"],
  },
  {
    quarter: "Q1 2027",
    title: "Expansión Regional — Guatemala & El Salvador",
    description: "Réplica del modelo Honduras con parametrización multi-país y multi-moneda.",
    icon: <Globe className="w-5 h-5" />,
    status: "planned",
    highlights: ["Configuración regulatoria por país", "Multi-moneda nativa", "Adaptación regulatoria local"],
  },
  {
    quarter: "Q2 2027",
    title: "Analytics Avanzado & BI Ejecutivo",
    description: "Dashboards de rentabilidad por producto, vintage analysis y predicción de mora.",
    icon: <BarChart3 className="w-5 h-5" />,
    status: "planned",
    highlights: ["Vintage & roll-rate analysis", "KPIs en tiempo real", "Modelos predictivos"],
  },
  {
    quarter: "Q3-Q4 2027",
    title: "9 Países — Full Coverage",
    description: "Completar el despliegue en los 9 países de operación con un solo core.",
    icon: <Star className="w-5 h-5" />,
    status: "planned",
    highlights: ["Nicaragua, Panamá, Costa Rica, RD, Jamaica", "Un solo backoffice regional"],
  },
];

const productoRoadmap: RoadmapItem[] = [
  {
    quarter: "2026 H2",
    title: "SAF+ AI — Motor de Decisión con ML",
    description: "Modelos de ML embebidos para scoring, aprobación automática y detección de fraude.",
    icon: <Brain className="w-5 h-5" />,
    status: "in-progress",
    highlights: ["Scoring ML en tiempo real", "Detección de fraude", "Auto-aprobación configurable"],
  },
  {
    quarter: "2026 H2",
    title: "Open Banking & APIs Públicas",
    description: "Ecosistema de APIs para integración con fintechs, bureaus y servicios financieros.",
    icon: <Zap className="w-5 h-5" />,
    status: "in-progress",
    highlights: ["API marketplace", "Webhooks en tiempo real", "SDK para partners"],
  },
  {
    quarter: "2027 H1",
    title: "SAF+ Mobile — App Nativa",
    description: "Aplicación móvil para gestión de cartera en campo con capacidad offline.",
    icon: <Smartphone className="w-5 h-5" />,
    status: "planned",
    highlights: ["Modo offline completo", "Captura biométrica", "Geolocalización"],
  },
  {
    quarter: "2027 H1",
    title: "Productos Financieros Next-Gen",
    description: "Soporte para BNPL, microcréditos digitales, y líneas pre-aprobadas.",
    icon: <CreditCard className="w-5 h-5" />,
    status: "planned",
    highlights: ["Buy Now Pay Later nativo", "Microcréditos 100% digitales", "Pre-aprobación en POS"],
  },
  {
    quarter: "2027 H2",
    title: "Compliance & RegTech",
    description: "Automatización regulatoria con reportes SUGEF, SIB, CNBS generados en un clic.",
    icon: <Shield className="w-5 h-5" />,
    status: "planned",
    highlights: ["Reportes regulatorios automáticos", "AML/KYC integrado", "Auditoría continua"],
  },
  {
    quarter: "2028+",
    title: "SAF+ Ecosystem — Plataforma Abierta",
    description: "Evolución hacia plataforma abierta con marketplace de módulos y partners.",
    icon: <Users className="w-5 h-5" />,
    status: "planned",
    highlights: ["Marketplace de módulos", "White-label", "Multi-tenant enterprise"],
  },
];

const statusConfig = {
  done: { label: "Completado", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500", line: "bg-emerald-500" },
  "in-progress": { label: "En progreso", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500 animate-pulse", line: "bg-amber-500" },
  planned: { label: "Planificado", bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground", line: "bg-border" },
};

const HorizontalCard = ({ item, index }: { item: RoadmapItem; index: number }) => {
  const st = statusConfig[item.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="flex-shrink-0 w-[220px] md:w-[240px] flex flex-col items-center"
    >
      {/* Top: quarter + status */}
      <span className="text-[10px] font-mono font-semibold text-accent mb-0.5">{item.quarter}</span>
      <span className={`text-[9px] font-semibold px-1.5 py-px rounded-full mb-2 ${st.bg} ${st.text}`}>
        {st.label}
      </span>

      {/* Dot on the line */}
      <div className="relative flex items-center justify-center mb-2">
        <div className={`w-4 h-4 rounded-full border-2 border-card flex items-center justify-center ${st.dot}`}>
          {item.status === "in-progress" && <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
        </div>
      </div>

      {/* Card */}
      <div className="bg-card border border-border rounded-lg p-3 hover:border-accent/30 transition-colors w-full">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-accent [&>svg]:w-4 [&>svg]:h-4">{item.icon}</span>
          <h4 className="text-xs font-bold text-foreground leading-tight">{item.title}</h4>
        </div>
        <p className="text-[10px] text-muted-foreground mb-2 leading-snug line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-1">
          {item.highlights.map((h) => (
            <span key={h} className="text-[9px] px-1.5 py-px rounded-full bg-secondary text-secondary-foreground flex items-center gap-0.5">
              <ChevronRight className="w-2.5 h-2.5 text-accent" />
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Roadmap = () => {
  const [tab, setTab] = useState<Tab>("unicomer");
  const items = tab === "unicomer" ? unicomerRoadmap : productoRoadmap;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div id="roadmap" className="overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-mono font-semibold text-accent tracking-widest uppercase">
            Visión de Futuro
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Roadmap Estratégico
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Un plan exclusivo para Unicomer <strong>y</strong> acceso completo a la evolución del producto SAF+.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-xl p-1 gap-1">
            <button
              onClick={() => setTab("unicomer")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                tab === "unicomer"
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Lock className="w-4 h-4" />
              Exclusivo Unicomer
            </button>
            <button
              onClick={() => setTab("producto")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                tab === "producto"
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Rocket className="w-4 h-4" />
              Producto SAF+
            </button>
          </div>
        </div>

        {/* Badge */}
        <AnimatePresence mode="wait">
          {tab === "unicomer" ? (
            <motion.div
              key="exclusive-badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-3 rounded-xl border border-accent/20 bg-accent/5 text-center"
            >
              <p className="text-sm text-foreground">
                <Lock className="w-4 h-4 inline mr-1 text-accent" />
                <strong>Exclusivo para Unicomer</strong> — Compromiso dedicado alineado a sus prioridades regionales.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="product-badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-3 rounded-xl border border-border bg-secondary/50 text-center"
            >
              <p className="text-sm text-foreground">
                <Rocket className="w-4 h-4 inline mr-1 text-accent" />
                <strong>Evolución continua</strong> — Unicomer recibe todas las innovaciones sin costo adicional.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 px-10 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Horizontal line behind cards */}
                <div className="absolute left-12 right-12 top-[72px] h-px bg-border" />

                {items.map((item, i) => (
                  <HorizontalCard key={item.title} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
    </div>
  );
};

export default Roadmap;
