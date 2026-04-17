import * as XLSX from "xlsx";
import type { Lang } from "@/i18n/LanguageContext";
import {
  instructionsDataI18n,
  baselineDataI18n,
  opexInstructionsI18n,
  onPremiseHeadersI18n,
  onPremiseRowsI18n,
  onPremiseTotals,
  saasHeadersI18n,
  saasRowsI18n,
  saasTotals,
  costingTiersI18n,
  licenseBlocksI18n,
  implementationInstructionsI18n,
  implementationHeadersI18n,
  implementationRowsI18n,
  implementationTotals,
  implementationFooterI18n,
  otherCostsI18n,
} from "./annexDataI18n";
import {
  implementationBreakdownI18n,
  creditDefinitionI18n,
  saasDeploymentOptionsI18n,
  commercialClausesI18n,
} from "./implementationBreakdownData";

type Row = (string | number | null)[];

const setColWidths = (ws: XLSX.WorkSheet, widths: number[]) => {
  ws["!cols"] = widths.map((w) => ({ wch: w }));
};

const labels = {
  es: {
    instructions: "Instrucciones",
    volumes: "Volúmenes",
    onpremise: "On Premise - Licencias",
    saas: "SaaS - Licencias",
    implementation: "Servicios de Implementación",
    other: "Otros costos",
    creditDef: "Definición Crédito Activo",
    saasOptions: "Opciones SaaS",
    clauses: "Cláusulas Comerciales",
    sheet3title: "INSTRUCCIONES PARA HOJA 3: LICENCIAMIENTO Y SOPORTE RECURRENTES (OPEX)",
    implTitle: "SERVICIOS DE IMPLEMENTACIÓN",
    instTitle: "INSTRUCCIONES:",
    dataTable: "TABLA DE DATOS",
    totals: "TOTALES:",
    grandTotals: "Totales",
    catHeader: "Categoría",
    ruleHeader: "Regla / Requisito",
    breakdownTitle: "DESGLOSE DEL COSTO ÚNICO DE IMPLEMENTACIÓN",
    subtotal: "Subtotal",
    grandTotalLabel: "TOTAL",
    code: "#",
    state: "Estado",
    desc: "Descripción",
    billable: "Facturable",
    yes: "Sí",
    no: "No",
    file: "Anexo_2_SYSDE_Response.xlsx",
  },
  en: {
    instructions: "Instructions",
    volumes: "Volumes",
    onpremise: "On Premise - Licensing fee",
    saas: "SaaS - Licensing fees",
    implementation: "Implementation services",
    other: "Other costs",
    creditDef: "Active Loan Definition",
    saasOptions: "SaaS Options",
    clauses: "Commercial Clauses",
    sheet3title: "INSTRUCTIONS FOR SHEET 3: RECURRING LICENSING & SUPPORT FEES (OPEX)",
    implTitle: "IMPLEMENTATION SERVICES",
    instTitle: "INSTRUCTIONS:",
    dataTable: "DATA TABLE",
    totals: "TOTALS:",
    grandTotals: "Totals",
    catHeader: "Category",
    ruleHeader: "Rule / Requirement",
    breakdownTitle: "ONE-TIME IMPLEMENTATION COST BREAKDOWN",
    subtotal: "Subtotal",
    grandTotalLabel: "TOTAL",
    code: "#",
    state: "State",
    desc: "Description",
    billable: "Billable",
    yes: "Yes",
    no: "No",
    file: "Annex_2_SYSDE_Response.xlsx",
  },
} as const;

