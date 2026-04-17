import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Server, Scale, ChevronDown, CalendarClock, Wallet, FileSignature } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";
import { implementationBreakdownI18n } from "./implementationBreakdownData";
import ClauseMultiEntity from "./clauses/ClauseMultiEntity";

const fmtUSD = (n: number) =>
  `USD $${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function ImplementationBreakdown() {
  const { lang } = useT();
  const data = implementationBreakdownI18n[lang];

  return (
    <div className="space-y-12 mt-10 pt-10 border-t-2 border-dashed border-border">
      {/* ========= 1. Desglose Implementación ========= */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-5 w-5 text-accent" />
          <h3 className="text-xl font-bold text-foreground">
            {lang === "es" ? "Desglose del costo único de implementación" : "One-time implementation cost breakdown"}
          </h3>
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

      {/* ========= 2. Cláusula comercial — Facturación multi-entidad (colapsable) ========= */}
      <section>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
            <Scale className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {lang === "es" ? "Cláusula comercial — Facturación multi-entidad" : "Commercial clause — Multi-entity billing"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {lang === "es"
              ? "Configura cómo se factura el costo único de implementación entre las entidades fiscales del grupo Unicomer. Las cláusulas de volumen, escala de grupo y la facturación multi-entidad de la licencia recurrente están en los tabs On-Premise y SaaS Cloud del Anexo."
              : "Configure how the one-time implementation cost is billed across Unicomer group's tax entities. Volume / group-scale clauses and multi-entity billing of the recurring license live in the On-Premise and SaaS Cloud tabs of the Annex."}
          </p>
        </div>

        <ClauseMultiEntityToggle />
      </section>
    </div>
  );
}

// Toggle con CTA explícito "Ver detalle / Ocultar detalle" + animación suave
function ClauseMultiEntityToggle() {
  const { lang } = useT();
  const [open, setOpen] = useState(true);
  const ctaOpen = lang === "es" ? "Ocultar detalle" : "Hide detail";
  const ctaClosed = lang === "es" ? "Ver detalle" : "View detail";

  return (
    <div className="rounded-xl border border-border bg-muted/20 overflow-hidden transition-colors hover:border-accent/40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/40 transition-colors text-left"
      >
        <div className="min-w-0">
          <div className="font-semibold text-sm text-foreground truncate">
            {lang === "es"
              ? "Cláusula 3 — Facturación multi-entidad del costo único de implementación"
              : "Clause 3 — Multi-entity billing of the one-time implementation cost"}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
            {lang === "es"
              ? "Reparte el monto único de USD $1,205,000 entre las entidades fiscales que Unicomer defina"
              : "Split the one-time USD $1,205,000 amount across the tax entities Unicomer defines"}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors ${
            open ? "bg-accent/10 text-accent" : "bg-accent text-accent-foreground"
          }`}>
            {open ? ctaOpen : ctaClosed}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex"
          >
            <ChevronDown className={`h-4 w-4 ${open ? "text-accent" : "text-muted-foreground"}`} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2 border-t border-border/60">
              <ClauseMultiEntity />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
