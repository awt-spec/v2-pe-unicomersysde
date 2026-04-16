import { motion } from "framer-motion";
import { Calendar, Building2, Globe, MapPin } from "lucide-react";
import SysdeHint from "./SysdeHint";

const metrics = [
  { icon: Calendar, value: "+35", label: "años de experiencia" },
  { icon: Building2, value: "+800", label: "instituciones financieras" },
  { icon: Globe, value: "+15", label: "países activos" },
  { icon: MapPin, value: "LATAM + África", label: "Occidental" },
];

const WhySysde = () => (
  <section id="porque" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Seguimos evolucionando. <span className="text-accent">Cada día, más lejos.</span>
        </h2>
        <p className="text-muted-foreground text-lg">+800 instituciones financieras ya confían en nosotros</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <m.icon size={20} className="text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-8"
      >
        <SysdeHint text="¿Quieres saber más sobre SYSDE?" />
      </motion.div>
    </div>
  </section>
);

export default WhySysde;
