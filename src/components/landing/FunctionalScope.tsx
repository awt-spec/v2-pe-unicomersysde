import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Users, CreditCard, Smartphone, BookOpen,
  Scale, Briefcase, RefreshCw, Lock, Layers,
  ChevronDown, CheckCircle2, Plug, MinusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Coverage = "std" | "api" | "ns";

interface ScopeItem {
  feature: string;
  coverage: Coverage;
  note?: string;
}

interface ScopeCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  items: ScopeItem[];
}

const coverageConfig: Record<Coverage, { label: string; shortLabel: string; icon: React.ElementType; className: string; dotClass: string }> = {
  std: { label: "Estándar — Incluido", shortLabel: "STD", icon: CheckCircle2, className: "text-success bg-success/10 border-success/20", dotClass: "bg-success" },
  api: { label: "Vía API", shortLabel: "API", icon: Plug, className: "text-accent bg-accent/10 border-accent/20", dotClass: "bg-accent" },
  ns:  { label: "No aplica", shortLabel: "N/A", icon: MinusCircle, className: "text-muted-foreground bg-muted border-border", dotClass: "bg-muted-foreground/40" },
};

const SCOPE: ScopeCategory[] = [
  {
    id: "base", label: "Requisitos Base", icon: Shield,
    items: [
      { feature: "Multi-país / multi-moneda", coverage: "std" },
      { feature: "RBAC con segregación de funciones", coverage: "std" },
      { feature: "Parametrización completa (catálogos, tasas, plazos)", coverage: "std" },
      { feature: "Políticas de negocio configurables (100+)", coverage: "std" },
      { feature: "MFA y SSO (Azure AD)", coverage: "std" },
      { feature: "Log inmutable de auditoría", coverage: "std" },
    ],
  },
  {
    id: "credito", label: "Crédito & Préstamos", icon: CreditCard,
    items: [
      { feature: "Hire Purchase (HP)", coverage: "std" },
      { feature: "Crédito revolving", coverage: "std" },
      { feature: "Cash loans / microcréditos", coverage: "std" },
      { feature: "Tablas de amortización", coverage: "std" },
      { feature: "Control de garantías", coverage: "std" },
      { feature: "Reestructuración de créditos", coverage: "std" },
    ],
  },
  {
    id: "tarjetas", label: "Core Tarjetas", icon: Smartphone,
    items: [
      { feature: "Emisión y activación", coverage: "std" },
      { feature: "Bloqueo / desbloqueo", coverage: "std" },
      { feature: "Ciclo de vida completo (crédito y débito)", coverage: "std" },
      { feature: "Procesamiento de transacciones", coverage: "std" },
    ],
  },
  {
    id: "originacion", label: "Originación", icon: Layers,
    items: [
      { feature: "Motor de originación (Salesforce Unicomer)", coverage: "api", note: "Unicomer mantiene Salesforce como motor de originación" },
      { feature: "API de scoring y evaluación crediticia", coverage: "api", note: "SAF+ expone API REST para decisión crediticia" },
      { feature: "Webhook de aprobación/rechazo", coverage: "api", note: "Notificación en tiempo real al CRM" },
      { feature: "Desembolso automático post-aprobación", coverage: "std" },
    ],
  },
  {
    id: "cartera", label: "Gestión de Cartera & Cobranza", icon: Briefcase,
    items: [
      { feature: "Aging de cartera", coverage: "std" },
      { feature: "Clasificación de riesgo", coverage: "std" },
      { feature: "Monitoreo de mora", coverage: "std" },
      { feature: "Estrategias de cobranza configurables", coverage: "std" },
      { feature: "Gestión de castigos", coverage: "std" },
    ],
  },
  {
    id: "clientes", label: "Administración de Clientes", icon: Users,
    items: [
      { feature: "Ciclo de vida del cliente", coverage: "std" },
      { feature: "KYC / Know Your Customer", coverage: "std" },
      { feature: "Segmentación", coverage: "std" },
      { feature: "Actualización masiva de datos", coverage: "std" },
    ],
  },
  {
    id: "contabilidad", label: "Contabilidad", icon: BookOpen,
    items: [
      { feature: "Pólizas contables automáticas", coverage: "std" },
      { feature: "Plan de cuentas configurable", coverage: "std" },
      { feature: "Cierre contable", coverage: "std" },
      { feature: "IFRS 9 / NIIF 9 — Provisiones ECL", coverage: "std" },
      { feature: "Sincronización con ERP externo", coverage: "std", note: "Adaptadores configurables por país" },
    ],
  },
  {
    id: "factoraje", label: "Factoraje", icon: Scale,
    items: [
      { feature: "Descuento de facturas", coverage: "std" },
      { feature: "Cesión de derechos", coverage: "std" },
      { feature: "Administración de documentos por cobrar", coverage: "std" },
    ],
  },
  {
    id: "integraciones", label: "Integraciones", icon: RefreshCw,
    items: [
      { feature: "AML / OFAC — Prevención de lavado", coverage: "std" },
      { feature: "Conciliación automática de pagos", coverage: "std" },
      { feature: "Pasarelas de pago y wallets", coverage: "std", note: "Según proveedor local" },
      { feature: "POS Retail — Originación en tienda", coverage: "api", note: "Integración POS vía API REST" },
      { feature: "Sistema Unicaja (caja y recaudación)", coverage: "std" },
      { feature: "Canales digitales (web, app, WhatsApp)", coverage: "std", note: "SYSDE provee APIs; front-end a cargo de Unicomer" },
    ],
  },
  {
    id: "operaciones", label: "Operaciones & Gobernanza", icon: Lock,
    items: [
      { feature: "Dashboards BI gerenciales", coverage: "std" },
      { feature: "KPIs de cartera y rentabilidad", coverage: "std" },
      { feature: "Reportería regulatoria por país", coverage: "std", note: "Templates por regulador" },
    ],
  },
];

