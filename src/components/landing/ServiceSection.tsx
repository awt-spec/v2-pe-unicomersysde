import { motion } from "framer-motion";
import { HeadphonesIcon, GraduationCap, Wifi, Users, ShieldCheck, Rocket } from "lucide-react";

const services = [
  { icon: HeadphonesIcon, title: "Soporte ilimitado incluido", desc: "Sin tickets, sin topes de horas. Soporte real cuando lo necesites." },
  { icon: GraduationCap, title: "Capacitación continua", desc: "Para equipos funcionales y técnicos, durante y después de la implementación." },
  { icon: Wifi, title: "Implementación 100% remota", desc: "Sin viáticos, sin desplazamientos. Toda la implementación de forma remota." },
  { icon: Users, title: "Equipo dedicado disponible", desc: "Modelo fábrica de desarrollo para personalizaciones y evolución continua." },
  { icon: ShieldCheck, title: "SLA garantizado", desc: "99.95% de disponibilidad garantizada desde el día uno." },
  { icon: Rocket, title: "Acompañamiento post go-live", desc: "Seguimiento permanente después de salir en vivo. No te dejamos solo." },
];

const ServiceSection = () => (
  <section id="servicio" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Servicio <span className="text-accent">sin límites</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <s.icon size={22} className="text-accent" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceSection;
