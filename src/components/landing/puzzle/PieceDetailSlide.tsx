import { motion } from "framer-motion";
import { type PuzzlePiece } from "./puzzleData";
import { Check, FileText, Settings, CheckCircle2, Shield, ArrowRight, Lightbulb } from "lucide-react";
import { FUNCTIONAL_REQUIREMENTS, TECHNICAL_REQUIREMENTS } from "../rfp/rfpData";
import { openSysdeChat } from "../FloatingChat";

export type SlideDetail = {
  headline: string;
  subtitle: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  keyFeatures: { title: string; desc: string }[];
  showRfpStats?: boolean;
  showUnlimitedVisual?: boolean;
};

const SLIDE_DATA: Record<string, SlideDetail> = {
  prestamos: {
    headline: "Credit Core System",
    subtitle: "Gestión integral del ciclo de vida crediticio — desde la originación hasta la liquidación",
    metrics: [
      { value: "USD 350K", label: "Licencia Anual Ilimitada" },
      { value: "9+", label: "Países soportados" },
      { value: "2.1M+", label: "Créditos proyectados" },
    ],
    highlights: [
      "Crédito al consumo masivo (retail de alto volumen)",
      "Crédito comercial y PYME con líneas revolventes",
      "Microcrédito con scoring alternativo",
      "Crédito prendario y colateral",
      "Originación omnicanal (POS, web, móvil, call center)",
    ],
    keyFeatures: [
      { title: "Originación configurable", desc: "Flujos por país, producto, canal y segmento de cliente" },
      { title: "Tablas de amortización", desc: "Francés, alemán, americano, bullet y personalizado" },
      { title: "Reestructuraciones", desc: "Refinanciamiento, novación, consolidación y condonación" },
      { title: "Motor de decisión", desc: "Reglas paramétrizables de aprobación automática" },
    ],
  },
  tarjetas: {
    headline: "Tarjetas End-to-End",
    subtitle: "Emisión, procesamiento y gestión completa de tarjetas de crédito y débito con cuentas corrientes y de ahorro",
    metrics: [
      { value: "USD 250K", label: "Licencia Anual Ilimitada" },
      { value: "∞", label: "Tarjetas activas" },
      { value: "24/7", label: "Monitoreo en línea" },
    ],
    highlights: [
      "Tarjeta de crédito cerrada (marca propia)",
      "Tarjeta de crédito abierta (Visa / Mastercard)",
      "Tarjeta de débito sobre cuentas de ahorro",
      "Cuentas corrientes integradas",
      "Gestión de límites, autorizaciones y bloqueos",
      "Estados de cuenta automatizados multi-formato",
      "Tokenización y tarjetas virtuales",
    ],
    keyFeatures: [
      { title: "Marca propia", desc: "Tarjeta cerrada con control total del emisor" },
      { title: "Red abierta", desc: "Emisión bajo Visa y Mastercard con switching nativo" },
      { title: "Débito + Ahorro", desc: "Tarjeta de débito vinculada a cuentas de ahorro" },
      { title: "Cuentas corrientes", desc: "Gestión integral de cuentas corrientes asociadas" },
      { title: "Control de fraude", desc: "Reglas paramétrizables por canal y geografía" },
    ],
  },
  seguridad: {
    headline: "Seguridad y Control de Acceso",
    subtitle: "Protección enterprise con RBAC, MFA y SSO",
    metrics: [
      { value: "RBAC", label: "Control granular" },
      { value: "MFA", label: "Doble factor" },
      { value: "SSO", label: "Single Sign-On" },
    ],
    highlights: [
      "Roles y permisos granulares",
      "Autenticación multi-factor",
      "Integración Active Directory",
      "Auditoría de acceso completa",
    ],
    keyFeatures: [
      { title: "Zero Trust", desc: "Validación continua de sesión" },
      { title: "Reglas de negocio", desc: "Límites y aprobaciones configurables" },
      { title: "Compliance", desc: "SOC 2, ISO 27001 ready" },
    ],
  },
  regulatorio: {
    headline: "Cumplimiento Regulatorio Automatizado",
    subtitle: "Reportes para superintendencias y organismos reguladores",
    metrics: [
      { value: "9+", label: "Jurisdicciones" },
      { value: "NIIF", label: "Framework" },
      { value: "Basilea", label: "Estándar" },
    ],
    highlights: [
      "Reportes SIB / superintendencias",
      "Cumplimiento NIIF completo",
      "Provisiones automáticas",
    ],
    keyFeatures: [
      { title: "Multi-regulación", desc: "Adaptado a cada país automáticamente" },
      { title: "Generación masiva", desc: "Batch nocturno sin intervención" },
      { title: "Validación", desc: "Pre-validación antes de envío" },
    ],
  },
  riesgo: {
    headline: "Gestión Integral de Riesgo",
    subtitle: "Evaluación, monitoreo y control de riesgo crediticio",
    metrics: [
      { value: "Real-time", label: "Monitoreo" },
      { value: "Auto", label: "Provisiones" },
      { value: "Multi", label: "Modelos" },
    ],
    highlights: [
      "Modelos de scoring y rating",
      "Provisiones automáticas por normativa",
      "Alertas tempranas de deterioro",
      "Concentración y límites de exposición",
    ],
    keyFeatures: [
      { title: "Scoring configurable", desc: "Modelos por país, producto y segmento" },
      { title: "Stress testing", desc: "Escenarios de riesgo paramétrizables" },
      { title: "Dashboards", desc: "Indicadores de riesgo en tiempo real" },
    ],
  },
  usuarios: {
    headline: "Usuarios Ilimitados",
    subtitle: "Sin costos adicionales por usuario nuevo — nunca",
    metrics: [
      { value: "∞", label: "Usuarios" },
      { value: "$0", label: "Costo adicional" },
      { value: "9+", label: "Países" },
    ],
    highlights: [
      "Sin topes de usuarios concurrentes",
      "Sin licencias por named user",
      "Escala con tu operación",
      "Incluye usuarios de todas las geografías",
    ],
    keyFeatures: [
      { title: "Escala libre", desc: "Crece tu equipo sin renegociar contratos" },
      { title: "Onboarding", desc: "Alta masiva de usuarios incluida" },
      { title: "Perfiles", desc: "Roles diferenciados sin costo extra" },
    ],
  },
  instancias: {
    headline: "Instancias Ilimitadas",
    subtitle: "Flexibilidad Total: Administración de instancias por país, por región, por línea de negocio",
    metrics: [
      { value: "∞", label: "Instancias" },
      { value: "$0", label: "Costo adicional" },
      { value: "Aisladas", label: "Por país" },
    ],
    highlights: [
      "Instancia dedicada por país",
      "Aislamiento de datos regulatorio",
      "Configuración independiente",
      "Escalabilidad horizontal",
    ],
    keyFeatures: [
      { title: "Multi-tenant", desc: "Arquitectura nativa multi-instancia" },
      { title: "Governance", desc: "Políticas centralizadas, ejecución local" },
      { title: "DR incluido", desc: "Disaster recovery por instancia" },
    ],
  },
  operaciones: {
    headline: "Operaciones Ilimitadas",
    subtitle: "Sin topes por volumen transaccional — jamás",
    metrics: [
      { value: "∞", label: "Transacciones" },
      { value: "$0", label: "Por operación" },
      { value: "Real-time", label: "Procesamiento" },
    ],
    highlights: [
      "Sin costos por transacción adicional",
      "Procesamiento en tiempo real",
      "Batch masivo sin límites",
      "Alto volumen retail ready",
    ],
    keyFeatures: [
      { title: "Throughput", desc: "Diseñado para millones de operaciones" },
      { title: "Peak handling", desc: "Auto-escalado en temporadas altas" },
      { title: "Sin sorpresas", desc: "Costo fijo sin importar el volumen" },
    ],
  },
  suscripcion: {
    headline: "Modelo Ilimitado — Todo Incluido",
    subtitle: "Una suscripción. Sin topes. Sin letra pequeña.",
    metrics: [
      { value: "∞", label: "Usuarios" },
      { value: "∞", label: "Transacciones" },
      { value: "∞", label: "Evolución" },
    ],
    highlights: [
      "Usuarios ilimitados en todas las geografías",
      "Transacciones y operaciones sin tope de volumen",
      "Soporte técnico 24/7 incluido sin límite de tickets",
      "Capacitación continua y certificaciones incluidas",
      "Evolución de plataforma sin costo adicional",
      "Multi-empresa y multi-país en una sola suscripción",
    ],
    keyFeatures: [
      { title: "Sin costos ocultos", desc: "Precio fijo anual — sin sorpresas al final del mes" },
      { title: "Escala libre", desc: "Crece tu operación sin renegociar contratos" },
      { title: "Todo incluido", desc: "Soporte, capacitación, upgrades, nuevos módulos" },
    ],
    showUnlimitedVisual: true,
  },
  soporte: {
    headline: "Soporte Técnico Ilimitado",
    subtitle: "Sin topes de horas, sin tickets pagados, sin sorpresas",
    metrics: [
      { value: "∞", label: "Horas" },
      { value: "24/5", label: "Disponibilidad" },
      { value: "<4h", label: "SLA crítico" },
    ],
    highlights: [
      "Sin límite de tickets",
      "Equipo dedicado por región",
      "Escalamiento directo a ingeniería",
      "SLA diferenciado por severidad",
    ],
    keyFeatures: [
      { title: "L1/L2/L3", desc: "Tres niveles de soporte incluidos" },
      { title: "Proactivo", desc: "Monitoreo y alertas preventivas" },
      { title: "Knowledge base", desc: "Documentación completa y actualizada" },
    ],
  },
  capacitacion: {
    headline: "Capacitación Continua Ilimitada",
    subtitle: "Onboarding, certificaciones y knowledge transfer incluidos",
    metrics: [
      { value: "∞", label: "Sesiones" },
      { value: "∞", label: "Participantes" },
      { value: "Cert.", label: "Programa" },
    ],
    highlights: [
      "Onboarding de equipos nuevos",
      "Certificación de usuarios clave",
      "Knowledge transfer estructurado",
      "Material actualizado por release",
    ],
    keyFeatures: [
      { title: "Train the trainer", desc: "Formamos a tus formadores internos" },
      { title: "E-learning", desc: "Plataforma de aprendizaje incluida" },
      { title: "Por release", desc: "Capacitación en cada actualización" },
    ],
  },
  evolucion: {
    headline: "Evolución Continua de Plataforma",
    subtitle: "Nuevas funcionalidades y mejoras sin costo adicional",
    metrics: [
      { value: "+35", label: "Años de experiencia" },
      { value: "+800", label: "Instituciones financieras" },
      { value: "+15", label: "Países activos" },
    ],
    highlights: [
      "Releases incluidos",
      "Sin costos de upgrade",
      "Roadmap co-creado con clientes",
      "LATAM + África Occidental",
    ],
    keyFeatures: [
      { title: "Continuous delivery", desc: "Despliegue gradual sin downtime" },
      { title: "Feature flags", desc: "Activación controlada por país" },
      { title: "Co-innovación", desc: "Influencia directa en el roadmap" },
    ],
  },
  paises: {
    headline: "Despliegue Multi-País Sin Límites",
    subtitle: "Multi-moneda, multi-regulación y multi-idioma nativos",
    metrics: [
      { value: "∞", label: "Países" },
      { value: "9", label: "BIG 9 CUBIERTOS + TODOS LOS PAÍSES" },
      { value: "Nativo", label: "Multi-moneda" },
    ],
    highlights: [
      "Sin costos de licencia por país nuevo",
      "Regulación local por jurisdicción",
      "Moneda y formato local",
      "Zonas horarias y calendarios",
      "Incluye todos los países actuales y futuros donde Unicomer opere",
    ],
    keyFeatures: [
      { title: "Plug & play", desc: "Nuevo país en semanas, no meses" },
      { title: "Localización", desc: "Impuestos, formatos, regulación local" },
      { title: "Consolidación", desc: "Vista corporativa multi-país" },
    ],
  },
  onpremise: {
    headline: "Modelo On-Premise",
    subtitle: "Control total en tu infraestructura — Flexibilidad para implementar On-Premise sin costo adicional",
    metrics: [
      { value: "USD 774K", label: "Costo anual total" },
      { value: "100%", label: "Control de datos" },
      { value: "0", label: "Terceros requeridos" },
    ],
    highlights: [
      "Infraestructura propia del cliente",
      "Control total de datos y residencia",
      "Cumplimiento de regulaciones locales de datos",
      "Sin dependencia de cloud externo",
    ],
    keyFeatures: [
      { title: "TCO optimizado", desc: "Sin costos de terceros (DB, middleware, cloud)" },
      { title: "Stack completo", desc: "Base de datos, middleware y herramientas incluidas" },
      { title: "Soporte incluido", desc: "Mantenimiento, parches y soporte en la suscripción" },
    ],
  },
  saas: {
    headline: "Modelo SaaS Cloud",
    subtitle: "Hosting, mantenimiento y soporte todo incluido",
    metrics: [
      { value: "$1.27M", label: "Costo anual total" },
      { value: "99.95%", label: "Uptime SLA" },
      { value: "0", label: "Infra que gestionar" },
    ],
    highlights: [
      "Zero infrastructure management",
      "Alta disponibilidad garantizada",
      "Backups automáticos",
      "Escalabilidad automática",
    ],
    keyFeatures: [
      { title: "Llave en mano", desc: "Solo te preocupas del negocio" },
      { title: "Updates automáticos", desc: "Siempre en la última versión" },
      { title: "Multi-región", desc: "Hosting cercano a cada operación" },
    ],
  },
  cobertura: {
    headline: "Cobertura Total — BIG 9 + Todos los Países",
    subtitle: "Los 9 países principales incluidos + cualquier país donde Unicomer opere — sin costo adicional",
    metrics: [
      { value: "9", label: "BIG 9 incluidos" },
      { value: "+∞", label: "Todos los países" },
      { value: "100%", label: "Cobertura RFP" },
    ],
    highlights: [
      "🇭🇳 Honduras · 🇳🇮 Nicaragua · 🇬🇾 Guyana",
      "🇪🇨 Ecuador · 🇹🇹 Trinidad & Tobago · 🇯🇲 Jamaica",
      "🇬🇹 Guatemala · 🇸🇻 El Salvador · 🇨🇷 Costa Rica",
      "Cualquier país adicional donde Unicomer opere — incluido sin costo",
      "Multi-moneda, multi-regulación, multi-idioma nativos",
    ],
    keyFeatures: [
      { title: "Plug & play", desc: "Nuevo país operativo en semanas, no meses" },
      { title: "Localización nativa", desc: "Impuestos, formatos, regulación por jurisdicción" },
      { title: "Consolidación", desc: "Vista corporativa multi-país en tiempo real" },
    ],
    showRfpStats: true,
  },
  precio: {
    headline: "Inversión Transparente",
    subtitle: "Licencia anual ilimitada — sin costos ocultos, sin letra pequeña",
    metrics: [
      { value: "USD 350K", label: "Credit Core System" },
      { value: "USD 250K", label: "Tarjetas" },
      { value: "5 años", label: "Calendario de pagos" },
    ],
    highlights: [
      "Licencia anual ilimitada por módulo",
      "Sin costos por usuario, transacción o país adicional",
      "Calendario de pagos estructurado a 5 años",
      "Implementación y migración incluidas en año 1",
      "Soporte, capacitación y evolución incluidos",
      "ROI positivo desde el primer año de operación",
    ],
    keyFeatures: [
      { title: "Predecible", desc: "Mismo costo anual sin importar crecimiento" },
      { title: "Todo incluido", desc: "Soporte 24/7, capacitación, upgrades, nuevos módulos" },
      { title: "ROI claro", desc: "Inversión fija vs. crecimiento ilimitado del negocio" },
      { title: "Sin sorpresas", desc: "Cero costos variables, cero letra pequeña" },
    ],
  },
  flexibilidad: {
    headline: "Retail + Tarjetas, Una Plataforma",
    subtitle: "Dos mundos financieros unificados — configurable por país, producto y canal",
    metrics: [
      { value: "2", label: "Mundos unificados" },
      { value: "1", label: "Plataforma" },
      { value: "∞", label: "Configuraciones" },
    ],
    highlights: [
      "Crédito retail de alto volumen (millones de operaciones)",
      "Tarjetas de crédito y débito en la misma plataforma",
      "Configuración independiente por país y producto",
      "Un solo backoffice unificado para toda la operación",
      "Migración progresiva país por país",
      "Integración POS nativa para punto de venta",
    ],
    keyFeatures: [
      { title: "Retail ready", desc: "Integración POS, alto TPS, aprobación instantánea en tienda" },
      { title: "Tarjetas ready", desc: "Emisión, procesamiento, autorización y gestión completa" },
      { title: "Unificado", desc: "Una vista consolidada de crédito + tarjetas por cliente" },
      { title: "Multi-país", desc: "Misma plataforma, configuración local por jurisdicción" },
    ],
  },
};

