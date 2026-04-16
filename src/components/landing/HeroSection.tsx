import { motion } from "framer-motion";
import { ArrowDown, Lightbulb } from "lucide-react";
import { openSysdeChat } from "./FloatingChat";

const HeroSection = () => (
  <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
    {/* Deep, rich background */}
    <div className="absolute inset-0 bg-primary" />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(352 73% 30% / 0.6) 0%, transparent 70%)",
      }}
    />

    <div className="container mx-auto px-4 relative z-10 pt-28 pb-28">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline — whisper before the shout */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-accent font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-8"
        >
          Core Crediticio · Clase Mundial
        </motion.p>

        {/* Headline — bold, clear, unmistakable */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.08] mb-4 tracking-tight"
        >
          La <span className="text-accent">nueva</span> era de la
          <br />
          <span className="text-accent">abundancia</span> para Unicomer.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-primary-foreground/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-8"
        >
          Todos los países donde operen. Ilimitado. Sin costo adicional.
        </motion.p>

        {/* Alcance nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center justify-center gap-3 md:gap-6 mb-12"
        >
          {[
            { label: "Módulos", href: "#modulos" },
            { label: "Modelo Ilimitado", href: "#ilimitado" },
            { label: "Precio", href: "#pricing" },
          ].map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors"
            >
              <span className="w-6 h-6 rounded-full border border-primary-foreground/30 group-hover:border-accent flex items-center justify-center text-xs font-bold transition-colors">
                {i + 1}
              </span>
              <span className="text-sm md:text-base font-medium">{item.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex flex-col items-center"
        >
          <a
            href="#alcance"
            className="flex flex-col items-center gap-2 text-primary-foreground/40 hover:text-accent transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Explorar</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