const CategoryRow = ({ category }: { category: ScopeCategory }) => {
  const [open, setOpen] = useState(false);
  const Icon = category.icon;
  const stdCount = category.items.filter(i => i.coverage === "std").length;

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
      >
        <Icon className="h-4 w-4 text-accent shrink-0" />
        <span className="flex-1 text-sm font-semibold text-foreground">{category.label}</span>
        <span className="text-[10px] text-muted-foreground tabular-nums">{stdCount}/{category.items.length} STD</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-0.5">
              {category.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 pl-7">
                  <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", coverageConfig[item.coverage].dotClass)} />
                  <span className="text-xs text-foreground flex-1">{item.feature}</span>
                  {item.note && <span className="text-[10px] text-muted-foreground hidden sm:inline max-w-[200px] truncate">{item.note}</span>}
                  <span className={cn("text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border", coverageConfig[item.coverage].className)}>
                    {coverageConfig[item.coverage].shortLabel}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FunctionalScope = () => {
  const totalItems = SCOPE.reduce((sum, c) => sum + c.items.length, 0);
  const stdCount = SCOPE.reduce((sum, c) => sum + c.items.filter(i => i.coverage === "std").length, 0);
  const apiCount = SCOPE.reduce((sum, c) => sum + c.items.filter(i => i.coverage === "api").length, 0);

  return (
    <section id="alcance" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
            Matriz de Alcance
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-3">
            Todo incluido. Sin sorpresas.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            {totalItems} capacidades — {stdCount} estándar, {apiCount} vía API.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="max-w-3xl mx-auto flex justify-center gap-4 mb-6">
          {(["std", "api"] as Coverage[]).map((type) => {
            const c = coverageConfig[type];
            const Icon = c.icon;
            return (
              <span key={type} className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase", c.className)}>
                <Icon className="h-3 w-3" /> {c.label}
              </span>
            );
          })}
        </div>

        {/* Compact one-page list */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card border border-border rounded-2xl overflow-hidden"
        >
          {SCOPE.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </motion.div>

        {/* Salesforce callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-6 bg-card border border-accent/20 rounded-2xl p-5 flex items-start gap-3"
        >
          <Plug className="h-4 w-4 text-accent mt-0.5 shrink-0" />
          <div>
            <h4 className="font-display font-bold text-foreground text-sm">Originación → Salesforce + API SAF+</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Unicomer mantiene Salesforce como motor de originación. SAF+ expone APIs REST de scoring, decisión crediticia y desembolso automático.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FunctionalScope;
