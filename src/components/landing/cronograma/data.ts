import type { Fase, Compromiso, PhaseSaving, Driver } from "./types";

export const HONDURAS_DRIVERS: Driver[] = [
  { label: "Créditos Vigentes", value: "338,360", icon: "credit-card" },
  { label: "Clientes", value: "82,500", icon: "users" },
  { label: "Usuarios", value: "1,691", icon: "monitor" },
  { label: "Pagos / mes", value: "122,450", icon: "arrow-down-circle" },
  { label: "Pico Pagos DIC", value: "132,633", icon: "trending-up" },
  { label: "Desembolsos / mes", value: "8,614", icon: "banknote" },
  { label: "Pico Desembolsos NOV", value: "13,205", icon: "zap" },
];

export const HONDURAS_FASES_BASE: Fase[] = [
  {
    id: "F01",
    nombre: "Gobernanza & Kickoff",
    periodo: "Mes 1",
    barStart: 0, barEnd: 1,
    icon: "rocket", color: "text-accent", bg: "bg-accent/10",
    tareas: [
      "Comité de dirección y gobernanza del proyecto",
      "Definición de estructura PMO",
      "Kick-off con stakeholders clave",
      "Plan de comunicación y gestión del cambio",
    ],
    entregables: ["Acta de constitución", "Plan de proyecto aprobado", "Matriz RACI", "Cronograma detallado"],
    compromisos: ["UC-01", "UC-02", "UC-03", "UC-04"],
    responsables: "PMO + Dirección",
    aceleracion: "Arranque paralelo con Blueprint si UC-01 a UC-04 están listos.",
  },
  {
    id: "F02",
    nombre: "Blueprint & Diseño",
    periodo: "Mes 1–3",
    barStart: 0, barEnd: 3,
    icon: "pencil-ruler", color: "text-primary", bg: "bg-primary/10",
    tareas: [
      "Levantamiento de procesos AS-IS",
      "Diseño de procesos TO-BE",
      "Gap analysis funcional",
      "Diseño de integraciones",
      "BRD — Business Requirements Document",
    ],
    entregables: ["Blueprint funcional", "Documento de gaps", "Diseño de integraciones", "BRD aprobado"],
    compromisos: ["UC-06", "UC-07", "UC-08", "UC-09", "UC-10", "UC-11", "UC-12"],
    responsables: "Consultoría + Negocio",
    aceleracion: "Ejecución paralela del BRD con diseño ágil reduce 2 meses.",
  },
  {
    id: "F03",
    nombre: "Config & Parametrización",
    periodo: "Mes 2–4",
    barStart: 1, barEnd: 4,
    icon: "settings", color: "text-warning", bg: "bg-warning/10",
    tareas: [
      "Configuración de productos crediticios",
      "Parametrización de tasas y comisiones",
      "Configuración de roles y permisos",
      "Setup de ambientes DEV/QA/PROD",
    ],
    entregables: ["Ambiente configurado", "Catálogos parametrizados", "Productos activos en DEV", "Documento de configuración"],
    compromisos: ["UC-05", "UC-13", "UC-14"],
    responsables: "Equipo técnico SYSDE",
    aceleracion: "En SaaS, la infraestructura cloud está preconfigurada — ahorra 3 meses.",
  },
  {
    id: "F04",
    nombre: "Migración ETL",
    periodo: "Mes 3–6",
    barStart: 2, barEnd: 6,
    icon: "refresh-cw", color: "text-success", bg: "bg-success/10",
    tareas: [
      "Mapeo de datos fuente → destino",
      "Desarrollo de scripts ETL",
      "Limpieza y validación de datos",
      "Mock runs de migración",
      "Reconciliación de datos migrados",
    ],
    entregables: ["Mapeo de datos", "Scripts ETL validados", "Reporte de mock run", "Datos reconciliados"],
    compromisos: ["UC-15", "UC-16"],
    responsables: "Datos + TI Unicomer",
    aceleracion: "1 mock run + datos pre-validados por cliente reduce 3 meses.",
  },
  {
    id: "F05",
    nombre: "QA & UAT Testing",
    periodo: "Mes 6–9",
    barStart: 5, barEnd: 9,
    icon: "flask-conical", color: "text-destructive", bg: "bg-destructive/10",
    tareas: [
      "Plan de pruebas integral",
      "Pruebas funcionales por módulo",
      "Pruebas de integración end-to-end",
      "UAT con usuarios de negocio",
      "Pruebas de rendimiento y estrés",
    ],
    entregables: ["Plan de pruebas", "Reporte de defectos", "Sign-off UAT", "Certificación de rendimiento"],
    compromisos: ["UC-17", "UC-18", "UC-19", "UC-20", "UC-21"],
    responsables: "QA + Negocio",
    aceleracion: "UAT comprimido con equipo dedicado full-time reduce 3 meses.",
  },
  {
    id: "F06",
    nombre: "Train-the-Trainer",
    periodo: "Mes 7–9",
    barStart: 6, barEnd: 9,
    icon: "graduation-cap", color: "text-primary", bg: "bg-primary/10",
    tareas: [
      "Desarrollo de material de capacitación",
      "Sesiones Train-the-Trainer",
      "Capacitación a usuarios finales",
      "Evaluación de competencias",
    ],
    entregables: ["Manuales de usuario", "Videos de capacitación", "Certificación de trainers", "Plan de rollout"],
    compromisos: ["UC-22", "UC-23"],
    responsables: "Capacitación + RRHH",
    aceleracion: "Training en paralelo con QA reduce 1 mes.",
  },
  {
    id: "F07",
    nombre: "Go-Live & Estabilización",
    periodo: "Mes 10–13",
    barStart: 9, barEnd: 13,
    icon: "flag", color: "text-accent", bg: "bg-accent/10",
    tareas: [
      "Migración final de datos",
      "Cutover y encendido productivo",
      "Soporte hipercare 24/7",
      "Monitoreo de rendimiento",
      "Estabilización y ajustes",
    ],
    entregables: ["Go-Live certificado", "Reporte de estabilización", "Transferencia a soporte", "Cierre de proyecto"],
    compromisos: ["UC-24", "UC-25", "UC-26"],
    responsables: "Equipo completo",
    aceleracion: "Depende del cumplimiento de todas las fases anteriores.",
  },
];

