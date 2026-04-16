// Datos exactos extraídos del Annex 2 - SYSDE Response (v2026-01-23)
// Fuente única para UI y exportación a Excel

export const instructionsData = {
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
};

export const baselineData = {
  title: "BASELINE SCENARIOS",
  subtitle: "STANDARIZATION FOR EVALUATION",
  note: "The volumes listed below are estimates provided for reference purposes and do not constitute a commitment to purchase. Actual volumes may vary upwards or downwards during execution. Please use these specific figures to populate the pricing models in Tab 3, ensuring all proposals are aligned to the same assumptions.",
  headers: ["Item", "País", "Créditos vigentes", "Clientes estimados", "Media de usuarios", "Media de Pagos/mes", "Pico de Pagos/mes", "Media de Desembolsos/mes", "Pico de Desembolsos/mes"],
  rows: [
    [1, "El Salvador", 419494, 128300, 641, 180603, "MAR: 192,926", 15920, "NOV: 24,251"],
    [2, "Honduras", 338360, 82500, 1691, 122450, "DIC: 132,633", 8614, "NOV: 13,205"],
    [3, "Guatemala", 91536, 70700, 152, 74806, "MAR: 80,032", 7042, "DIC: 8,812"],
    [4, "Nicaragua", 79360, 55700, 518, 64730, "JUL: 68,320", 7129, "NOV: 9,696"],
    [5, "Ecuador", 144688, 115500, 300, 138673, "MAR: 144,710", 9726, "DIC: 13,361"],
    [6, "Jamaica", 186000, 94100, 433, 124772, "MAR: 142,885", 6589, "NOV: 9,308"],
    [7, "Trinidad y Tobago", 117295, 71600, 23, 130426, "NOV: 228,185", 6013, "DIC: 11,333"],
    [8, "Guyana", 65176, 41200, 14, 73503, "NOV: 91,183", 2746, "DIC: 4,868"],
    [9, "Costa Rica", 708591, 393500, 400, 1056419, "DIC: 1,176,698", 60156, "DIC: 70,042"],
  ],
  totals: { creditos: 2150500, clientes: 1053100, usuarios: 4172 },
};

export const opexInstructions = [
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
];

export const onPremiseHeaders = ["Phase", "Country", "Est. Go-Live", "Deployment Model", "Metric Used", "Relevant Volume", "Base License Unit Price (Monthly USD)", "Support/Maint. Unit Price (Monthly USD)", "Total Annual Cost"];

export const onPremiseRows: (string | number)[][] = [
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

export const onPremiseTotals = { volume: 2150500, totalAnnual: 774180 };

export const saasHeaders = ["Phase", "Country", "Deployment Model", "Metric Used", "Relevant Volume", "Base License Unit Price (Monthly USD)", "Support/Maint. Unit Price (Monthly USD)", "Total Monthly Cost", "Total Annual Cost"];

export const saasRows: (string | number)[][] = [
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

export const saasTotals = { volume: 2150500, monthly: 106537.9, annual: 1278454.8 };

export const costingTiers = {
  title: "Costing Model per Loan (Credit)",
  headers: ["From", "To", "Monthly Cost per Loan", "Minimum"],
  rows: [
    [1, 100000, 0.10, 2500],
    [100001, 200000, 0.07, 7000],
    [200001, 450000, 0.04, 8000],
    [500000, "—", 0.03, 15000],
  ] as (string | number)[][],
};

export const licenseBlocks = [
  {
    title: "Annual License Credit Core System (USD 350,000.00)",
    lines: [
      "Companies: Unlimited | Users: Unlimited | Loans: Unlimited | Customers: Unlimited",
      "Territory: BIG 9 + all geographies where Unicomer operates.",
      "Payable in advance on January 1, regardless of loan volume.",
    ],
  },
  {
    title: "Annual Credit Card License (USD 250,000.00)",
    lines: [
      "Companies: Unlimited | Users: Unlimited | Credit Cards: Unlimited | Customers: Unlimited",
      "Territory: BIG 9 + all geographies where Unicomer operates.",
      "Payable in advance on January 1, regardless of loan volume.",
    ],
  },
  {
    title: "Annual Factoring License (USD 100,000.00)",
    lines: [
      "Companies: Unlimited | Users: Unlimited | Loans: Unlimited | Customers: Unlimited",
      "Territory: BIG 9 + all geographies where Unicomer operates.",
      "Payable in advance on January 1, regardless of loan volume.",
    ],
  },
];

export const implementationInstructions = [
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
];

export const implementationHeaders = ["Phase", "Country", "Est. Go-Live", "Professional Services Fee (USD)", "Est. Travel Expenses (USD)", "Total One-Time Cost"];

export const implementationRows: (string | number)[][] = [
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

export const implementationTotals = { professional: 1306415.63, travel: 15000, total: 1321415.63 };
export const implementationFooter = "Note: The cost is zero for professional services under active support.";

export const otherCosts = [
  "NOTE: No additional third-party costs are required.",
  "SAF+ includes the complete technology stack.",
  "Database and middleware are included in the licensing fee.",
];
