import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, CheckCircle2, Settings, Zap, FileText, Shield, Users, Clock, Sparkles } from "lucide-react";
import SysdeHint from "../SysdeHint";
import { motion } from "framer-motion";
import ChatAssistant from "../ChatAssistant";
import {
  FUNCTIONAL_REQUIREMENTS,
  TECHNICAL_REQUIREMENTS,
  COMPANY_DETAILS,
  SLA_DETAILS,
  type RfpCategory,
  type TechCategory,
} from "./rfpData";

const coverageBadge = (c?: string) => {
  switch (c) {
    case "std": return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-200 text-[10px] font-semibold px-1.5 py-0">STD</Badge>;
    case "cus": return <Badge className="bg-amber-500/15 text-amber-700 border-amber-200 text-[10px] font-semibold px-1.5 py-0">CUS</Badge>;
    case "nr": return <Badge className="bg-blue-500/15 text-blue-700 border-blue-200 text-[10px] font-semibold px-1.5 py-0">NR</Badge>;
    case "thr": return <Badge className="bg-purple-500/15 text-purple-700 border-purple-200 text-[10px] font-semibold px-1.5 py-0">THR</Badge>;
    case "ns": return <Badge className="bg-red-500/15 text-red-700 border-red-200 text-[10px] font-semibold px-1.5 py-0">NS</Badge>;
    default: return null;
  }
};

const complianceBadge = (c?: string) => {
  if (!c) return null;
  if (c.toLowerCase().includes("compliant") && !c.toLowerCase().includes("not")) {
    return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-200 text-[10px] font-semibold px-1.5 py-0">Compliant</Badge>;
  }
  if (c.toLowerCase().includes("partially")) {
    return <Badge className="bg-amber-500/15 text-amber-700 border-amber-200 text-[10px] font-semibold px-1.5 py-0">Partial</Badge>;
  }
  return <Badge className="bg-red-500/15 text-red-700 border-red-200 text-[10px] font-semibold px-1.5 py-0">N/C</Badge>;
};

function CollapsibleCategory({ cat, type }: { cat: RfpCategory | TechCategory; type: "func" | "tech" }) {
  const [open, setOpen] = useState(false);
  const items = cat.items.filter((it) => !it.isGroup);
  const groups = cat.items.filter((it) => it.isGroup);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          <span className="font-semibold text-sm text-foreground">{cat.label}</span>
        </div>
        <Badge variant="outline" className="text-[10px]">{items.length} items</Badge>
      </button>
      {open && (
        <div className="divide-y divide-border">
          {cat.items.map((item, idx) => {
            if (item.isGroup) {
              return (
                <div key={idx} className="px-4 py-2 bg-muted/30">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{item.id} — {item.feature}</span>
                </div>
              );
            }
            return (
              <div key={idx} className="px-4 py-2.5 flex items-start gap-3 hover:bg-muted/20 transition-colors">
                <span className="text-[10px] text-muted-foreground font-mono mt-0.5 shrink-0 w-12">{item.id}</span>
                <span className="text-xs text-foreground flex-1">{item.feature}</span>
                {type === "func" && coverageBadge((item as any).coverage)}
                {type === "tech" && complianceBadge((item as any).compliance)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ExecutiveSummary() {
  const totalFunc = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup).length, 0);
  const totalTech = TECHNICAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup).length, 0);
  const totalStd = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => i.coverage === "std").length, 0);
  const totalCus = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => i.coverage === "cus").length, 0);
  const totalNr = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => i.coverage === "nr").length, 0);
  const totalThr = FUNCTIONAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => i.coverage === "thr").length, 0);

  const totalCompliant = TECHNICAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup && i.compliance?.toLowerCase().includes("compliant") && !i.compliance?.toLowerCase().includes("not")).length, 0);
  const totalPartial = TECHNICAL_REQUIREMENTS.reduce((acc, c) => acc + c.items.filter(i => !i.isGroup && i.compliance?.toLowerCase().includes("partially")).length, 0);
  const totalOtherTech = totalTech - totalCompliant - totalPartial;

  const funcPieData = [
    { name: "Estándar", value: totalStd, fill: "#10b981" },
    { name: "Personalizable", value: totalCus, fill: "#f59e0b" },
    { name: "Release futuro", value: totalNr, fill: "#3b82f6" },
    { name: "Vía tercero", value: totalThr, fill: "#8b5cf6" },
  ].filter(d => d.value > 0);

  const techPieData = [
    { name: "Cumple", value: totalCompliant, fill: "#10b981" },
    { name: "Parcial", value: totalPartial, fill: "#f59e0b" },
    { name: "Otro", value: totalOtherTech, fill: "#94a3b8" },
  ].filter(d => d.value > 0);

  const catBarData = FUNCTIONAL_REQUIREMENTS.map(cat => {
    const items = cat.items.filter(i => !i.isGroup);
    const std = items.filter(i => i.coverage === "std").length;
    const cus = items.filter(i => i.coverage === "cus").length;
    const other = items.length - std - cus;
    return { name: cat.label.length > 18 ? cat.label.slice(0, 18) + "…" : cat.label, Estándar: std, Personalizable: cus, Otro: other };
  });

  const stats = [
    { icon: FileText, label: "Requerimientos Funcionales", value: totalFunc, color: "text-emerald-600" },
    { icon: Settings, label: "Requerimientos Técnicos", value: totalTech, color: "text-blue-600" },
    { icon: CheckCircle2, label: "Cobertura Estándar", value: `${Math.round((totalStd / totalFunc) * 100)}%`, color: "text-emerald-600" },
    { icon: Shield, label: "Certificaciones", value: "PCI / ISO / SOC2", color: "text-purple-600" },
    { icon: Users, label: "Clientes Activos Global", value: "830+", color: "text-accent" },
    { icon: Clock, label: "Disponibilidad", value: "99.95%", color: "text-blue-600" },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent < 0.05) return null;
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
        <h3 className="text-lg font-bold text-foreground mb-3">Resumen Ejecutivo</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          SYSDE presenta su plataforma <strong>SAF+ Credit Core</strong> como respuesta integral al RFP de Unicomer. 
          Con <strong>35 años</strong> de experiencia, <strong>830+ clientes activos</strong> globalmente y presencia probada en 
          Centroamérica, el Caribe y Sudamérica, SAF+ cubre el <strong>100% de los requerimientos funcionales</strong> del RFP 
          con funcionalidad estándar o configurable.
        </p>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <Card key={i} className="p-4 flex items-center gap-3">
            <s.icon className={`w-5 h-5 ${s.color} shrink-0`} />
            <div>
              <div className="text-lg font-bold text-foreground">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">Cobertura Funcional</h4>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={funcPieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" labelLine={false} label={renderCustomLabel}>
                  {funcPieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} reqs`, name]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">Cumplimiento Técnico</h4>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={techPieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" labelLine={false} label={renderCustomLabel}>
                  {techPieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} reqs`, name]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h4 className="text-sm font-semibold text-foreground mb-3">Cobertura por Categoría Funcional</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={catBarData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="Estándar" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Personalizable" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Otro" stackId="a" fill="#94a3b8" radius={[0, 4, 4, 0]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

    </div>
  );
}

