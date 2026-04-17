// Datos bilingües del Anexo 2 - SYSDE Response (v2026-01-23)
// Versión ES y EN. La UI elige según el idioma activo.
import type { Lang } from "@/i18n/LanguageContext";

type Bi = { es: string; en: string };

// ===== Instructions =====
export const instructionsDataI18n: Record<Lang, {
  title: string;
  rules: { category: string; rule: string }[];
}> = {
  es: {
    title: "INSTRUCCIONES",
    rules: [
      { category: "1. Moneda", rule: "Todos los precios deben cotizarse en Dólares de Estados Unidos (USD)." },
      { category: "2. Impuestos", rule: "Los precios deben ser EXCLUSIVOS de IVA." },
      { category: "3. Retención de Impuestos", rule: "Si se factura desde el exterior (Escenario B), los precios deben ser NETOS de retención. Unicomer deducirá la retención." },
      { category: "4. Vigencia", rule: "La propuesta debe ser válida por al menos 120 días desde la presentación." },
      { category: "5. Disparador de facturación", rule: "Las cuotas recurrentes (Licenciamiento) para un país inician SOLO al \"Go-Live\" formal de ese país específico." },
      { category: "6. Gastos de viaje", rule: "Los gastos de viaje están limitados a las tarifas de viático de Unicomer ($40/$50/$65)." },
      { category: "7. Implementación", rule: "Los costos de implementación deben reflejar la estrategia de \"Transferencia de Conocimiento\" (100% Proveedor → 50% → Solo Soporte)." },
      { category: "8. Volumetrías", rule: "Los proveedores DEBEN usar los volúmenes provistos en la pestaña \"2. Escenarios de Línea Base\" para sus cálculos y asegurar comparabilidad." },
      { category: "9. Consistencia general", rule: "Cualquier término económico, condición o ítem de alcance no mencionado explícitamente en este Anexo debe permanecer estrictamente congruente con los requisitos, alcance y condiciones legales del Documento RFP principal. En caso de discrepancia o silencio, prevalecen las obligaciones del documento RFP." },
    ],
  },
  en: {
    title: "INSTRUCTIONS",
    rules: [
      { category: "1. Currency", rule: "All prices must be quoted in United States Dollars (USD)." },
      { category: "2. Taxes", rule: "Prices must be EXCLUSIVE of VAT (IVA)." },
      { category: "3. Withholding Tax", rule: "If billing from abroad (Scenario B), prices must be NET of Withholding Tax. Unicomer will deduct WHT." },
      { category: "4. Validity", rule: "Proposal must be valid for at least 120 days from submission." },
      { category: "5. Billing Trigger", rule: "Recurring Fees (Licensing) for a country start ONLY upon the formal \"Go-Live\" of that specific country." },
      { category: "6. Travel Expenses", rule: "Travel expenses are capped at Unicomer Per Diem rates ($40/$50/$65)." },
      { category: "7. Implementation", rule: "Implementation costs must reflect the \"Knowledge Transfer\" strategy (100% Vendor → 50% → Support Only)." },
      { category: "8. Volumetrics", rule: "Vendors MUST use the volumes provided in Tab \"2. Baseline Scenarios\" for their calculations to ensure comparability." },
      { category: "9. General consistency", rule: "Any economic term, condition, or scope item not explicitly mentioned in this Annex must remain strictly congruent with the requirements, scope, and legal conditions set forth in the main RFP Document. In case of discrepancy or silence in this Excel, the obligations defined in the RFP document prevail." },
    ],
  },
};

// ===== Baseline =====
const monthMap: Record<string, Bi> = {
  ENE: { es: "ENE", en: "JAN" }, FEB: { es: "FEB", en: "FEB" }, MAR: { es: "MAR", en: "MAR" },
  ABR: { es: "ABR", en: "APR" }, MAY: { es: "MAY", en: "MAY" }, JUN: { es: "JUN", en: "JUN" },
  JUL: { es: "JUL", en: "JUL" }, AGO: { es: "AGO", en: "AUG" }, SEP: { es: "SEP", en: "SEP" },
  OCT: { es: "OCT", en: "OCT" }, NOV: { es: "NOV", en: "NOV" }, DIC: { es: "DIC", en: "DEC" },
};

