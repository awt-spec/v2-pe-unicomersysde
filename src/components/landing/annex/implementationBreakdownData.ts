// Desglose detallado de implementación + cláusulas comerciales SYSDE
import type { Lang } from "@/i18n/LanguageContext";

export type BreakdownItem = {
  title: string;
  bullets: string[];
  amount: number;
};

export type BreakdownBlock = {
  header: string;
  items: BreakdownItem[];
  subtotal: { label: string; amount: number };
};

export const implementationBreakdownI18n: Record<Lang, {
  intro: string;
  blocks: BreakdownBlock[];
  grandTotal: { label: string; amount: number };
}> = {
  es: {
    intro: "Desglose del costo único de implementación inicial (Software Base + Primer País). El resto de países hereda la base sin costo de re-implementación.",
    blocks: [
      {
        header: "A. SOFTWARE BASE (NÚCLEO INDEPENDIENTE DE PAÍSES)",
        items: [
          {
            title: "Implementación SAF+ BIG 9",
            bullets: [
              "Core bancario multi-tenant",
              "Módulos: SAF+ Crédito",
              "Empresas: ilimitadas",
              "Usuarios: ilimitados",
              "Créditos: ilimitados",
              "Clientes: ilimitado",
              "Transacciones ilimitadas",
              "Instancias: 2",
              "9 países incluidos",
            ],
            amount: 400000,
          },
          {
            title: "PMO Corporativo (18 meses)",
            bullets: [
              "Gerente de proyecto senior",
              "Coordinación multi-país",
              "Gestión cambios y riesgos",
              "Informes ejecutivos de la implementación",
            ],
            amount: 90000,
          },
          {
            title: "Capacitación Corporativa Base",
            bullets: [
              "Train-the-trainer regional",
              "Materiales multi-idioma",
              "Certificación instructores",
            ],
            amount: 50000,
          },
          {
            title: "Integraciones Corporativas (3 críticas)",
            bullets: [
              "Data warehouse / BI",
              "Active Directory / SSO",
              "Oracle Xstore",
              "Cobranza Regional",
            ],
            amount: 90000,
          },
        ],
        subtotal: { label: "SUBTOTAL SOFTWARE BASE (INDEPENDIENTE PAÍSES)", amount: 810000 },
      },
      {
        header: "B. PRIMER PAÍS (GUATEMALA · MAYOR COMPLEJIDAD)",
        items: [
          {
            title: "Implementación Guatemala",
            bullets: [
              "Análisis y levantamiento local",
              "Configuración regulatoria específica",
              "Parametrización productos financieros",
              "Workflows y aprobaciones locales",
              "Testing y UAT (4 semanas)",
            ],
            amount: 230000,
          },
          {
            title: "Integraciones Locales Guatemala",
            bullets: [
              "3 integraciones específicas × $28,000",
              "BANTRAB / SIB (transferencias y reportería bancaria)",
              "SAT (Superintendencia de Administración Tributaria)",
              "Burós crédito GT (TransUnion + Crediref)",
            ],
            amount: 84000,
          },
          {
            title: "Capacitación Local Guatemala",
            bullets: [
              "Train-the-trainer local",
              "8 sesiones",
              "3 días × 2 instructores",
              "Materiales customizados",
            ],
            amount: 30000,
          },
          {
            title: "Consultoría Regulatoria Guatemala",
            bullets: [
              "Cumplimiento SIB (Superintendencia de Bancos)",
              "Ley contra el Lavado de Dinero (Ley 67-2001)",
              "Ley de Protección de Datos Personales",
              "Reportería regulatoria SIB",
            ],
            amount: 25000,
          },
        ],
        subtotal: { label: "SUBTOTAL PRIMER PAÍS", amount: 395000 },
      },
    ],
    grandTotal: { label: "TOTAL BASE + PRIMER PAÍS", amount: 1205000 },
  },
  en: {
    intro: "Breakdown of the one-time initial implementation cost (Base Software + First Country). All remaining countries inherit the base at no re-implementation cost.",
    blocks: [
      {
        header: "A. BASE SOFTWARE (COUNTRY-INDEPENDENT CORE)",
        items: [
          {
            title: "SAF+ BIG 9 Implementation",
            bullets: [
              "Multi-tenant banking core",
              "Modules: SAF+ Credit",
              "Companies: unlimited",
              "Users: unlimited",
              "Loans: unlimited",
              "Customers: unlimited",
              "Unlimited transactions",
              "Instances: 2",
              "9 countries included",
            ],
            amount: 400000,
          },
          {
            title: "Corporate PMO (18 months)",
            bullets: [
              "Senior project manager",
              "Multi-country coordination",
              "Change & risk management",
              "Executive implementation reporting",
            ],
            amount: 90000,
          },
          {
            title: "Corporate Base Training",
            bullets: [
              "Regional train-the-trainer",
              "Multi-language materials",
              "Instructor certification",
            ],
            amount: 50000,
          },
          {
            title: "Corporate Integrations (3 critical)",
            bullets: [
              "Data warehouse / BI",
              "Active Directory / SSO",
              "Oracle Xstore",
              "Regional Collections",
            ],
            amount: 90000,
          },
        ],
        subtotal: { label: "SUBTOTAL BASE SOFTWARE (COUNTRY-INDEPENDENT)", amount: 810000 },
      },
      {
        header: "B. FIRST COUNTRY (GUATEMALA · HIGHEST COMPLEXITY)",
        items: [
          {
            title: "Guatemala Implementation",
            bullets: [
              "Local analysis & requirements",
              "Country-specific regulatory configuration",
              "Financial product parametrization",
              "Local workflows & approvals",
              "Testing & UAT (4 weeks)",
            ],
            amount: 230000,
          },
          {
            title: "Guatemala Local Integrations",
            bullets: [
              "3 specific integrations × $28,000",
              "BANTRAB / SIB (banking transfers & reporting)",
              "SAT (Tax Administration Superintendence)",
              "GT Credit Bureaus (TransUnion + Crediref)",
            ],
            amount: 84000,
          },
          {
            title: "Guatemala Local Training",
            bullets: [
              "Local train-the-trainer",
              "8 sessions",
              "3 days × 2 instructors",
              "Customized materials",
            ],
            amount: 30000,
          },
          {
            title: "Guatemala Regulatory Consulting",
            bullets: [
              "SIB compliance (Banking Superintendence)",
              "Anti-Money Laundering Law (Law 67-2001)",
              "Personal Data Protection Law",
              "SIB regulatory reporting",
            ],
            amount: 25000,
          },
        ],
        subtotal: { label: "FIRST COUNTRY SUBTOTAL", amount: 395000 },
      },
    ],
    grandTotal: { label: "TOTAL BASE + FIRST COUNTRY", amount: 1205000 },
  },
};