const RfpSection = () => {
  return (
    <section id="rfp" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-sm px-4 py-1">🎯 Respuesta al RFP</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground tracking-tight">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">100% Cobertura.</span>
            <br />
            <span className="text-foreground">Cero Sorpresas.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Cada requerimiento del RFP con la respuesta detallada de SYSDE — desglosado, medido y verificable.
          </p>
        </motion.div>

        <Tabs defaultValue="resumen" className="max-w-5xl mx-auto">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="resumen" className="text-xs">📋 Resumen Ejecutivo</TabsTrigger>
            <TabsTrigger value="funcional" className="text-xs">⚙️ Funcionales ({FUNCTIONAL_REQUIREMENTS.reduce((a, c) => a + c.items.filter(i => !i.isGroup).length, 0)})</TabsTrigger>
            <TabsTrigger value="tecnico" className="text-xs">🔧 Técnicos ({TECHNICAL_REQUIREMENTS.reduce((a, c) => a + c.items.filter(i => !i.isGroup).length, 0)})</TabsTrigger>
            <TabsTrigger value="empresa" className="text-xs">🏢 Empresa & SLA</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="mt-6 space-y-6">
            <ExecutiveSummary />
            <Card className="p-5 bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <h4 className="text-sm font-bold text-foreground">Pregunta lo que necesites sobre el RFP</h4>
              </div>
              <ChatAssistant />
            </Card>
          </TabsContent>

          <TabsContent value="funcional" className="mt-6 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-200 text-[10px]">STD = Estándar</Badge>
                <Badge className="bg-amber-500/15 text-amber-700 border-amber-200 text-[10px]">CUS = Personalizable</Badge>
                <Badge className="bg-blue-500/15 text-blue-700 border-blue-200 text-[10px]">NR = Release futuro</Badge>
                <Badge className="bg-purple-500/15 text-purple-700 border-purple-200 text-[10px]">THR = Vía tercero</Badge>
              </div>
              <SysdeHint variant="icon-only" />
            </div>
            {FUNCTIONAL_REQUIREMENTS.map((cat) => (
              <CollapsibleCategory key={cat.id} cat={cat} type="func" />
            ))}
          </TabsContent>

          <TabsContent value="tecnico" className="mt-6 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-200 text-[10px]">Compliant = Cumple</Badge>
                <Badge className="bg-amber-500/15 text-amber-700 border-amber-200 text-[10px]">Partial = Parcial</Badge>
              </div>
              <SysdeHint variant="icon-only" />
            </div>
            {TECHNICAL_REQUIREMENTS.map((cat) => (
              <CollapsibleCategory key={cat.id} cat={cat} type="tech" />
            ))}
          </TabsContent>

          <TabsContent value="empresa" className="mt-6 space-y-4">
            <Card className="p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3">Annex 3 — Datos de la Empresa</h4>
              <div className="space-y-2">
                {COMPANY_DETAILS.map((item, i) => (
                  <div key={i} className="text-xs py-2 border-b border-border/50 last:border-0">
                    <div className="font-medium text-foreground mb-1">{item.question}</div>
                    <div className="text-muted-foreground whitespace-pre-line">{item.answer}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3">Annex 4 — SLAs</h4>
              <div className="space-y-2">
                {SLA_DETAILS.map((item, i) => (
                  <div key={i} className="text-xs py-2 border-b border-border/50 last:border-0">
                    <div className="font-medium text-foreground mb-1">{item.question}</div>
                    <div className="text-muted-foreground whitespace-pre-line">{item.answer}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default RfpSection;