const fmtMonth = (label: string, lang: Lang) => {
  const [m, n] = label.split(":").map((s) => s.trim());
  const tr = monthMap[m];
  return tr ? `${tr[lang]}: ${n}` : label;
};

export const baselineDataI18n = (lang: Lang) => ({
  title: lang === "es" ? "ESCENARIOS DE LÍNEA BASE" : "BASELINE SCENARIOS",
  subtitle: lang === "es" ? "ESTANDARIZACIÓN PARA EVALUACIÓN" : "STANDARDIZATION FOR EVALUATION",
  note: lang === "es"
    ? "Los volúmenes listados a continuación son estimaciones provistas con fines de referencia y no constituyen un compromiso de compra. Los volúmenes reales pueden variar al alza o a la baja durante la ejecución. Por favor utilice estas cifras específicas para poblar los modelos de pricing en la pestaña 3, asegurando que todas las propuestas estén alineadas a los mismos supuestos."
    : "The volumes listed below are estimates provided for reference purposes and do not constitute a commitment to purchase. Actual volumes may vary upwards or downwards during execution. Please use these specific figures to populate the pricing models in Tab 3, ensuring all proposals are aligned to the same assumptions.",
  headers: lang === "es"
    ? ["Ítem", "País", "Créditos vigentes", "Clientes estimados", "Media de usuarios", "Media de Pagos/mes", "Pico de Pagos/mes", "Media de Desembolsos/mes", "Pico de Desembolsos/mes"]
    : ["Item", "Country", "Active Loans", "Estimated Customers", "Avg. Users", "Avg. Payments/month", "Peak Payments/month", "Avg. Disbursements/month", "Peak Disbursements/month"],
  rows: [
    [1, "El Salvador", 419494, 128300, 641, 180603, fmtMonth("MAR: 192,926", lang), 15920, fmtMonth("NOV: 24,251", lang)],
    [2, "Honduras", 338360, 82500, 1691, 122450, fmtMonth("DIC: 132,633", lang), 8614, fmtMonth("NOV: 13,205", lang)],
    [3, "Guatemala", 91536, 70700, 152, 74806, fmtMonth("MAR: 80,032", lang), 7042, fmtMonth("DIC: 8,812", lang)],
    [4, "Nicaragua", 79360, 55700, 518, 64730, fmtMonth("JUL: 68,320", lang), 7129, fmtMonth("NOV: 9,696", lang)],
    [5, "Ecuador", 144688, 115500, 300, 138673, fmtMonth("MAR: 144,710", lang), 9726, fmtMonth("DIC: 13,361", lang)],
    [6, "Jamaica", 186000, 94100, 433, 124772, fmtMonth("MAR: 142,885", lang), 6589, fmtMonth("NOV: 9,308", lang)],
    [7, lang === "es" ? "Trinidad y Tobago" : "Trinidad & Tobago", 117295, 71600, 23, 130426, fmtMonth("NOV: 228,185", lang), 6013, fmtMonth("DIC: 11,333", lang)],
    [8, "Guyana", 65176, 41200, 14, 73503, fmtMonth("NOV: 91,183", lang), 2746, fmtMonth("DIC: 4,868", lang)],
    [9, "Costa Rica", 708591, 393500, 400, 1056419, fmtMonth("DIC: 1,176,698", lang), 60156, fmtMonth("DIC: 70,042", lang)],
  ] as (string | number)[][],
  totals: { creditos: 2150500, clientes: 1053100, usuarios: 4172 },
});