export const SAAS_OVERRIDES: Record<string, Partial<Fase>> = {
  F03: {
    periodo: "Mes 2–3",
    barStart: 1, barEnd: 3,
    tareas: [
      "Configuración de productos crediticios",
      "Parametrización de tasas y comisiones",
      "Configuración de roles y permisos",
    ],
    compromisos: ["UC-13", "UC-14"],
  },
};

export const ONPREM_OVERRIDES: Record<string, Partial<Fase>> = {};

export const COMPROMISOS: Compromiso[] = [
  { codigo: "UC-01", fase: "F01", riesgo: "ALTO", area: "Dirección", titulo: "Sponsor ejecutivo designado", descripcion: "Nombramiento formal del sponsor ejecutivo con autoridad de decisión.", plazoLimite: "Semana 1", consecuencia: "Bloqueo total del proyecto.", dependeDe: [] },
  { codigo: "UC-02", fase: "F01", riesgo: "ALTO", area: "PMO", titulo: "PMO contraparte asignado", descripcion: "Recurso full-time de Unicomer como contraparte del PM de SYSDE.", plazoLimite: "Semana 1", consecuencia: "Retrasos en decisiones y aprobaciones.", dependeDe: [] },
  { codigo: "UC-03", fase: "F01", riesgo: "MEDIO", area: "TI", titulo: "Accesos VPN y ambientes", descripcion: "Provisión de accesos remotos y credenciales de ambientes.", plazoLimite: "Semana 2", consecuencia: "Equipo sin acceso a infraestructura.", dependeDe: ["UC-01"] },
  { codigo: "UC-04", fase: "F01", riesgo: "MEDIO", area: "Legal", titulo: "NDA y contratos firmados", descripcion: "Acuerdos legales de confidencialidad y contrato de servicios.", plazoLimite: "Semana 2", consecuencia: "Imposibilidad de compartir datos sensibles.", dependeDe: [] },
  { codigo: "UC-05", fase: "F03", riesgo: "ALTO", area: "TI", titulo: "Infraestructura on-premise lista", descripcion: "Servidores, SO, BD y red configurados según specs de SYSDE.", plazoLimite: "Mes 2", consecuencia: "Equipo técnico sin ambiente de trabajo.", dependeDe: ["UC-03"] },
  { codigo: "UC-06", fase: "F02", riesgo: "ALTO", area: "Negocio", titulo: "SMEs asignados por área", descripcion: "Expertos funcionales de cada área dedicados al levantamiento.", plazoLimite: "Mes 1", consecuencia: "Blueprint incompleto o inexacto.", dependeDe: ["UC-01"] },
  { codigo: "UC-07", fase: "F02", riesgo: "ALTO", area: "Negocio", titulo: "Procesos AS-IS documentados", descripcion: "Documentación de procesos actuales por cada área de negocio.", plazoLimite: "Mes 2", consecuencia: "Diseño TO-BE sin base de referencia.", dependeDe: ["UC-06"] },
  { codigo: "UC-08", fase: "F02", riesgo: "MEDIO", area: "Negocio", titulo: "Políticas crediticias documentadas", descripcion: "Reglas de negocio, tasas, comisiones y políticas de aprobación.", plazoLimite: "Mes 2", consecuencia: "Configuración con supuestos incorrectos.", dependeDe: ["UC-06"] },
  { codigo: "UC-09", fase: "F02", riesgo: "MEDIO", area: "TI", titulo: "Catálogo de integraciones", descripcion: "Lista de sistemas a integrar con especificaciones técnicas.", plazoLimite: "Mes 2", consecuencia: "Gaps de integración en producción.", dependeDe: ["UC-03"] },
  { codigo: "UC-10", fase: "F02", riesgo: "BAJO", area: "Negocio", titulo: "Formatos de reportes regulatorios", descripcion: "Templates exigidos por la CNBS y reguladores locales.", plazoLimite: "Mes 3", consecuencia: "Reportes no conformes al go-live.", dependeDe: [] },
  { codigo: "UC-11", fase: "F02", riesgo: "MEDIO", area: "Negocio", titulo: "Catálogo de productos financieros", descripcion: "Lista completa de productos con reglas, tasas y condiciones.", plazoLimite: "Mes 2", consecuencia: "Productos mal configurados.", dependeDe: ["UC-08"] },
  { codigo: "UC-12", fase: "F02", riesgo: "BAJO", area: "Negocio", titulo: "Mapa de canales y puntos de venta", descripcion: "Listado de tiendas, POS, canales digitales y corresponsales.", plazoLimite: "Mes 2", consecuencia: "Canales no integrados al go-live.", dependeDe: [] },
  { codigo: "UC-13", fase: "F03", riesgo: "ALTO", area: "TI", titulo: "Base de datos de producción actual", descripcion: "Copia sanitizada de la BD actual para pruebas de migración.", plazoLimite: "Mes 3", consecuencia: "Migración sin datos reales de prueba.", dependeDe: ["UC-05"] },
  { codigo: "UC-14", fase: "F03", riesgo: "MEDIO", area: "TI", titulo: "Diccionario de datos del sistema legacy", descripcion: "Documentación técnica de tablas, campos y relaciones del sistema actual.", plazoLimite: "Mes 3", consecuencia: "Mapeo de datos incorrecto.", dependeDe: ["UC-13"] },
  { codigo: "UC-15", fase: "F04", riesgo: "ALTO", area: "Datos", titulo: "Datos limpios y pre-validados", descripcion: "Datos migrados verificados por el área de negocio.", plazoLimite: "Mes 5", consecuencia: "Múltiples mock runs y retrasos.", dependeDe: ["UC-13", "UC-14"] },
  { codigo: "UC-16", fase: "F04", riesgo: "ALTO", area: "Datos", titulo: "Criterios de reconciliación definidos", descripcion: "Reglas de validación para confirmar integridad de datos migrados.", plazoLimite: "Mes 4", consecuencia: "Datos en producción sin verificar.", dependeDe: ["UC-15"] },
  { codigo: "UC-17", fase: "F05", riesgo: "ALTO", area: "QA", titulo: "Equipo UAT full-time", descripcion: "Usuarios de negocio dedicados full-time a pruebas de aceptación.", plazoLimite: "Mes 6", consecuencia: "UAT extendido, go-live retrasado.", dependeDe: ["UC-06"] },
  { codigo: "UC-18", fase: "F05", riesgo: "MEDIO", area: "QA", titulo: "Casos de prueba aprobados", descripcion: "Escenarios de prueba validados por negocio antes de ejecución.", plazoLimite: "Mes 6", consecuencia: "Cobertura de pruebas insuficiente.", dependeDe: ["UC-17"] },
  { codigo: "UC-19", fase: "F05", riesgo: "MEDIO", area: "QA", titulo: "Ambiente UAT estable", descripcion: "Ambiente de pruebas con datos migrados y configuración final.", plazoLimite: "Mes 6", consecuencia: "Pruebas en ambiente no representativo.", dependeDe: ["UC-05", "UC-15"] },
  { codigo: "UC-20", fase: "F05", riesgo: "ALTO", area: "Negocio", titulo: "Sign-off de UAT", descripcion: "Aprobación formal de pruebas de aceptación por áreas de negocio.", plazoLimite: "Mes 8", consecuencia: "Go-live sin validación de negocio.", dependeDe: ["UC-17", "UC-18", "UC-19"] },
  { codigo: "UC-21", fase: "F05", riesgo: "MEDIO", area: "TI", titulo: "Pruebas de rendimiento aprobadas", descripcion: "Certificación de que el sistema soporta volumetría de producción.", plazoLimite: "Mes 8", consecuencia: "Riesgo de degradación en producción.", dependeDe: ["UC-19"] },
  { codigo: "UC-22", fase: "F06", riesgo: "MEDIO", area: "RRHH", titulo: "Trainers designados", descripcion: "Usuarios power-user seleccionados para capacitar a sus áreas.", plazoLimite: "Mes 7", consecuencia: "Capacitación masiva sin facilitadores.", dependeDe: ["UC-06"] },
  { codigo: "UC-23", fase: "F06", riesgo: "BAJO", area: "RRHH", titulo: "Calendario de capacitación", descripcion: "Agenda de sesiones por área, turno y ubicación geográfica.", plazoLimite: "Mes 7", consecuencia: "Personal no capacitado al go-live.", dependeDe: ["UC-22"] },
  { codigo: "UC-24", fase: "F07", riesgo: "ALTO", area: "Dirección", titulo: "Autorización de go-live", descripcion: "Aprobación formal del comité directivo para encender producción.", plazoLimite: "Mes 9", consecuencia: "Proyecto sin cierre formal.", dependeDe: ["UC-20", "UC-21"] },
  { codigo: "UC-25", fase: "F07", riesgo: "ALTO", area: "TI", titulo: "Plan de rollback aprobado", descripcion: "Plan de contingencia para revertir al sistema anterior si es necesario.", plazoLimite: "Mes 9", consecuencia: "Go-live sin red de seguridad.", dependeDe: ["UC-24"] },
  { codigo: "UC-26", fase: "F07", riesgo: "MEDIO", area: "Operaciones", titulo: "Equipo hipercare en sitio", descripcion: "Equipo SYSDE + Unicomer en sitio 24/7 las primeras 2 semanas.", plazoLimite: "Mes 10", consecuencia: "Incidentes sin soporte inmediato.", dependeDe: ["UC-24"] },
];