// ===== Definición formal de Crédito Activo =====
export const creditDefinitionI18n: Record<Lang, {
  title: string;
  intro: string;
  isActive: { title: string; items: string[] };
  isNotActive: { title: string; items: string[] };
  lifecycle: { title: string; states: { code: string; name: string; desc: string; billable: boolean }[] };
}> = {
  es: {
    title: "Definición formal de Precio Unitario por Crédito Activo",
    intro: "El precio unitario del modelo de licenciamiento se aplica exclusivamente sobre créditos en estado activo. Esta definición es contractual y vinculante para evitar ambigüedad en la facturación.",
    isActive: {
      title: "✅ Qué SÍ es un crédito activo",
      items: [
        "Crédito desembolsado al cliente con saldo de capital pendiente > 0.",
        "Crédito en estado vigente, en mora temprana (1–30 días) o en mora intermedia (31–90 días).",
        "Crédito reestructurado o refinanciado mientras mantenga saldo de capital pendiente.",
        "Crédito en proceso de cobro administrativo con plan de pago activo.",
      ],
    },
    isNotActive: {
      title: "❌ Qué NO es un crédito activo (no facturable)",
      items: [
        "Crédito cancelado o pagado totalmente (saldo de capital = 0).",
        "Crédito castigado / write-off contable.",
        "Crédito cedido o vendido a un tercero.",
        "Solicitud de crédito en evaluación, aprobada pero no desembolsada, o rechazada.",
        "Crédito en cobro judicial cuando el cliente ya no figura en cartera activa.",
        "Históricos archivados con propósito únicamente de auditoría.",
      ],
    },
    lifecycle: {
      title: "Ciclo de vida del crédito",
      states: [
        { code: "01", name: "Solicitud", desc: "Originación: análisis, scoring y aprobación.", billable: false },
        { code: "02", name: "Aprobado / pendiente desembolso", desc: "Cliente notificado, esperando firma o desembolso.", billable: false },
        { code: "03", name: "Vigente", desc: "Crédito desembolsado, al día en pagos.", billable: true },
        { code: "04", name: "Mora temprana (1–30 días)", desc: "Atraso menor, gestión de cobro suave.", billable: true },
        { code: "05", name: "Mora intermedia (31–90 días)", desc: "Gestión administrativa intensiva.", billable: true },
        { code: "06", name: "Mora dura (91–180 días)", desc: "Reestructuración o pre-judicial.", billable: true },
        { code: "07", name: "Reestructurado / refinanciado", desc: "Nuevo plan de pago vigente.", billable: true },
        { code: "08", name: "Castigo (write-off)", desc: "Salida contable de cartera.", billable: false },
        { code: "09", name: "Cancelado / pagado", desc: "Saldo capital = 0, cierre formal.", billable: false },
        { code: "10", name: "Cedido / vendido", desc: "Transferido a un tercero (cobranza o factoring).", billable: false },
      ],
    },
  },
  en: {
    title: "Formal definition of Unit Price per Active Loan",
    intro: "The unit price in the licensing model applies exclusively to loans in active status. This definition is contractual and binding to eliminate billing ambiguity.",
    isActive: {
      title: "✅ What IS an active loan",
      items: [
        "Loan disbursed to the customer with outstanding principal balance > 0.",
        "Loan current, in early arrears (1–30 days) or mid arrears (31–90 days).",
        "Restructured or refinanced loan while it keeps outstanding principal balance.",
        "Loan in administrative collection with an active payment plan.",
      ],
    },
    isNotActive: {
      title: "❌ What is NOT an active loan (non-billable)",
      items: [
        "Loan cancelled or fully repaid (principal balance = 0).",
        "Written-off / charge-off loan.",
        "Loan transferred or sold to a third party.",
        "Loan application under evaluation, approved but not disbursed, or rejected.",
        "Loan in judicial collection when the customer no longer sits in the active portfolio.",
        "Historical records archived for audit purposes only.",
      ],
    },
    lifecycle: {
      title: "Loan lifecycle",
      states: [
        { code: "01", name: "Application", desc: "Origination: analysis, scoring and approval.", billable: false },
        { code: "02", name: "Approved / pending disbursement", desc: "Customer notified, awaiting signature or disbursement.", billable: false },
        { code: "03", name: "Current", desc: "Disbursed loan, payments up to date.", billable: true },
        { code: "04", name: "Early arrears (1–30 days)", desc: "Minor delay, soft collection.", billable: true },
        { code: "05", name: "Mid arrears (31–90 days)", desc: "Intensive administrative collection.", billable: true },
        { code: "06", name: "Hard arrears (91–180 days)", desc: "Restructuring or pre-judicial.", billable: true },
        { code: "07", name: "Restructured / refinanced", desc: "New active payment plan.", billable: true },
        { code: "08", name: "Write-off", desc: "Accounting removal from portfolio.", billable: false },
        { code: "09", name: "Cancelled / fully repaid", desc: "Principal balance = 0, formal closure.", billable: false },
        { code: "10", name: "Transferred / sold", desc: "Transferred to a third party (collections or factoring).", billable: false },
      ],
    },
  },
};