// ===== OPEX instructions =====
export const opexInstructionsI18n: Record<Lang, { title: string; lines: string[] }[]> = {
  es: [
    { title: "1. MODELO DE DESPLIEGUE:", lines: [
      "Para cada país, seleccione el modelo propuesto:",
      "SaaS (Cloud): Software como Servicio, típicamente incluye hosting y mantenimiento.",
      "On-Premise (Suscripción): Licencia por término instalada en infraestructura de Unicomer.",
      "On-Premise (Perpetua): Compra única (CAPEX) con cuotas recurrentes de soporte.",
    ]},
    { title: "2. MÉTRICA DE PRECIO:", lines: [
      "Por crédito/cuenta activa: basado en volumen de cartera.",
      "Por cliente único: basado en CIFs distintos.",
      "Por usuario interno: basado en accesos del personal.",
      "Tarifa plana: precio mensual fijo independiente del volumen.",
    ]},
    { title: "3. DESGLOSE DE COSTO (CRÍTICO):", lines: [
      "Debe separar la cuota base de licencia y la cuota de soporte/mantenimiento para asegurar transparencia.",
      "SaaS: Si es \"Todo Incluido\", ingrese el monto total en \"Licencia Base\" y $0 en Soporte, salvo que su modelo comercial los separe explícitamente.",
      "On-Premise (Suscripción): Ingrese cuota de software y soporte por separado.",
      "On-Premise (Perpetua): Ingrese $0 en Licencia Base (pago anticipado) y estrictamente la cuota mensual de mantenimiento.",
    ]},
    { title: "4. VOLÚMENES", lines: [
      "En la columna \"Volumen Relevante\" debe usar la cifra correspondiente de la pestaña 2 (Escenarios de Línea Base).",
      "Ejemplo: Si seleccionó \"Por Usuario Interno\" para Honduras, use la columna Usuarios Internos para Honduras (1,691).",
    ]},
  ],
  en: [
    { title: "1. DEPLOYMENT MODEL:", lines: [
      "For each country, select the proposed model:",
      "SaaS (Cloud): Software as a Service, typically including hosting and maintenance.",
      "On-Premise (Subscription): Term-based license installed on Unicomer infrastructure.",
      "On-Premise (Perpetual): One-time license purchase (CAPEX) with recurring support fees.",
    ]},
    { title: "2. PRICING METRIC:", lines: [
      "Per Active Loan/Account: Based on portfolio volume.",
      "Per Unique Customer: Based on distinct CIFs.",
      "Per Internal User: Based on staff access.",
      "Flat Fee: Fixed monthly price regardless of volume.",
    ]},
    { title: "3. COST BREAKDOWN (CRITICAL):", lines: [
      "You must separate the Base License Fee from the Support/Maintenance Fee to ensure transparency.",
      "SaaS: If \"All-Inclusive\", input the full amount in \"Base License\" and $0 in Support, unless explicitly separated in your commercial model.",
      "On-Premise (Subscription): Input the Software fee and Support fee separately.",
      "On-Premise (Perpetual): Input $0 in Base License (paid upfront) and strictly the Monthly Maintenance Fee.",
    ]},
    { title: "4. VOLUMES", lines: [
      "In the \"Relevant Volume\" column, you must use the corresponding figure from Tab 2 (Baseline Scenarios).",
      "Example: If you selected \"Per Internal User\" for Honduras, use the Internal Users column for Honduras (1,691).",
    ]},
  ],
};

// ===== On-Premise =====
const phaseMap: Record<string, Bi> = {
  "1. Pilot": { es: "1. Piloto", en: "1. Pilot" },
  "2. Rollout": { es: "2. Despliegue", en: "2. Rollout" },
  "3. Expansion": { es: "3. Expansión", en: "3. Expansion" },
  "4. Scale": { es: "4. Escalado", en: "4. Scale" },
  "5. Consol.": { es: "5. Consol.", en: "5. Consol." },
  "6. Full Scale": { es: "6. Escala Total", en: "6. Full Scale" },
};
const tr = (k: string, lang: Lang) => phaseMap[k]?.[lang] ?? k;