export function generateAnnexExcel(lang: Lang = "en") {
  const L = labels[lang];
  const wb = XLSX.utils.book_new();

  const instructionsData = instructionsDataI18n[lang];
  const baselineData = baselineDataI18n(lang);
  const opexInstructions = opexInstructionsI18n[lang];
  const onPremiseHeaders = onPremiseHeadersI18n(lang);
  const onPremiseRows = onPremiseRowsI18n(lang);
  const saasHeaders = saasHeadersI18n(lang);
  const saasRows = saasRowsI18n(lang);
  const costingTiers = costingTiersI18n(lang);
  const licenseBlocks = licenseBlocksI18n[lang];
  const implementationInstructions = implementationInstructionsI18n[lang];
  const implementationHeaders = implementationHeadersI18n(lang);
  const implementationRows = implementationRowsI18n(lang);
  const implementationFooter = implementationFooterI18n(lang);
  const otherCosts = otherCostsI18n[lang];

  // 1. Instructions
  const ins: Row[] = [
    [instructionsData.title],
    [],
    [L.catHeader, L.ruleHeader],
    ...instructionsData.rules.map((r) => [r.category, r.rule] as Row),
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(ins);
  setColWidths(ws1, [25, 110]);
  XLSX.utils.book_append_sheet(wb, ws1, L.instructions);

  // 2. Volumes / Baseline
  const vol: Row[] = [
    [baselineData.title],
    [],
    [baselineData.subtitle],
    [baselineData.note],
    [],
    baselineData.headers,
    ...baselineData.rows.map((r) => r as Row),
    ["", L.grandTotals, baselineData.totals.creditos, baselineData.totals.clientes, baselineData.totals.usuarios, "", "", "", ""],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(vol);
  setColWidths(ws2, [6, 20, 18, 18, 18, 18, 22, 22, 22]);
  XLSX.utils.book_append_sheet(wb, ws2, L.volumes);

  // 3. On Premise
  const op: Row[] = [[L.sheet3title], []];
  opexInstructions.forEach((s) => {
    op.push([s.title]);
    s.lines.forEach((l) => op.push([l]));
    op.push([]);
  });
  op.push(onPremiseHeaders);
  onPremiseRows.forEach((r) => op.push(r as Row));
  op.push(["", L.totals, "", "", "", onPremiseTotals.volume, "", "", onPremiseTotals.totalAnnual]);
  op.push([]);
  licenseBlocks.forEach((b) => {
    op.push([b.title]);
    b.lines.forEach((l) => op.push([l]));
    op.push([]);
  });
  const ws3 = XLSX.utils.aoa_to_sheet(op);
  setColWidths(ws3, [14, 20, 18, 28, 22, 18, 22, 22, 20]);
  XLSX.utils.book_append_sheet(wb, ws3, L.onpremise);

  // 4. SaaS
  const sa: Row[] = [[L.sheet3title], []];
  opexInstructions.forEach((s) => {
    sa.push([s.title]);
    s.lines.forEach((l) => sa.push([l]));
    sa.push([]);
  });
  sa.push(saasHeaders);
  saasRows.forEach((r) => sa.push(r as Row));
  sa.push(["", L.totals, "", "", saasTotals.volume, "", "", saasTotals.monthly, saasTotals.annual]);
  sa.push([]);
  sa.push([costingTiers.title]);
  sa.push(costingTiers.headers);
  costingTiers.rows.forEach((r) => sa.push(r as Row));
  sa.push([]);
  licenseBlocks.forEach((b) => {
    sa.push([b.title]);
    b.lines.forEach((l) => sa.push([l]));
    sa.push([]);
  });
  const ws4 = XLSX.utils.aoa_to_sheet(sa);
  setColWidths(ws4, [14, 20, 28, 22, 18, 22, 22, 20, 20]);
  XLSX.utils.book_append_sheet(wb, ws4, L.saas);

  // 5. Implementation
  const im: Row[] = [[L.implTitle], [], [L.instTitle], []];
  implementationInstructions.forEach((s) => {
    im.push([s.title]);
    s.lines.forEach((l) => im.push([l]));
    im.push([]);
  });
  im.push([L.dataTable]);
  im.push([]);
  im.push(implementationHeaders);
  implementationRows.forEach((r) => im.push(r as Row));
  im.push([L.totals, "", "", implementationTotals.professional, implementationTotals.travel, implementationTotals.total]);
  im.push([]);
  im.push([implementationFooter]);
  im.push([]); im.push([]);

  // Desglose detallado
  const breakdown = implementationBreakdownI18n[lang];
  im.push([L.breakdownTitle]);
  im.push([breakdown.intro]);
  im.push([]);
  breakdown.blocks.forEach((block) => {
    im.push([block.header]);
    im.push([]);
    block.items.forEach((item) => {
      im.push([item.title, "", "", "", "", item.amount]);
      item.bullets.forEach((b) => im.push(["  " + b]));
      im.push([]);
    });
    im.push([block.subtotal.label, "", "", "", "", block.subtotal.amount]);
    im.push([]);
  });
  im.push([breakdown.grandTotal.label, "", "", "", "", breakdown.grandTotal.amount]);

  const ws5 = XLSX.utils.aoa_to_sheet(im);
  setColWidths(ws5, [40, 22, 18, 22, 22, 22]);
  XLSX.utils.book_append_sheet(wb, ws5, L.implementation);

  // 6. Other costs
  const oc: Row[] = otherCosts.map((l) => [l]);
  const ws6 = XLSX.utils.aoa_to_sheet(oc);
  setColWidths(ws6, [80]);
  XLSX.utils.book_append_sheet(wb, ws6, L.other);

  // 7. Active Loan Definition
  const credit = creditDefinitionI18n[lang];
  const cd: Row[] = [[credit.title], [credit.intro], [], [credit.isActive.title]];
  credit.isActive.items.forEach((it) => cd.push(["  ✓ " + it]));
  cd.push([]);
  cd.push([credit.isNotActive.title]);
  credit.isNotActive.items.forEach((it) => cd.push(["  ✗ " + it]));
  cd.push([]);
  cd.push([credit.lifecycle.title]);
  cd.push([L.code, L.state, L.desc, L.billable]);
  credit.lifecycle.states.forEach((s) =>
    cd.push([s.code, s.name, s.desc, s.billable ? L.yes : L.no])
  );
  const ws7 = XLSX.utils.aoa_to_sheet(cd);
  setColWidths(ws7, [8, 32, 70, 12]);
  XLSX.utils.book_append_sheet(wb, ws7, L.creditDef);

  // 8. SaaS Options
  const saasOpt = saasDeploymentOptionsI18n[lang];
  const so: Row[] = [[saasOpt.title], [saasOpt.intro], []];
  so.push(["", "", ""]);
  so.push(["Tag", "Title", "Instances", "Description"]);
  saasOpt.options.forEach((o) => so.push([o.tag, o.title, o.instances, o.desc]));
  so.push([]);
  so.push([saasOpt.footer]);
  const ws8 = XLSX.utils.aoa_to_sheet(so);
  setColWidths(ws8, [12, 30, 16, 70]);
  XLSX.utils.book_append_sheet(wb, ws8, L.saasOptions);

  // 9. Commercial Clauses
  const cl = commercialClausesI18n[lang];
  const cls: Row[] = [[cl.title], [cl.intro], []];
  cl.clauses.forEach((c) => {
    cls.push([`${c.num}. ${c.title}`]);
    cls.push([c.body]);
    if (c.highlight) cls.push(["  → " + c.highlight]);
    cls.push([]);
  });
  const ws9 = XLSX.utils.aoa_to_sheet(cls);
  setColWidths(ws9, [110]);
  XLSX.utils.book_append_sheet(wb, ws9, L.clauses);

  XLSX.writeFile(wb, L.file);
}