type Props = {
  piece: PuzzlePiece;
  color: string;
  onClose: () => void;
  onNavigate: (sectionId?: string) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
};

const PieceDetailSlide = ({ piece, color, onClose }: Props) => {
  const data = SLIDE_DATA[piece.id];
  if (!data) return null;

  return (
    <motion.div
      className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden max-w-2xl w-full mx-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="relative px-8 pt-7 pb-5" style={{ backgroundColor: `${color}0D` }}>
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              variants={scaleIn}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: color }}
            >
              <piece.icon size={26} />
            </motion.div>
            <div>
              <motion.p variants={fadeUp} className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>{piece.layerLabel}</motion.p>
              <motion.h3 variants={fadeUp} className="font-display text-xl font-bold text-foreground leading-tight">{data.headline}</motion.h3>
              <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-0.5">{data.subtitle}</motion.p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground mt-1 p-1 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </motion.div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-0 border-b border-border">
        {data.metrics.map((m, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            className={`text-center py-4 ${i < 2 ? "border-r border-border" : ""}`}
          >
            <p className="font-display text-2xl font-bold" style={{ color }}>{m.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium mt-0.5">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content body */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Highlights */}
        <div className="p-6 border-r border-border">
          <motion.p variants={fadeUp} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Alcance incluido</motion.p>
          <ul className="space-y-2.5">
            {data.highlights.map((h, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-2.5 text-sm text-foreground"
              >
                <motion.div
                  variants={scaleIn}
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Check size={10} style={{ color }} strokeWidth={3} />
                </motion.div>
                {h}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Key features */}
        <div className="p-6">
          <motion.p variants={fadeUp} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Diferenciadores</motion.p>
          <div className="space-y-3.5">
            {data.keyFeatures.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  {f.title}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed pl-3">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Unlimited Visual for Suscripción */}
      {data.showUnlimitedVisual && (
        <motion.div variants={fadeUp} className="px-6 pb-6 pt-2">
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">¿Qué incluye tu suscripción?</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: "👥", label: "Usuarios", sub: "Sin límite" },
                { emoji: "🏢", label: "Empresas", sub: "Todas incluidas" },
                { emoji: "💳", label: "Transacciones", sub: "Sin tope" },
                { emoji: "🎧", label: "Soporte", sub: "24/7 incluido" },
                { emoji: "🎓", label: "Capacitación", sub: "Continua" },
                { emoji: "🚀", label: "Evolución", sub: "Sin costo extra" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="text-center p-3 rounded-lg bg-card border border-border"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-[11px] font-bold text-foreground">{item.label}</div>
                  <div className="text-[9px] text-accent font-semibold">{item.sub}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Sin letra pequeña · Sin costos ocultos · Sin sorpresas
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* RFP Stats for Cobertura */}
      {data.showRfpStats && (
        <motion.div variants={fadeUp} className="px-6 pb-6 pt-2">
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Respuesta al RFP — Cobertura Verificada</p>
            
            {/* Visual bar charts */}
            <div className="space-y-3 mb-4">
              {(() => {
                const totalFunc = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup).length, 0);
                const totalTech = TECHNICAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup).length, 0);
                const totalStd = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => i.coverage === "std").length, 0);
                const totalCompliant = TECHNICAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup && i.compliance?.toLowerCase().includes("compliant") && !i.compliance?.toLowerCase().includes("not")).length, 0);
                const funcPct = Math.round((totalStd / totalFunc) * 100);
                const techPct = Math.round((totalCompliant / totalTech) * 100);

                return (
                  <>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-semibold text-foreground">Funcionales ({totalFunc} reqs)</span>
                        <span className="font-bold text-emerald-600">{funcPct}% estándar</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${funcPct}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-semibold text-foreground">Técnicos ({totalTech} reqs)</span>
                        <span className="font-bold text-blue-600">{techPct}% cumple</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${techPct}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="text-center p-2 rounded-lg bg-card border border-border">
                        <div className="text-lg font-bold text-foreground">{totalFunc + totalTech}</div>
                        <div className="text-[8px] text-muted-foreground uppercase">Total Reqs</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-card border border-border">
                        <div className="text-lg font-bold text-foreground">99.95%</div>
                        <div className="text-[8px] text-muted-foreground uppercase">SLA Uptime</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-card border border-border">
                        <div className="text-lg font-bold text-accent">$0</div>
                        <div className="text-[8px] text-muted-foreground uppercase">País adicional</div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document.getElementById("rfp")?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
            >
              Ver respuesta completa al RFP
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* SYSDE IA hint at bottom of every slide */}
      <motion.div variants={fadeUp} className="px-6 pb-5 pt-2 flex justify-end">
        <button
          onClick={openSysdeChat}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/8 hover:bg-accent/15 border border-accent/15 transition-all group"
        >
          <Lightbulb className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Pregunta a <span className="text-accent font-semibold">SYSDE IA</span>
          </span>
        </button>
      </motion.div>

    </motion.div>
  );
};

export default PieceDetailSlide;