export const onPremiseHeadersI18n = (lang: Lang) =>
  lang === "es"
    ? ["Fase", "País", "Go-Live Est.", "Modelo de Despliegue", "Métrica Usada", "Volumen Relevante", "Precio Unitario Lic. Base (USD/mes)", "Precio Unit. Soporte (USD/mes)", "Costo Anual Total"]
    : ["Phase", "Country", "Est. Go-Live", "Deployment Model", "Metric Used", "Relevant Volume", "Base License Unit Price (Monthly USD)", "Support/Maint. Unit Price (Monthly USD)", "Total Annual Cost"];

const onPremRaw: (string | number)[][] = [
  ["1. Pilot", "Honduras", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 338360, 0, 0.03, 121809.6],
  ["2. Rollout", "Nicaragua", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 79360, 0, 0.03, 28569.6],
  ["3. Expansion", "Guyana", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 65176, 0, 0.03, 23463.36],
  ["3. Expansion", "Ecuador", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 144688, 0, 0.03, 52087.68],
  ["4. Scale", "Trinidad & Tobago", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 117295, 0, 0.03, 42226.2],
  ["4. Scale", "Jamaica", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 186000, 0, 0.03, 66960],
  ["4. Scale", "Guatemala", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 91536, 0, 0.03, 32952.96],
  ["5. Consol.", "El Salvador", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 419494, 0, 0.03, 151017.84],
  ["6. Full Scale", "Costa Rica", "Infra: Unicomer", "On-Premise (Subscription)", "Per Active Loan", 708591, 0, 0.03, 255092.76],
];

export const onPremiseRowsI18n = (lang: Lang): (string | number)[][] => onPremRaw.map(([phase, country, infra, model, metric, vol, lic, sup, total]) => [
  tr(phase as string, lang),
  country,
  infra,
  lang === "es" ? (model as string).replace("On-Premise (Subscription)", "On-Premise (Suscripción)") : model,
  lang === "es" ? "Por Crédito Activo" : metric,
  vol, lic, sup, total,
]);

export const onPremiseTotals = { volume: 2150500, totalAnnual: 774180 };

// ===== SaaS =====
export const saasHeadersI18n = (lang: Lang) =>
  lang === "es"
    ? ["Fase", "País", "Modelo de Despliegue", "Métrica Usada", "Volumen Relevante", "Precio Unit. Lic. Base (USD/mes)", "Precio Unit. Soporte (USD/mes)", "Costo Mensual Total", "Costo Anual Total"]
    : ["Phase", "Country", "Deployment Model", "Metric Used", "Relevant Volume", "Base License Unit Price (Monthly USD)", "Support/Maint. Unit Price (Monthly USD)", "Total Monthly Cost", "Total Annual Cost"];

const saasRaw: (string | number)[][] = [
  ["1. Pilot", "Honduras", "SaaS (Cloud)", "Per Active Loan", 338360, 0, 0.04, 13534.4, 162412.8],
  ["2. Rollout", "Nicaragua", "SaaS (Cloud)", "Per Active Loan", 79360, 0, 0.10, 7936, 95232],
  ["3. Expansion", "Guyana", "SaaS (Cloud)", "Per Active Loan", 65176, 0, 0.10, 6517.6, 78211.2],
  ["3. Expansion", "Ecuador", "SaaS (Cloud)", "Per Active Loan", 144688, 0, 0.07, 10128.16, 121537.92],
  ["4. Scale", "Trinidad & Tobago", "SaaS (Cloud)", "Per Active Loan", 117295, 0, 0.07, 8210.65, 98527.8],
  ["4. Scale", "Jamaica", "SaaS (Cloud)", "Per Active Loan", 186000, 0, 0.07, 13020, 156240],
  ["4. Scale", "Guatemala", "SaaS (Cloud)", "Per Active Loan", 91536, 0, 0.10, 9153.6, 109843.2],
  ["5. Consol.", "El Salvador", "SaaS (Cloud)", "Per Active Loan", 419494, 0, 0.04, 16779.76, 201357.12],
  ["6. Full Scale", "Costa Rica", "SaaS (Cloud)", "Per Active Loan", 708591, 0, 0.03, 21257.73, 255092.76],
];

