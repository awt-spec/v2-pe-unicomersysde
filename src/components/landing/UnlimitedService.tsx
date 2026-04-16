import { motion } from "framer-motion";
import {
  Infinity, Users, Building2, Headphones, GraduationCap,
  DollarSign, Sparkles, Blocks, CheckCircle2, CreditCard,
  Lock, Rocket, ArrowRight,
} from "lucide-react";

const items = [
  {
    icon: Users,
    label: "Usuarios Ilimitados",
    desc: "Sin límite de usuarios concurrentes. Sin cobro por licencia individual.",
  },
  {
    icon: Building2,
    label: "Multi-Empresa",
    desc: "Todas las entidades, subsidiarias y países bajo una sola suscripción.",
  },
  {
    icon: CreditCard,
    label: "Créditos Sin Tope",
    desc: "Desembolsos, reestructuraciones y líneas de crédito — sin restricción.",
  },
  {
    icon: Headphones,
    label: "Soporte 24/7",
    desc: "Mesa de ayuda dedicada sin cobro por ticket ni por incidente.",
  },
  {
    icon: GraduationCap,
    label: "Capacitación Continua",
    desc: "Formación, certificación y sesiones de entrenamiento incluidas.",
  },
  {
    icon: DollarSign,
    label: "Transacciones Ilimitadas",
    desc: "Cobros, consultas, reportes y operaciones — sin límite de volumen.",
  },
  {
    icon: Sparkles,
    label: "Evolución Permanente",
    desc: "Nuevas funcionalidades, regulatorio y mejoras continuas sin costo extra.",
  },
  {
    icon: Blocks,
    label: "Arquitectura Modular",
    desc: "Activa solo lo que necesitas hoy. Escala sin renegociar.",
  },
];

const UnlimitedService = () => (
  <section id="servicio" className="py-24 bg-background relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-3xl" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-4">
          <Infinity className="w-4 h-4" />
          Modelo de Licenciamiento
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Todo incluido.{" "}
          <span className="text-gradient">Sin sorpresas.</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Una suscripción mensual fija que cubre usuarios, empresas, transacciones,
          soporte, capacitación y evolución del producto — sin costos ocultos.
        </p>
      </motion.div>

      {/* Hero stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-14"
      >
        <div className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "∞", label: "Usuarios" },
            { value: "∞", label: "Empresas" },
            { value: "∞", label: "Transacciones" },
            { value: "∞", label: "Evolución" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-7xl md:text-8xl font-display font-bold text-accent-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium opacity-70 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative rounded-xl border border-border bg-card p-5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <item.icon className="w-5 h-5 text-accent" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1.5 font-display">
              {item.label}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Infinity className="w-4 h-4 text-accent/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-20"
      >
        {["Sin letra pequeña", "Sin costos ocultos", "Sin sorpresas"].map((text) => (
          <span key={text} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            {text}
          </span>
        ))}
      </motion.div>

      {/* Roadmap — Explanation only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold text-accent tracking-widest uppercase">
            Visión de Futuro
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Roadmap Estratégico
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Unicomer tendrá acceso a <strong>dos roadmaps complementarios</strong> que garantizan
            evolución continua y prioridades dedicadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Roadmap Exclusivo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-accent/30 bg-accent/5 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                Roadmap Exclusivo Unicomer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Un plan de evolución <strong>dedicado y personalizado</strong> alineado a las prioridades
                estratégicas de Unicomer. Incluye funcionalidades, integraciones y optimizaciones
                diseñadas específicamente para su operación regional.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Prioridades definidas por Unicomer",
                  "Sprints dedicados al cliente",
                  "Integraciones a medida (Salesforce, ERP, etc.)",
                  "Expansión país por país según su estrategia",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Roadmap Producto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-secondary/30 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Rocket className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                Roadmap de Producto SAF+
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Acceso completo a <strong>todas las innovaciones</strong> del producto SAF+ sin costo
                adicional. Cada mejora, nuevo módulo o capacidad que se desarrolle estará
                disponible automáticamente.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Nuevas funcionalidades automáticas",
                  "Actualizaciones regulatorias incluidas",
                  "Módulos de IA y analytics",
                  "Evolución tecnológica continua",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default UnlimitedService;
