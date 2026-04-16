import { motion } from "framer-motion";
import {
  Server,
  Database,
  Shield,
  Activity,
  Plug,
  CheckCircle2,
} from "lucide-react";

interface TechItem {
  label: string;
}

interface TechCategory {
  icon: React.ElementType;
  title: string;
  items: TechItem[];
}

const techData: TechCategory[] = [
  {
    icon: Server,
    title: "Arquitectura",
    items: [
      { label: "Multi-cloud (Azure, AWS, GCP)" },
      { label: "Microservicios" },
      { label: "API REST first" },
      { label: "SaaS / IaaS / PaaS" },
      { label: "Contenedores Docker / Kubernetes" },
    ],
  },
  {
    icon: Database,
    title: "Base de Datos",
    items: [
      { label: "SQL Server (relacional)" },
      { label: "Redis (caché distribuido)" },
      { label: "Particionamiento y sharding" },
    ],
  },
  {
    icon: Shield,
    title: "Seguridad",
    items: [
      { label: "SSO (Azure AD, Okta, etc.)" },
      { label: "Autenticación multifactor (MFA)" },
      { label: "RBAC (Role-Based Access Control)" },
      { label: "TLS 1.2 / 1.3 en tránsito" },
      { label: "Encriptación AES-256 en reposo" },
      { label: "Auditoría de accesos y cambios" },
    ],
  },
  {
    icon: Activity,
    title: "Alta Disponibilidad",
    items: [
      { label: "Arquitectura active-active" },
      { label: "DR geográfico multi-región" },
      { label: "Backups automatizados" },
      { label: "SLA 99.95% de disponibilidad" },
      { label: "Monitoreo y alertas 24/7" },
    ],
  },
  {
    icon: Plug,
    title: "Integraciones",
    items: [
      { label: "APIs REST y SOAP" },
      { label: "Documentación OpenAPI / Swagger" },
      { label: "Webhooks para eventos" },
      { label: "Bus de integración (ESB)" },
      { label: "ETL y procesamiento batch" },
    ],
  },
];

const TechnicalCompliance = () => (
  <section id="tecnico" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">
          Cumplimiento Técnico
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
          Arquitectura & Seguridad
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Capacidades técnicas incluidas en SAF+.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {techData.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <cat.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{cat.title}</h3>
            </div>
            <div className="space-y-2.5">
              {cat.items.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <div className="mt-0.5 rounded-full p-0.5 bg-success/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  </div>
                  <span className="text-sm text-foreground/90">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechnicalCompliance;