// ===== 3 opciones SaaS =====
export const saasDeploymentOptionsI18n: Record<Lang, {
  title: string;
  intro: string;
  options: { tag: string; title: string; desc: string; instances: string }[];
  footer: string;
}> = {
  es: {
    title: "Modelo SaaS — 3 opciones de despliegue",
    intro: "El precio del modelo SaaS es idéntico en las tres topologías. Unicomer elige libremente la que mejor se ajuste a su gobierno de TI.",
    options: [
      { tag: "Opción 1", title: "Una instancia por país", desc: "Aislamiento máximo, soberanía de datos por jurisdicción, ventanas de mantenimiento independientes.", instances: "9 instancias" },
      { tag: "Opción 2", title: "Por regiones", desc: "Tres regiones consolidadas: HULA (Honduras–Salvador), Sudamérica/Centroamérica y Caribe. Equilibrio entre aislamiento y eficiencia operativa.", instances: "3 instancias" },
      { tag: "Opción 3", title: "Centralizado", desc: "Una sola instancia multi-tenant para los 9 países. Máxima eficiencia operativa y consolidación de reportería.", instances: "1 instancia" },
    ],
    footer: "El cambio entre topologías durante la vigencia del contrato no genera cargo adicional de licenciamiento.",
  },
  en: {
    title: "SaaS Model — 3 deployment options",
    intro: "The SaaS price is identical across all three topologies. Unicomer freely chooses the option that best fits its IT governance.",
    options: [
      { tag: "Option 1", title: "One instance per country", desc: "Maximum isolation, data sovereignty per jurisdiction, independent maintenance windows.", instances: "9 instances" },
      { tag: "Option 2", title: "By region", desc: "Three consolidated regions: HULA (Honduras–Salvador), South/Central America and Caribbean. Balance between isolation and operational efficiency.", instances: "3 instances" },
      { tag: "Option 3", title: "Centralized", desc: "Single multi-tenant instance for all 9 countries. Maximum operational efficiency and consolidated reporting.", instances: "1 instance" },
    ],
    footer: "Switching between topologies during the contract term carries no additional licensing fee.",
  },
};

