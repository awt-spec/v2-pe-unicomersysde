import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, XCircle, GitBranch, ChevronDown } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";
import { creditDefinitionI18n } from "./implementationBreakdownData";

export default function CreditDefinitionCard() {
  const { lang, t } = useT();
  const credit = creditDefinitionI18n[lang];
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-background to-background overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-accent/5 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-base">{credit.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "es"
                ? "Definición contractual · Estados facturables · Ciclo de vida completo"
                : "Contractual definition · Billable states · Full lifecycle"}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{credit.intro}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="rounded-lg border-2 border-success/30 bg-success/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <h5 className="font-bold text-sm text-foreground">{credit.isActive.title}</h5>
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

                <div className="rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <h5 className="font-bold text-sm text-foreground">{credit.isNotActive.title}</h5>
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

              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-foreground text-background px-4 py-2.5 flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  <h5 className="font-bold text-sm">{credit.lifecycle.title}</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground w-12">
                          {t("annex.impl.lifecycle.code")}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">
                          {t("annex.impl.lifecycle.state")}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">
                          {t("annex.impl.lifecycle.desc")}
                        </th>
                        <th className="px-3 py-2 text-center text-xs font-semibold text-muted-foreground w-24">
                          {t("annex.impl.lifecycle.billable")}
                        </th>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
