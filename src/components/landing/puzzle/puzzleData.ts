import {
  CreditCard, Wallet,
  Shield, BarChart3, Users,
  Repeat, Globe, HeadphonesIcon, GraduationCap,
  TrendingUp, HardDrive, Cloud, Server,
  MapPin, Layers, AlertTriangle,
  DollarSign,
} from "lucide-react";

export type PuzzlePiece = {
  id: string;
  label: string;
  icon: React.ElementType;
  layer: number;
  description: string;
  fullDescription: string;
  layerLabel: string;
  col: number;
  row: number;
  colSpan?: number;
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  sectionId?: string;
};

export const PIECES: PuzzlePiece[] = [
  // Layer 1: Módulos — Row 0 (4 pieces)
  { id: "prestamos", label: "Credit Core System", icon: CreditCard, layer: 1, col: 0, row: 0, scatterX: -220, scatterY: -160, scatterRotate: -22, layerLabel: "Módulo Core", description: "Préstamos, crédito, microcrédito", fullDescription: "Gestión integral de préstamos: consumo masivo, crédito comercial, microcrédito, financiamiento PYME y líneas de crédito revolventes.", sectionId: "modulos" },
  { id: "tarjetas", label: "Tarjetas", icon: Wallet, layer: 1, col: 1, row: 0, scatterX: -70, scatterY: -200, scatterRotate: 14, layerLabel: "Módulo Core", description: "Crédito (cerrada y abierta) · Débito sobre ahorro · Cuentas corrientes", fullDescription: "Tarjeta de crédito cerrada (marca propia) y abierta (Visa/Mastercard). Tarjeta de débito sobre cuentas de ahorro. Cuentas corrientes integradas.", sectionId: "modulos" },
  { id: "seguridad", label: "Seguridad", icon: Shield, layer: 1, col: 2, row: 0, scatterX: 70, scatterY: -180, scatterRotate: -12, layerLabel: "Módulo Core", description: "RBAC, MFA, SSO y reglas de negocio", fullDescription: "Administración de seguridad con RBAC, MFA, SSO y configuración de reglas de negocio paramétrizables.", sectionId: "modulos" },
  { id: "regulatorio", label: "Regulatorio", icon: BarChart3, layer: 1, col: 3, row: 0, scatterX: 220, scatterY: -150, scatterRotate: 20, layerLabel: "Módulo Core", description: "Reportes regulatorios y cumplimiento", fullDescription: "Generación automática de reportes regulatorios para superintendencias. Cumplimiento NIIF y Basilea.", sectionId: "modulos" },

  // Layer 1: Módulos — Row 1 (riesgo added)
  { id: "riesgo", label: "Riesgo", icon: AlertTriangle, layer: 1, col: 0, row: 1, scatterX: -240, scatterY: 15, scatterRotate: 18, layerLabel: "Módulo Core", description: "Gestión integral de riesgo crediticio", fullDescription: "Evaluación, monitoreo y control de riesgo crediticio. Modelos de scoring, provisiones y alertas tempranas.", sectionId: "modulos" },

  // Layer 2: Modelo Ilimitado — Row 1 (continuation) + Row 2
  { id: "usuarios", label: "Usuarios", icon: Users, layer: 2, col: 1, row: 1, scatterX: -80, scatterY: -140, scatterRotate: 15, layerLabel: "Ilimitado", description: "Sin límite de usuarios en ninguna geografía", fullDescription: "Usuarios ilimitados en todas las geografías. Sin costos adicionales por usuario nuevo.", sectionId: "ilimitado" },
  { id: "instancias", label: "Instancias", icon: Server, layer: 2, col: 2, row: 1, scatterX: 80, scatterY: -120, scatterRotate: -14, layerLabel: "Ilimitado", description: "Sin límite de instancias por país o unidad", fullDescription: "Instancias ilimitadas por país o unidad de negocio. Escalabilidad sin restricciones de infraestructura.", sectionId: "ilimitado" },
  { id: "operaciones", label: "Operaciones", icon: Repeat, layer: 2, col: 3, row: 1, scatterX: 220, scatterY: -90, scatterRotate: 18, layerLabel: "Ilimitado", description: "Sin límite de transacciones ni costos por volumen", fullDescription: "Operaciones y transacciones ilimitadas. Sin topes por volumen ni costos por transacción adicional.", sectionId: "ilimitado" },

  { id: "suscripcion", label: "Suscripción", icon: CreditCard, layer: 2, col: 0, row: 2, scatterX: -220, scatterY: -100, scatterRotate: -20, layerLabel: "Ilimitado", description: "Modelo de suscripción anual ilimitada", fullDescription: "Suscripción anual fija que incluye usuarios, transacciones, soporte, capacitación y evolución — sin costos ocultos.", sectionId: "ilimitado" },
  { id: "soporte", label: "Soporte", icon: HeadphonesIcon, layer: 2, col: 1, row: 2, scatterX: -210, scatterY: 150, scatterRotate: -17, layerLabel: "Ilimitado", description: "Soporte técnico sin topes de horas", fullDescription: "Soporte técnico ilimitado incluido en la suscripción. Sin topes de horas ni costos ocultos.", sectionId: "ilimitado" },
  { id: "capacitacion", label: "Capacitación", icon: GraduationCap, layer: 2, col: 2, row: 2, scatterX: -60, scatterY: 190, scatterRotate: 14, layerLabel: "Ilimitado", description: "Programa de capacitación continua sin límites", fullDescription: "Programa de capacitación continua sin límites. Onboarding, certificaciones y knowledge transfer incluidos.", sectionId: "ilimitado" },
  { id: "evolucion", label: "Evolución", icon: TrendingUp, layer: 2, col: 3, row: 2, scatterX: 60, scatterY: 180, scatterRotate: -10, layerLabel: "Ilimitado", description: "Actualizaciones y mejoras sin costo adicional", fullDescription: "Actualizaciones continuas de la plataforma. Nuevas funcionalidades y mejoras sin costo adicional.", sectionId: "ilimitado" },

  // Layer 3: Precio — Row 3 + Row 4
  { id: "paises", label: "Países", icon: Globe, layer: 2, col: 0, row: 3, scatterX: 210, scatterY: 160, scatterRotate: 16, layerLabel: "Ilimitado", description: "Todos los países actuales y futuros donde Unicomer opere", fullDescription: "BIG 9 + todos los países actuales y futuros donde Unicomer opere, sin costos adicionales de licencia. Multi-moneda y multi-regulación nativos.", sectionId: "ilimitado" },

  { id: "onpremise", label: "On-Premise", icon: HardDrive, layer: 3, col: 1, row: 3, scatterX: -200, scatterY: 100, scatterRotate: -16, layerLabel: "Precio", description: "Despliegue en tu propia infraestructura", fullDescription: "Despliegue en tu propia infraestructura con control total del entorno. Licenciamiento por créditos activos.", sectionId: "pricing" },
  { id: "saas", label: "SaaS Cloud", icon: Cloud, layer: 3, col: 2, row: 3, scatterX: -70, scatterY: 140, scatterRotate: 12, layerLabel: "Precio", description: "Hosting, mantenimiento y soporte incluido", fullDescription: "Modelo SaaS con hosting, mantenimiento y soporte incluido. Escalabilidad automática y alta disponibilidad.", sectionId: "pricing" },
  { id: "cobertura", label: "Cobertura", icon: MapPin, layer: 3, col: 3, row: 3, scatterX: 70, scatterY: 130, scatterRotate: -10, layerLabel: "Precio", description: "BIG 9 + todos los países Unicomer", fullDescription: "Cobertura completa en los 9 países del BIG 9 más todos los países actuales y futuros donde Unicomer opere.", sectionId: "pricing" },

  { id: "precio", label: "Precio", icon: DollarSign, layer: 3, col: 0, row: 4, colSpan: 2, scatterX: -200, scatterY: 110, scatterRotate: -15, layerLabel: "Precio", description: "Licencia anual ilimitada desde USD 350,000", fullDescription: "Modelo de pricing transparente con licencia anual ilimitada. Sin costos ocultos.", sectionId: "pricing" },
  { id: "flexibilidad", label: "Flexibilidad", icon: Layers, layer: 3, col: 2, row: 4, colSpan: 2, scatterX: 200, scatterY: 110, scatterRotate: 15, layerLabel: "Precio", description: "Retail + Tarjetas en una sola plataforma", fullDescription: "Flexibilidad para operar crédito retail de alto volumen y tarjetas desde una sola plataforma configurable por país.", sectionId: "dosmundos" },
];

export const LAYERS = [
  { id: 1, name: "Módulos", color: "#b41d2f" },
  { id: 2, name: "Modelo Ilimitado", color: "#d97706" },
  { id: 3, name: "Precio", color: "#3B82F6" },
];

export const MAX_ROWS = 5;
export const MAX_COLS = 4;
export const CELL_W = 140;