export const PHASE_SAVINGS: PhaseSaving[] = [
  {
    grupo: "Blueprint paralelo + BRD ágil",
    mesesSaas: 2, mesesOnprem: 2,
    codigos: { saas: ["UC-06", "UC-07", "UC-08", "UC-09", "UC-10", "UC-11", "UC-12"], onprem: ["UC-06", "UC-07", "UC-08", "UC-09", "UC-10", "UC-11", "UC-12"] },
  },
  {
    grupo: "Cloud / Config paralela",
    mesesSaas: 3, mesesOnprem: 1,
    codigos: { saas: ["UC-13", "UC-14"], onprem: ["UC-05", "UC-13", "UC-14"] },
  },
  {
    grupo: "1 Mock Run + datos pre-validados",
    mesesSaas: 3, mesesOnprem: 3,
    codigos: { saas: ["UC-15", "UC-16"], onprem: ["UC-15", "UC-16"] },
  },
  {
    grupo: "UAT comprimido",
    mesesSaas: 3, mesesOnprem: 3,
    codigos: { saas: ["UC-17", "UC-18", "UC-19", "UC-20", "UC-21"], onprem: ["UC-17", "UC-18", "UC-19", "UC-20", "UC-21"] },
  },
  {
    grupo: "Training en paralelo",
    mesesSaas: 1, mesesOnprem: 1,
    codigos: { saas: ["UC-22", "UC-23"], onprem: ["UC-22", "UC-23"] },
  },
];

