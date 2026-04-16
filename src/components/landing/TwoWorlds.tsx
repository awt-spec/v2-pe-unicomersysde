import { motion } from "framer-motion";
import {
  ShoppingCart, Smartphone, Zap, Briefcase,
  CreditCard, Wallet,
} from "lucide-react";
import SysdeHint from "./SysdeHint";

const retailItems = [
  { icon: ShoppingCart, text: "Crédito al consumo masivo" },
  { icon: Briefcase, text: "Crédito comercial y PYME" },
  { icon: Smartphone, text: "Integración con puntos de venta" },
  { icon: Zap, text: "Alto volumen de transacciones" },
];

const tarjetasItems = [
  { icon: CreditCard, text: "Tarjeta de crédito cerrada (marca propia)" },
  { icon: CreditCard, text: "Tarjeta de crédito abierta (Visa / Mastercard)" },
  { icon: Wallet, text: "Tarjeta de débito sobre cuentas de ahorro" },
  { icon: Wallet, text: "Cuentas corrientes integradas" },
];

const TwoWorlds = () => (
  <section id="dosmundos" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Nosotros te resolvemos tus <span className="text-accent">dos mundos</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl border border-border p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ShoppingCart size={20} className="text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Crédito Retail</h3>
          </div>
          <ul className="space-y-4">
            {retailItems.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <item.icon size={18} className="text-accent shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl border border-border p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
              <CreditCard size={20} className="text-[#3B82F6]" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Tarjetas</h3>
          </div>
          <ul className="space-y-4">
            {tarjetasItems.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <item.icon size={18} className="text-[#3B82F6] shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="flex justify-center mt-8">
        <SysdeHint variant="inline" text="Pregunta sobre Retail vs Tarjetas" />
      </div>
    </div>
  </section>
);

export default TwoWorlds;