export const saasRowsI18n = (lang: Lang): (string | number)[][] => saasRaw.map(([phase, country, model, metric, vol, lic, sup, m, a]) => [
  tr(phase as string, lang),
  country,
  model,
  lang === "es" ? "Por Crédito Activo" : metric,
  vol, lic, sup, m, a,
]);

export const saasTotals = { volume: 2150500, monthly: 106537.9, annual: 1278454.8 };

// ===== Costing tiers =====
export const costingTiersI18n = (lang: Lang) => ({
  title: lang === "es" ? "Modelo de Costeo por Crédito" : "Costing Model per Loan (Credit)",
  headers: lang === "es" ? ["Desde", "Hasta", "Costo Mensual por Crédito", "Mínimo"] : ["From", "To", "Monthly Cost per Loan", "Minimum"],
  rows: [
    [1, 100000, 0.10, 2500],
    [100001, 200000, 0.07, 7000],
    [200001, 450000, 0.04, 8000],
    [500000, "—", 0.03, 15000],
  ] as (string | number)[][],
});

// ===== License blocks =====
export const licenseBlocksI18n: Record<Lang, { title: string; lines: string[] }[]> = {
  es: [
    {
      title: "Licencia Anual Credit Core System (USD 350,000.00)",
      lines: [
        "Compañías: Ilimitadas | Usuarios: Ilimitados | Créditos: Ilimitados | Clientes: Ilimitados",
        "Territorio: BIG 9 + todas las geografías donde Unicomer opere.",
        "Pagadero anualmente (firma del contrato / 1 de enero).",
      ],
    },
    {
      title: "Licencia Anual de Tarjetas de Crédito (USD 250,000.00)",
      lines: [
        "Compañías: Ilimitadas | Usuarios: Ilimitados | Tarjetas: Ilimitadas | Clientes: Ilimitados",
        "Territorio: BIG 9 + todas las geografías donde Unicomer opere.",
        "Pagadero anualmente (firma del contrato / 1 de enero).",
      ],
    },
    {
      title: "Licencia Anual de Factoring (USD 100,000.00)",
      lines: [
        "Compañías: Ilimitadas | Usuarios: Ilimitados | Créditos: Ilimitados | Clientes: Ilimitados",
        "Territorio: BIG 9 + todas las geografías donde Unicomer opere.",
        "Pagadero anualmente (firma del contrato / 1 de enero).",
      ],
    },
  ],
  en: [
    {
      title: "Annual License Credit Core System (USD 350,000.00)",
      lines: [
        "Companies: Unlimited | Users: Unlimited | Loans: Unlimited | Customers: Unlimited",
        "Territory: BIG 9 + all geographies where Unicomer operates.",
        "Payable annually (contract signature / January 1).",
      ],
    },
    {
      title: "Annual Credit Card License (USD 250,000.00)",
      lines: [
        "Companies: Unlimited | Users: Unlimited | Credit Cards: Unlimited | Customers: Unlimited",
        "Territory: BIG 9 + all geographies where Unicomer operates.",
        "Payable annually (contract signature / January 1).",
      ],
    },
    {
      title: "Annual Factoring License (USD 100,000.00)",
      lines: [
        "Companies: Unlimited | Users: Unlimited | Loans: Unlimited | Customers: Unlimited",
        "Territory: BIG 9 + all geographies where Unicomer operates.",
        "Payable annually (contract signature / January 1).",
      ],
    },
  ],
};

