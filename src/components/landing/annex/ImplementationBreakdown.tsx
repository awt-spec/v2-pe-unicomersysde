import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Server, Layers, Globe, FileText, Scale, Receipt, ChevronRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useT } from "@/i18n/LanguageContext";
import {
  implementationBreakdownI18n,
  saasDeploymentOptionsI18n,
  commercialClausesI18n,
} from "./implementationBreakdownData";

const fmtUSD = (n: number) =>
  `USD $${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function ImplementationBreakdown() {
  const { lang } = useT();
  const data = implementationBreakdownI18n[lang];
  const saas = saasDeploymentOptionsI18n[lang];
  const clauses = commercialClausesI18n[lang];
  const [openClauses, setOpenClauses] = useState(false);

  return (
    <div className="space-y-12 mt-10 pt-10 border-t-2 border-dashed border-border">
      {/* ========= 1. Desglose Implementación ========= */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-5 w-5 text-accent" />
          <h3 className="text-xl font-bold text-foreground">{t("annex.impl.breakdown.title")}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{data.intro}</p>

        <div className="space-y-6">
          {data.blocks.map((block, bi) => (
            <motion.div
              key={bi}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: bi * 0.1 }}
              className="rounded-xl overflow-hidden border-2 border-accent/30 shadow-sm"
            >
              <div className="bg-accent text-accent-foreground px-5 py-3">
                <div className="flex items-center gap-2">
                  {bi === 0 ? <Server className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  <h4 className="font-bold text-sm tracking-wide uppercase">{block.header}</h4>
                </div>
              </div>

              <div className="divide-y divide-border bg-background">
                {block.items.map((item, ii) => (
                  <div key={ii} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-5 hover:bg-muted/30 transition-colors">
                    <div>
                      <h5 className="font-bold text-foreground text-sm mb-2">{item.title}</h5>
                      <ul className="space-y-1">
                        {item.bullets.map((b, bj) => (
                          <li key={bj} className="text-xs text-muted-foreground flex gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex md:items-center md:justify-end">
                      <span className="font-mono font-semibold text-sm text-foreground tabular-nums">
                        {fmtUSD(item.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-accent/10 border-t-2 border-accent px-5 py-3 flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wide text-accent">{block.subtotal.label}:</span>
                <span className="font-mono font-bold text-sm text-accent tabular-nums">{fmtUSD(block.subtotal.amount)}</span>
              </div>
            </motion.div>
          ))}

          {/* Grand Total */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl bg-gradient-to-r from-accent via-accent to-accent/80 text-accent-foreground p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-lg"
          >
            <span className="font-bold uppercase tracking-wide text-sm md:text-base">{data.grandTotal.label}:</span>
            <span className="font-mono font-bold text-2xl md:text-3xl tabular-nums">{fmtUSD(data.grandTotal.amount)}</span>
          </motion.div>
        </div>
      </section>

      {/* ========= 2. Definición Crédito Activo ========= */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-accent" />
          <h3 className="text-xl font-bold text-foreground">{credit.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{credit.intro}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-lg border-2 border-success/30 bg-success/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h4 className="font-bold text-sm text-foreground">{credit.isActive.title}</h4>
            </div>
            <ul className="space-y-2">
              {credit.isActive.items.map((it, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-success mt-0.5 shrink-0">▸</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border-2 border-destructive/30 bg-destructive/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-5 w-5 text-destructive" />
              <h4 className="font-bold text-sm text-foreground">{credit.isNotActive.title}</h4>
            </div>
            <ul className="space-y-2">
              {credit.isNotActive.items.map((it, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-destructive mt-0.5 shrink-0">▸</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lifecycle */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-foreground text-background px-4 py-3 flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            <h4 className="font-bold text-sm">{credit.lifecycle.title}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground w-12">{t("annex.impl.lifecycle.code")}</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">{t("annex.impl.lifecycle.state")}</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">{t("annex.impl.lifecycle.desc")}</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-muted-foreground w-24">{t("annex.impl.lifecycle.billable")}</th>
                </tr>
              </thead>
              <tbody>
                {credit.lifecycle.states.map((s, i) => (
                  <tr key={i} className="border-t border-border/50 hover:bg-muted/30">
                    <td className="px-3 py-2 text-xs font-mono text-muted-foreground">{s.code}</td>
                    <td className="px-3 py-2 text-xs font-semibold text-foreground">{s.name}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{s.desc}</td>
                    <td className="px-3 py-2 text-center">
                      {s.billable ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                          <CheckCircle2 className="h-3 w-3" /> {t("annex.impl.lifecycle.yes")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                          <XCircle className="h-3 w-3" /> {t("annex.impl.lifecycle.no")}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========= 3. Opciones SaaS ========= */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-5 w-5 text-accent" />
          <h3 className="text-xl font-bold text-foreground">{saas.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{saas.intro}</p>

        <div className="grid md:grid-cols-3 gap-4">
          {saas.options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border-2 border-border hover:border-accent/50 transition-colors p-5 bg-gradient-to-br from-background to-muted/20"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">{opt.tag}</span>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </div>
              <h4 className="font-bold text-foreground text-base mb-2">{opt.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{opt.desc}</p>
              <div className="pt-3 border-t border-border">
                <span className="text-xs font-mono font-bold text-accent">{opt.instances}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic mt-4 text-center">{saas.footer}</p>
      </section>

      {/* ========= 4. Cláusulas comerciales (popup) ========= */}
      <section>
        <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-background to-accent/5 p-6 md:p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <Scale className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{clauses.title}</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto leading-relaxed">{clauses.intro}</p>

          <Dialog open={openClauses} onOpenChange={setOpenClauses}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <FileText className="h-4 w-4" />
                {lang === "es" ? "Ver cláusulas detalladas" : "View detailed clauses"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-hidden">
              <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
                <DialogTitle className="text-xl flex items-center gap-2">
                  <Scale className="h-5 w-5 text-accent" />
                  {clauses.title}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed pt-1">
                  {clauses.intro}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[60vh] px-6 py-5">
                <div className="space-y-4">
                  {clauses.clauses.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-card p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-base">
                          {c.num}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground text-base mb-2 flex items-center gap-2">
                            {i === 2 ? <Receipt className="h-4 w-4 text-accent" /> : null}
                            {c.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.body}</p>
                          {c.highlight && (
                            <div className="inline-block px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                              <span className="text-xs font-semibold text-accent">{c.highlight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