export const LIC_FEATURES = [
  { title: "Usuarios Ilimitados", desc: "Sin costo por usuario adicional", icon: "users" },
  { title: "Multi-empresa", desc: "Hasta 10 razones sociales", icon: "building-2" },
  { title: "Soporte 24/7", desc: "Mesa de ayuda con SLA garantizado", icon: "life-buoy" },
  { title: "Actualizaciones", desc: "Updates incluidos sin costo extra", icon: "refresh-cw" },
  { title: "Disaster Recovery", desc: "RPO < 1h, RTO < 4h", icon: "shield" },
  { title: "SLA 99.95%", desc: "Disponibilidad garantizada", icon: "bar-chart-3" },
  { title: "API Abierta", desc: "Integraciones sin restricciones", icon: "plug" },
];

export function buildFases(mode: "saas" | "onpremise"): Fase[] {
  const overrides = mode === "saas" ? SAAS_OVERRIDES : ONPREM_OVERRIDES;
  return HONDURAS_FASES_BASE.map((f) => ({ ...f, ...overrides[f.id] }));
}

export function getDeployConfig(mode: "saas" | "onpremise") {
  return {
    targetMonths: mode === "saas" ? 12 : 14,
    label: mode === "saas" ? "SaaS / Cloud" : "On-Premise",
    maxSaving: mode === "saas" ? 12 : 10,
  };
}
