import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileSpreadsheet, Info, Layers, HardDrive, Cloud, Briefcase, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { generateAnnexExcel } from "./excelExport";
import { useIsMobile } from "@/hooks/use-mobile";

const TABS = [
  { value: "instructions", label: "Instructions", icon: Info },
  { value: "volumes", label: "Baseline", icon: Layers },
  { value: "onpremise", label: "On-Premise", icon: HardDrive },
  { value: "saas", label: "SaaS Cloud", icon: Cloud },
  { value: "implementation", label: "Implementation", icon: Briefcase },
  { value: "other", label: "Other Costs", icon: Package },
];

const fmt = (v: string | number, isCurrency = false, decimals = 0) => {
  if (typeof v === "string") return v;
  if (isCurrency) return `$${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const InstructionBanner = ({ title, lines }: { title: string; lines: string[] }) => (
  <div className="rounded-lg border border-border bg-muted/30 p-4 mb-3">
    <div className="flex items-start gap-2 mb-2">
      <Info className="h-4 w-4 text-[#b41d2f] mt-0.5 shrink-0" />
      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
    </div>
    <ul className="space-y-1.5 pl-6">
      {lines.map((l, i) => (
        <li key={i} className="text-xs text-muted-foreground leading-relaxed">{l}</li>
      ))}
    </ul>
  </div>
);

const LicenseBlock = ({ title, lines }: { title: string; lines: string[] }) => (
  <div className="rounded-lg border-2 border-[#b41d2f]/20 bg-gradient-to-br from-[#b41d2f]/5 to-transparent p-4">
    <h4 className="font-bold text-sm text-[#b41d2f] mb-2">{title}</h4>
    <ul className="space-y-1">
      {lines.map((l, i) => (
        <li key={i} className="text-xs text-muted-foreground">{l}</li>
      ))}
    </ul>
  </div>
);

const TableShell = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-sm tabular-nums">{children}</table>
  </div>
);

const Th = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-3 py-2.5 text-left text-xs font-semibold text-[#4d4d4f] bg-muted/50 border-b border-border ${className}`}>
    {children}
  </th>
);

const Td = ({ children, className = "", bold = false }: { children: React.ReactNode; className?: string; bold?: boolean }) => (
  <td className={`px-3 py-2 text-xs border-b border-border/50 ${bold ? "font-semibold text-foreground" : "text-muted-foreground"} ${className}`}>
    {children}
  </td>
);

const TotalRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="bg-[#b41d2f]/5 border-t-2 border-[#b41d2f]">{children}</tr>
);