// ===== Cláusulas comerciales =====
export type ClauseExample = {
  scenario: string;
  steps: { label: string; value: string }[];
  conclusion: string;
};

export const commercialClausesI18n: Record<Lang, {
  title: string;
  intro: string;
  clauses: { num: string; title: string; body: string; highlight?: string; example: ClauseExample }[];
}> = {
  es: {
    title: "Cláusulas comerciales adicionales",
    intro: "Las siguientes cláusulas forman parte integral de la propuesta económica y serán incorporadas al contrato definitivo.",
    clauses: [
      {
        num: "1",
        title: "Recálculo total al superar tramos de volumen",
        body: "Cuando el volumen acumulado supere el umbral de un tramo superior en la tabla de costeo por crédito, todo el volumen se recalcula a la nueva tarifa aplicable, no por bloques o estratos. Aplica siempre el mínimo por país establecido en el modelo SaaS.",
        highlight: "Modelo escalonado total, no por bloques · Mínimo por país siempre respetado",
        example: {
          scenario: "Un país pasa de 480.000 a 510.000 créditos activos durante el año (cruza el umbral de 500.000).",
          steps: [
            { label: "Tarifa tramo anterior (≤500k)", value: "USD $0,42 / crédito / mes" },
            { label: "Tarifa nuevo tramo (>500k)", value: "USD $0,38 / crédito / mes" },
            { label: "Cálculo por bloques (NO aplica)", value: "500.000 × $0,42 + 10.000 × $0,38 = $213.800/mes" },
            { label: "Cálculo SYSDE (recálculo total)", value: "510.000 × $0,38 = $193.800/mes" },
          ],
          conclusion: "Ahorro mensual de USD $20.000 (~9,4%) al cruzar el tramo. Si el resultado fuera menor al mínimo por país del modelo SaaS, se factura el mínimo.",
        },
      },
      {
        num: "2",
        title: "Revisión de tarifa consolidada por escala de grupo",
        body: "El modelo país por país no aprovecha la escala consolidada del grupo Unicomer. Una vez que el grupo alcance un volumen acumulado consolidado de 2.500.000 créditos activos, SYSDE se compromete a revisar la tarifa unitaria a nivel grupo, aplicando un descuento por escala que se incorporará automáticamente al cierre fiscal del año en que se alcance el umbral.",
        highlight: "Umbral grupo: 2.500.000 créditos consolidados · Revisión automática anual",
        example: {
          scenario: "Año 3: la suma de los 9 países alcanza 2.650.000 créditos activos consolidados (supera el umbral de 2,5M).",
          steps: [
            { label: "Tarifa promedio país por país", value: "≈ USD $0,40 / crédito / mes" },
            { label: "Facturación anual sin revisión", value: "2.650.000 × $0,40 × 12 = USD $12,72M" },
            { label: "Tarifa consolidada de grupo revisada", value: "≈ USD $0,34 / crédito / mes (−15%)" },
            { label: "Facturación anual con revisión grupo", value: "2.650.000 × $0,34 × 12 = USD $10,81M" },
          ],
          conclusion: "Ahorro estimado de USD $1,9M anuales aplicado automáticamente al cierre fiscal del año en que se cruza el umbral.",
        },
      },
      {
        num: "3",
        title: "Flexibilidad de facturación multi-entidad",
        body: "El costo de licenciamiento (hoy un pago único) podrá repartirse en facturación hacia distintas entidades del grupo Unicomer, por país o por unidad de negocio, conforme a las necesidades fiscales y contables del grupo. SYSDE emitirá facturas por entidad legal, manteniendo el monto total acordado y sin cargo administrativo por la división.",
        highlight: "Facturación por entidad legal · País o unidad de negocio · Sin recargo administrativo",
        example: {
          scenario: "Unicomer decide repartir el pago único de implementación de USD $1.205.000 entre 3 entidades fiscales del grupo.",
          steps: [
            { label: "Entidad Guatemala (primer país)", value: "USD $395.000 (factura local GT)" },
            { label: "Entidad Holding Regional", value: "USD $610.000 (software base + PMO)" },
            { label: "Entidad Servicios Compartidos", value: "USD $200.000 (integraciones + capacitación)" },
            { label: "Total facturado", value: "USD $1.205.000 — idéntico al monto único" },
          ],
          conclusion: "Tres facturas por entidad legal, deducibles localmente, sin cargo administrativo adicional por la división.",
        },
      },
    ],
  },
  en: {
    title: "Additional commercial clauses",
    intro: "The following clauses form an integral part of the economic proposal and will be incorporated into the final contract.",
    clauses: [
      {
        num: "1",
        title: "Full recalculation when volume tiers are crossed",
        body: "When the accumulated volume crosses a higher tier in the per-loan costing table, the entire volume is recalculated at the new applicable rate, not in blocks or strata. The per-country minimum defined in the SaaS model always applies.",
        highlight: "Full step-down model, not block-based · Per-country minimum always preserved",
        example: {
          scenario: "A country grows from 480,000 to 510,000 active loans during the year (crosses the 500,000 threshold).",
          steps: [
            { label: "Previous tier rate (≤500k)", value: "USD $0.42 / loan / month" },
            { label: "New tier rate (>500k)", value: "USD $0.38 / loan / month" },
            { label: "Block-based calc (NOT applied)", value: "500,000 × $0.42 + 10,000 × $0.38 = $213,800/mo" },
            { label: "SYSDE calc (full recalculation)", value: "510,000 × $0.38 = $193,800/mo" },
          ],
          conclusion: "Monthly saving of USD $20,000 (~9.4%) once the tier is crossed. If the result falls below the SaaS per-country minimum, the minimum is billed.",
        },
      },
      {
        num: "2",
        title: "Consolidated group-scale rate review",
        body: "The country-by-country model does not leverage the consolidated scale of the Unicomer group. Once the group reaches a consolidated volume of 2,500,000 active loans, SYSDE commits to review the unit rate at group level, applying a scale discount that will be automatically incorporated at the fiscal year-end in which the threshold is reached.",
        highlight: "Group threshold: 2,500,000 consolidated loans · Automatic annual review",
        example: {
          scenario: "Year 3: the 9-country sum reaches 2,650,000 consolidated active loans (above the 2.5M threshold).",
          steps: [
            { label: "Average country-by-country rate", value: "≈ USD $0.40 / loan / month" },
            { label: "Annual billing without review", value: "2,650,000 × $0.40 × 12 = USD $12.72M" },
            { label: "Reviewed consolidated group rate", value: "≈ USD $0.34 / loan / month (−15%)" },
            { label: "Annual billing with group review", value: "2,650,000 × $0.34 × 12 = USD $10.81M" },
          ],
          conclusion: "Estimated saving of USD $1.9M annually, applied automatically at the fiscal year-end when the threshold is crossed.",
        },
      },
      {
        num: "3",
        title: "Multi-entity billing flexibility",
        body: "The licensing cost (currently a one-time payment) may be split into invoices to different Unicomer group entities, by country or by business unit, according to the group's tax and accounting needs. SYSDE will issue invoices per legal entity, keeping the total agreed amount and with no administrative charge for the split.",
        highlight: "Per-legal-entity invoicing · Country or business unit · No administrative surcharge",
        example: {
          scenario: "Unicomer decides to split the one-time implementation payment of USD $1,205,000 across 3 group tax entities.",
          steps: [
            { label: "Guatemala entity (first country)", value: "USD $395,000 (local GT invoice)" },
            { label: "Regional Holding entity", value: "USD $610,000 (base software + PMO)" },
            { label: "Shared Services entity", value: "USD $200,000 (integrations + training)" },
            { label: "Total invoiced", value: "USD $1,205,000 — identical to the single amount" },
          ],
          conclusion: "Three invoices per legal entity, locally deductible, with no extra administrative charge for the split.",
        },
      },
    ],
  },
};
