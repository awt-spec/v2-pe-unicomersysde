import { motion } from "framer-motion";
import { XCircle, AlertTriangle } from "lucide-react";

const exclusions = [
  {
    title: "Modelos de acceso ABAC / RADAC",
    detail:
      "SAF+ implementa RBAC (Role-Based Access Control). Los modelos de control de acceso basados en atributos (ABAC) o riesgo (RADAC) no son soportados nativamente.",
  },
  {
    title: "Bases de datos NoSQL nativas",
    detail:
      "MongoDB, Cassandra y CouchDB no se utilizan como motor principal. SAF+ usa SQL Server y Redis. La integración con fuentes NoSQL externas es posible vía APIs.",
  },
  {
    title: "Acceso directo a datos de producción por personal de SYSDE",
    detail:
      "Por diseño de seguridad, el staff de SYSDE no tiene acceso directo a datos de producción del cliente. El acceso se gestiona a través de procesos controlados.",
  },
  {
    title: "Funcionalidades marcadas como NS/NR en los anexos",
    detail:
      "Ciertos requerimientos específicos del RFP fueron catalogados como No Soportados (NS) o No Responde (NR). Estos están detallados ítem por ítem en la matriz de respuesta del Anexo 1.",
  },
];

const Exclusions = () => (
  <section id="exclusiones" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-destructive font-semibold text-sm uppercase tracking-widest">
          Transparencia
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
          Lo Que No Está Incluido
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          En aras de la transparencia, estos son los ítems del RFP que SAF+ no cubre
          de forma nativa o que quedaron fuera del alcance de esta propuesta.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {exclusions.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="flex gap-4 p-5 rounded-xl border border-destructive/20 bg-destructive/5"
          >
            <div className="mt-0.5 shrink-0">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 max-w-3xl mx-auto flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20"
      >
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80">
          Todos los ítems marcados como <strong>THR (Third Party)</strong> en los anexos
          pueden ser cubiertos mediante integraciones con proveedores especializados,
          según las necesidades específicas de Unicomer.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Exclusions;
