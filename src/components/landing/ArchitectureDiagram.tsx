import { motion } from "framer-motion";
import {
  Monitor, Smartphone, Globe, ShoppingCart, MessageSquare,
  Cloud, Zap, RefreshCw, Lock,
  CreditCard, Shield, Users, BookOpen, SlidersHorizontal,
  Briefcase, ClipboardList, Scale, Settings,
  Database, Server, HardDrive, BarChart3,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ArchitectureDiagram = () => (
  <section id="arquitectura" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">
          Infraestructura
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
          Arquitectura SAF+
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-card rounded-2xl border border-border shadow-lg p-5 md:p-8 space-y-3">
          {/* Canales */}
          <Layer
            label="Canales"
            color="text-accent"
            border="border-accent/20"
            items={[
              { icon: Monitor, label: "POS" },
              { icon: Globe, label: "Web" },
              { icon: Smartphone, label: "Móvil" },
              { icon: ShoppingCart, label: "E-Commerce" },
              { icon: MessageSquare, label: "WhatsApp" },
            ]}
          />

          <Arrow />

          {/* Integración */}
          <Layer
            label="Capa de Integración"
            color="text-warning"
            border="border-warning/20"
            items={[
              { icon: Cloud, label: "API Gateway" },
              { icon: Zap, label: "Event Bus" },
              { icon: RefreshCw, label: "ESB" },
              { icon: Lock, label: "Auth / SSO" },
            ]}
          />

          <Arrow />

          {/* SAF+ Core — highlighted */}
          <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-4">
            <span className="block text-center text-xs font-display font-bold text-accent uppercase tracking-widest mb-3">
              SAF+ Core
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { icon: Shield, label: "Seguridad" },
                { icon: SlidersHorizontal, label: "Políticas" },
                { icon: Users, label: "Clientes" },
                { icon: CreditCard, label: "Préstamos" },
                { icon: Smartphone, label: "Tarjetas" },
                { icon: ClipboardList, label: "Originación" },
                { icon: Briefcase, label: "Cartera" },
                { icon: Scale, label: "Factoraje" },
                { icon: BookOpen, label: "Contabilidad" },
                { icon: Settings, label: "Parámetros" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 bg-card rounded-lg px-3 py-2 border border-accent/15 text-xs font-medium text-foreground"
                >
                  <c.icon className="h-3.5 w-3.5 text-accent shrink-0" />
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          <Arrow />

          {/* Datos */}
          <Layer
            label="Capa de Datos"
            color="text-primary"
            border="border-primary/20"
            items={[
              { icon: Database, label: "SQL Server" },
              { icon: Server, label: "Redis" },
              { icon: HardDrive, label: "Blob Storage" },
              { icon: BarChart3, label: "Data Warehouse" },
            ]}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

function Layer({ label, color, border, items }: {
  label: string;
  color: string;
  border: string;
  items: { icon: React.ElementType; label: string }[];
}) {
  return (
    <div className={cn("rounded-xl border p-3", border)}>
      <span className={cn("block text-center text-[10px] font-display font-semibold uppercase tracking-widest mb-2", color)}>
        {label}
      </span>
      <div className="flex flex-wrap gap-2 justify-center">
        {items.map((c) => (
          <span key={c.label} className="inline-flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground border border-border">
            <c.icon className={cn("h-3.5 w-3.5 shrink-0", color)} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center">
      <ArrowDown className="h-4 w-4 text-border" />
    </div>
  );
}

export default ArchitectureDiagram;