// ===== Implementation =====
export const implementationInstructionsI18n: Record<Lang, { title: string; lines: string[] }[]> = {
  es: [
    { title: "1. ALINEACIÓN ESTRATÉGICA (FADE-OUT):", lines: [
      "Unicomer requiere un enfoque \"Train-the-Trainer\".",
      "Fase 1: El proveedor lidera el 100%. Cuota completa esperada.",
      "Fase 2: Responsabilidad compartida (50/50). Las cuotas deben reflejar esfuerzo reducido.",
      "Fase 3 en adelante: Unicomer lidera. El proveedor solo brinda soporte SME bajo demanda. El precio debe bajar significativamente para reflejar este rol \"Solo Soporte\".",
    ]},
    { title: "2. SERVICIOS PROFESIONALES:", lines: [
      "Ingrese la cuota fija (o tope estimado de Tiempo y Materiales) para los servicios descritos en \"Estrategia Requerida\". Incluye Gestión de Proyecto, Configuración, Desarrollo y Capacitación.",
    ]},
    { title: "3. GASTOS DE VIAJE (T&E):", lines: [
      "Ingrese los costos estimados de viaje y estadía basados en los límites de viático del RFP ($40/$50/$65).",
      "Nota: Si la estrategia es \"Soporte Remoto\", debe ser $0.",
    ]},
  ],
  en: [
    { title: "1. STRATEGY ALIGNMENT (FADE-OUT):", lines: [
      "Unicomer requires a \"Train-the-Trainer\" approach.",
      "Phase 1: Vendor leads 100%. Full fee expected.",
      "Phase 2: Shared responsibility (50/50). Fees should reflect reduced effort.",
      "Phase 3 onwards: Unicomer leads. Vendor provides only Subject Matter Expert (SME) Support on demand. Pricing must drop significantly to reflect this \"Support Only\" role.",
    ]},
    { title: "2. PROFESSIONAL SERVICES:", lines: [
      "Input the Fixed Fee (or estimated Time & Materials cap) for the services described in the \"Required Strategy\" column. This includes Project Management, Configuration, Development, and Training.",
    ]},
    { title: "3. TRAVEL EXPENSES (T&E):", lines: [
      "Input the estimated Travel & Living costs based on the Per Diem Limits defined in the RFP ($40/$50/$65).",
      "Note: If the strategy is \"Remote Support\", this should be $0.",
    ]},
  ],
};

export const implementationHeadersI18n = (lang: Lang) =>
  lang === "es"
    ? ["Fase", "País", "Go-Live Est.", "Cuota Servicios Profesionales (USD)", "Gastos de Viaje Est. (USD)", "Costo Total Único"]
    : ["Phase", "Country", "Est. Go-Live", "Professional Services Fee (USD)", "Est. Travel Expenses (USD)", "Total One-Time Cost"];

const implRaw: (string | number)[][] = [
  ["1. Pilot", "Honduras", "Year 1", 1205000, 15000, 1220000],
  ["2. Rollout", "Nicaragua", "Year 3", 101415.63, 0, 101415.63],
  ["3. Expansion", "Guyana", "Year 3.5", 0, 0, 0],
  ["3. Expansion", "Ecuador", "Year 3.5", 0, 0, 0],
  ["4. Scale", "Trinidad", "Year 4", 0, 0, 0],
  ["4. Scale", "Jamaica", "Year 4", 0, 0, 0],
  ["4. Scale", "Guatemala", "Year 4", 0, 0, 0],
  ["5. Consol.", "El Salvador", "Year 4.5", 0, 0, 0],
  ["6. Full Scale", "Costa Rica", "Year 5", 0, 0, 0],
];

export const implementationRowsI18n = (lang: Lang): (string | number)[][] => implRaw.map(([phase, country, year, prof, trav, total]) => [
  tr(phase as string, lang),
  country,
  lang === "es" ? (year as string).replace("Year ", "Año ") : year,
  prof, trav, total,
]);

export const implementationTotals = { professional: 1306415.63, travel: 15000, total: 1321415.63 };

export const implementationFooterI18n = (lang: Lang) =>
  lang === "es"
    ? "Nota: El costo es cero para servicios profesionales bajo soporte activo."
    : "Note: The cost is zero for professional services under active support.";

// ===== Other costs =====
export const otherCostsI18n: Record<Lang, string[]> = {
  es: [
    "NOTA: No se requieren costos adicionales de terceros.",
    "SAF+ incluye el stack tecnológico completo.",
    "Base de datos y middleware están incluidos en la cuota de licenciamiento.",
  ],
  en: [
    "NOTE: No additional third-party costs are required.",
    "SAF+ includes the complete technology stack.",
    "Database and middleware are included in the licensing fee.",
  ],
};