export default function AnnexViewer() {
  const [tab, setTab] = useState("instructions");
  const isMobile = useIsMobile();

  return (
    <div className="mt-20">
      {/* Section divider */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b41d2f]/10 border border-[#b41d2f]/20 mb-4">
          <FileSpreadsheet className="h-4 w-4 text-[#b41d2f]" />
          <span className="text-xs font-semibold text-[#b41d2f] uppercase tracking-wider">Anexo 2 Oficial</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Anexo 2 — Respuesta detallada al modelo económico
        </h3>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Respuesta completa al formato económico oficial de Unicomer, descargable como Excel idéntico al original.
        </p>
      </div>

      <Card className="border-border shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#4d4d4f] to-[#2d2d2f] text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Annex 2 — SYSDE Response
              </CardTitle>
              <p className="text-xs text-white/70 mt-1">v2026-01-23 · 6 hojas · USD · EXCL. VAT</p>
            </div>
            <Button
              onClick={generateAnnexExcel}
              className="bg-[#b41d2f] hover:bg-[#9a1828] text-white gap-2 shrink-0"
              size="lg"
            >
              <Download className="h-4 w-4" />
              Descargar Excel
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            {isMobile ? (
              <Select value={tab} onValueChange={setTab}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TABS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <TabsList className="grid w-full grid-cols-6 h-auto p-1">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <TabsTrigger key={t.value} value={t.value} className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-[#b41d2f] data-[state=active]:text-white">
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{t.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-4"
              >
                <TabsContent value="instructions" forceMount={tab === "instructions" ? true : undefined} hidden={tab !== "instructions"}>
                  <h3 className="text-xl font-bold text-foreground mb-4">{instructionsData.title}</h3>
                  <TableShell>
                    <thead>
                      <tr>
                        <Th className="w-[200px]">Category</Th>
                        <Th>Rule / Requirement</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructionsData.rules.map((r, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          <Td bold>{r.category}</Td>
                          <Td>{r.rule}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </TableShell>
                </TabsContent>

                <TabsContent value="volumes" forceMount={tab === "volumes" ? true : undefined} hidden={tab !== "volumes"}>
                  <h3 className="text-xl font-bold text-foreground mb-1">{baselineData.title}</h3>
                  <p className="text-sm font-medium text-[#b41d2f] mb-3">{baselineData.subtitle}</p>
                  <p className="text-xs text-muted-foreground italic mb-4 leading-relaxed">{baselineData.note}</p>
                  <TableShell>
                    <thead>
                      <tr>
                        {baselineData.headers.map((h, i) => <Th key={i}>{h}</Th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {baselineData.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          {row.map((cell, j) => (
                            <Td key={j} bold={j === 1}>
                              {typeof cell === "number" ? fmt(cell) : cell}
                            </Td>
                          ))}
                        </tr>
                      ))}
                      <TotalRow>
                        <Td bold></Td>
                        <Td bold className="text-[#b41d2f]">Totales</Td>
                        <Td bold className="text-[#b41d2f]">{fmt(baselineData.totals.creditos)}</Td>
                        <Td bold className="text-[#b41d2f]">{fmt(baselineData.totals.clientes)}</Td>
                        <Td bold className="text-[#b41d2f]">{fmt(baselineData.totals.usuarios)}</Td>
                        <Td>—</Td><Td>—</Td><Td>—</Td><Td>—</Td>
                      </TotalRow>
                    </tbody>
                  </TableShell>
                </TabsContent>

                <TabsContent value="onpremise" forceMount={tab === "onpremise" ? true : undefined} hidden={tab !== "onpremise"}>
                  <h3 className="text-xl font-bold text-foreground mb-4">On-Premise — Recurring Licensing & Support Fees</h3>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {opexInstructions.map((s, i) => <InstructionBanner key={i} {...s} />)}
                  </div>
                  <TableShell>
                    <thead>
                      <tr>{onPremiseHeaders.map((h, i) => <Th key={i}>{h}</Th>)}</tr>
                    </thead>
                    <tbody>
                      {onPremiseRows.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          {row.map((cell, j) => (
                            <Td key={j} bold={j === 1}>
                              {j === 5 ? fmt(cell) : j === 6 || j === 7 ? fmt(cell as number, true, 2) : j === 8 ? fmt(cell as number, true, 2) : cell}
                            </Td>
                          ))}
                        </tr>
                      ))}
                      <TotalRow>
                        <Td bold></Td>
                        <Td bold className="text-[#b41d2f]">TOTALS:</Td>
                        <Td></Td><Td></Td><Td></Td>
                        <Td bold className="text-[#b41d2f]">{fmt(onPremiseTotals.volume)}</Td>
                        <Td></Td><Td></Td>
                        <Td bold className="text-[#b41d2f]">{fmt(onPremiseTotals.totalAnnual, true)}</Td>
                      </TotalRow>
                    </tbody>
                  </TableShell>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {licenseBlocks.map((b, i) => <LicenseBlock key={i} {...b} />)}
                  </div>
                </TabsContent>

                <TabsContent value="saas" forceMount={tab === "saas" ? true : undefined} hidden={tab !== "saas"}>
                  <h3 className="text-xl font-bold text-foreground mb-4">SaaS (Cloud) — Recurring Licensing & Support Fees</h3>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {opexInstructions.map((s, i) => <InstructionBanner key={i} {...s} />)}
                  </div>
                  <TableShell>
                    <thead>
                      <tr>{saasHeaders.map((h, i) => <Th key={i}>{h}</Th>)}</tr>
                    </thead>
                    <tbody>
                      {saasRows.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          {row.map((cell, j) => (
                            <Td key={j} bold={j === 1}>
                              {j === 4 ? fmt(cell) : j === 5 || j === 6 ? fmt(cell as number, true, 2) : j === 7 || j === 8 ? fmt(cell as number, true, 2) : cell}
                            </Td>
                          ))}
                        </tr>
                      ))}
                      <TotalRow>
                        <Td bold></Td>
                        <Td bold className="text-[#b41d2f]">TOTALS:</Td>
                        <Td></Td><Td></Td>
                        <Td bold className="text-[#b41d2f]">{fmt(saasTotals.volume)}</Td>
                        <Td></Td><Td></Td>
                        <Td bold className="text-[#b41d2f]">{fmt(saasTotals.monthly, true, 2)}</Td>
                        <Td bold className="text-[#b41d2f]">{fmt(saasTotals.annual, true, 2)}</Td>
                      </TotalRow>
                    </tbody>
                  </TableShell>

                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-3">{costingTiers.title}</h4>
                    <TableShell>
                      <thead>
                        <tr>{costingTiers.headers.map((h, i) => <Th key={i}>{h}</Th>)}</tr>
                      </thead>
                      <tbody>
                        {costingTiers.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-muted/30">
                            {row.map((cell, j) => (
                              <Td key={j}>
                                {j === 0 || j === 1 ? (typeof cell === "number" ? fmt(cell) : cell) : j === 2 ? fmt(cell as number, true, 2) : fmt(cell as number, true)}
                              </Td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </TableShell>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {licenseBlocks.map((b, i) => <LicenseBlock key={i} {...b} />)}
                  </div>
                </TabsContent>

                <TabsContent value="implementation" forceMount={tab === "implementation" ? true : undefined} hidden={tab !== "implementation"}>
                  <h3 className="text-xl font-bold text-foreground mb-4">Implementation Services</h3>
                  <div className="space-y-3 mb-6">
                    {implementationInstructions.map((s, i) => <InstructionBanner key={i} {...s} />)}
                  </div>
                  <TableShell>
                    <thead>
                      <tr>{implementationHeaders.map((h, i) => <Th key={i}>{h}</Th>)}</tr>
                    </thead>
                    <tbody>
                      {implementationRows.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          {row.map((cell, j) => (
                            <Td key={j} bold={j === 1}>
                              {j >= 3 ? fmt(cell as number, true, 2) : cell}
                            </Td>
                          ))}
                        </tr>
                      ))}
                      <TotalRow>
                        <Td bold className="text-[#b41d2f]">TOTALS:</Td>
                        <Td></Td><Td></Td>
                        <Td bold className="text-[#b41d2f]">{fmt(implementationTotals.professional, true, 2)}</Td>
                        <Td bold className="text-[#b41d2f]">{fmt(implementationTotals.travel, true, 2)}</Td>
                        <Td bold className="text-[#b41d2f] text-sm">{fmt(implementationTotals.total, true, 2)}</Td>
                      </TotalRow>
                    </tbody>
                  </TableShell>
                  <p className="text-xs text-muted-foreground italic mt-4">{implementationFooter}</p>
                </TabsContent>

                <TabsContent value="other" forceMount={tab === "other" ? true : undefined} hidden={tab !== "other"}>
                  <h3 className="text-xl font-bold text-foreground mb-4">Other Costs</h3>
                  <div className="rounded-lg border-2 border-[#b41d2f]/20 bg-gradient-to-br from-[#b41d2f]/5 to-transparent p-6">
                    <ul className="space-y-3">
                      {otherCosts.map((l, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                          <Package className="h-4 w-4 text-[#b41d2f] mt-0.5 shrink-0" />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
