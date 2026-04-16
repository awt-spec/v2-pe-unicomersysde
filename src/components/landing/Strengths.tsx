import { motion } from "framer-motion";
import { Award, Users, GraduationCap, HeadphonesIcon, Fingerprint } from "lucide-react";

const strengths = [
  {
    icon: Fingerprint,
    title: "Propiedad Intelectual Propia",
    description:
      "SYSDE es dueño del 100% del código fuente de SAF+. No es reseller ni distribuidor. Esto garantiza control total sobre roadmap, personalizaciones y soporte.",
  },
  {
    icon: Award,
    title: "Experiencia en Retail Financiero LATAM",
    description:
      "Más de 25 años implementando soluciones de crédito retail en la región. Clientes de referencia en mercados similares al de Unicomer.",
  },
  {
    icon: GraduationCap,
    title: "Estrategia de Knowledge Transfer",
    description:
      "Plan estructurado de transferencia de conocimiento: inicia con 100% soporte vendor, evoluciona a modelo 50/50 y culmina con autonomía operativa del cliente.",
  },
  {
    icon: HeadphonesIcon,
    title: "SLAs Comprometidos",
    description:
      "Acuerdos de nivel de servicio que incluyen disponibilidad 99.95%+, tiempos de respuesta definidos por severidad y soporte 24/7 para incidentes críticos.",
  },
  {
    icon: Users,
    title: "Equipo Dedicado",
    description:
      "Equipo de proyecto con roles definidos: Project Manager, arquitectos, desarrolladores senior y especialistas funcionales con experiencia en implementaciones similares.",
  },
];

const Strengths = () => (
  <section id="fortalezas" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">
          ¿Por Qué SYSDE?
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
          Fortalezas Clave
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Diferenciadores que posicionan a SYSDE como el socio ideal para
          la transformación del core de crédito de Unicomer.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {strengths.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
              <s.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Strengths;
