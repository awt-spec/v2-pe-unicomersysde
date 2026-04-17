import { motion } from "framer-motion";
import { Globe, Layers } from "lucide-react";
import { useT } from "@/i18n/LanguageContext";
import { saasDeploymentOptionsI18n } from "./implementationBreakdownData";

export default function SaasOptionsCard() {
  const { lang } = useT();
  const saas = saasDeploymentOptionsI18n[lang];

  return (
    <section className="mt-8">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {opt.tag}
              </span>
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
  );
}
