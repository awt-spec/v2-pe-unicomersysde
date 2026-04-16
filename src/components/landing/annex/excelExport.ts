import * as XLSX from "xlsx";
import {
  instructionsData,
  baselineData,
  opexInstructions,
  onPremiseHeaders,
  onPremiseRows,
  onPremiseTotals,
  saasHeaders,
  saasRows,
  saasTotals,
  costingTiers,
  licenseBlocks,
  implementationInstructions,
  implementationHeaders,
  implementationRows,
  implementationTotals,
  implementationFooter,
  otherCosts,
} from "./annexData";

type Row = (string | number | null)[];

const setColWidths = (ws: XLSX.WorkSheet, widths: number[]) => {
  ws["!cols"] = widths.map((w) => ({ wch: w }));
};

export function generateAnnexExcel() {
  const wb = XLSX.utils.book_new();

  // 1. Instructions
  const ins: Row[] = [
    [instructionsData.title],
    [],
    ["Category", "Rule / Requirement"],
    ...instructionsData.rules.map((r) => [r.category, r.rule] as Row),
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(ins);
  setColWidths(ws1, [25, 110]);
  XLSX.utils.book_append_sheet(wb, ws1, "Instructions");

  // 2. Volumes / Baseline
  const vol: Row[] = [
    [baselineData.title],
    [],
    [baselineData.subtitle],
    [baselineData.note],
    [],
    baselineData.headers,
    ...baselineData.rows.map((r) => r as Row),
    ["", "Totales", baselineData.totals.creditos, baselineData.totals.clientes, baselineData.totals.usuarios, "", "", "", ""],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(vol);
  setColWidths(ws2, [6, 20, 18, 18, 18, 18, 22, 22, 22]);
  XLSX.utils.book_append_sheet(wb, ws2, "Volumes");

  // 3. On Premise
  const op: Row[] = [
    ["INSTRUCTIONS FOR SHEET 3: RECURRING LICENSING & SUPPORT FEES (OPEX)"],
    [],
  ];
  opexInstructions.forEach((s) => {
    op.push([s.title]);
    s.lines.forEach((l) => op.push([l]));
    op.push([]);
  });
  op.push(onPremiseHeaders);
  onPremiseRows.forEach((r) => op.push(r as Row));
  op.push(["", "TOTALS:", "", "", "", onPremiseTotals.volume, "", "", onPremiseTotals.totalAnnual]);
  op.push([]);
  licenseBlocks.forEach((b) => {
    op.push([b.title]);
    b.lines.forEach((l) => op.push([l]));
    op.push([]);
  });
  const ws3 = XLSX.utils.aoa_to_sheet(op);
  setColWidths(ws3, [14, 20, 18, 28, 22, 18, 22, 22, 20]);
  XLSX.utils.book_append_sheet(wb, ws3, "On Premise - Licensing fee");

  // 4. SaaS
  const sa: Row[] = [
    ["INSTRUCTIONS FOR SHEET 3: RECURRING LICENSING & SUPPORT FEES (OPEX)"],
    [],
  ];
  opexInstructions.forEach((s) => {
    sa.push([s.title]);
    s.lines.forEach((l) => sa.push([l]));
    sa.push([]);
  });
  sa.push(saasHeaders);
  saasRows.forEach((r) => sa.push(r as Row));
  sa.push(["", "TOTALS:", "", "", saasTotals.volume, "", "", saasTotals.monthly, saasTotals.annual]);
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
  XLSX.utils.book_append_sheet(wb, ws4, "SaaS - Licensing fees");

  // 5. Implementation
  const im: Row[] = [
    ["IMPLEMENTATION SERVICES"],
    [],
    ["INSTRUCTIONS:"],
    [],
  ];
  implementationInstructions.forEach((s) => {
    im.push([s.title]);
    s.lines.forEach((l) => im.push([l]));
    im.push([]);
  });
  im.push(["DATA TABLE"]);
  im.push([]);
  im.push(implementationHeaders);
  implementationRows.forEach((r) => im.push(r as Row));
  im.push(["TOTALS:", "", "", implementationTotals.professional, implementationTotals.travel, implementationTotals.total]);
  im.push([]);
  im.push([implementationFooter]);
  const ws5 = XLSX.utils.aoa_to_sheet(im);
  setColWidths(ws5, [16, 22, 18, 28, 24, 22]);
  XLSX.utils.book_append_sheet(wb, ws5, "Implementation services");

  // 6. Other costs
  const oc: Row[] = otherCosts.map((l) => [l]);
  const ws6 = XLSX.utils.aoa_to_sheet(oc);
  setColWidths(ws6, [80]);
  XLSX.utils.book_append_sheet(wb, ws6, "Other costs");

  XLSX.writeFile(wb, "Annex_2_SYSDE_Response.xlsx");
}
