import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, SlidersHorizontal, Infinity, Trophy } from "lucide-react";

const principles = [
  {
    icon: Layers,
    number: "01",
    title: "Divide y Vencerás",
    body: "Nos apalancamos en tres pilares: infraestructura tercerizada de clase mundial, SAF+ como core crediticio robusto y tu equipo humano potenciado con soporte ilimitado de SYSDE.",
  },
  {
    icon: SlidersHorizontal,
    number: "02",
    title: "Flexibilidad",
    body: "Nos adaptamos a tus necesidades, no al revés. Flexibilidad total en el servicio, sin fricciones, sin rigidez. Evolución continua a tu ritmo.",
  },
  {
    icon: Infinity,
    number: "03",
    title: "Abundancia",
    body: "Usuarios, transacciones y países ilimitados. Un precio fijo anual. Sin sorpresas ni costos ocultos.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "Experiencia comprobada",
    body: "Contamos con experiencia en implementaciones exitosas en la región. Sabemos cómo ejecutar proyectos de esta escala.",
  },
];

const formulaParts = [
  { label: "Core Robusto", sub: "SAF+" },
  { label: "Equipo Humano", sub: "Unicomer + SYSDE" },
  { label: "Flexibilidad", sub: "Total" },
];

const PrincipleCard = ({ p }: { p: (typeof principles)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-border bg-card overflow-hidden group hover:border-accent/20 transition-colors duration-500"
      >
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute left-0 top-0 w-1 bg-accent rounded-full"
        />
        <div className="flex items-center gap-6 px-8 py-6 md:px-10 md:py-7">
          <span className="font-display text-3xl font-black text-accent/15 shrink-0 w-12 text-center">
            {p.number}
          </span>
          <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/10 flex items-center justify-center shrink-0">
            <p.icon className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base md:text-lg font-bold text-foreground">
              {p.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mt-0.5">
              {p.body}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FormulaReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className="mt-10 mb-14">
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center text-muted-foreground/60 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 font-medium"
      >
        La fórmula del éxito
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-accent/12 bg-card/60 backdrop-blur-sm px-4 py-6 md:px-10 md:py-8 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/3 pointer-events-none"
        />

        {/* Decorative top/bottom lines like a formal equation */}
        <div className="absolute top-2 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        <div className="absolute bottom-2 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        <div className="relative flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4">
          {/* Opening parenthesis */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-foreground/30 font-light text-2xl sm:text-3xl md:text-4xl select-none"
          >
            (
          </motion.span>

          {formulaParts.map((part, i) => (
            <div key={part.label} className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center min-w-0"
              >
                <span className="font-display text-sm sm:text-base md:text-xl font-black text-foreground tracking-tight whitespace-nowrap">
                  {part.label}
                </span>
                <span className="text-muted-foreground text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.15em] mt-0.5 whitespace-nowrap">
                  {part.sub}
                </span>
              </motion.div>

              {/* After Equipo Humano (index 1), close parenthesis then multiply */}
              {i === 1 && (
                <>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="text-foreground/30 font-light text-2xl sm:text-3xl md:text-4xl select-none"
                  >
                    )
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="text-accent/50 font-serif text-lg sm:text-xl md:text-2xl select-none italic"
                  >
                    ×
                  </motion.span>
                </>
              )}

              {/* Between Core Robusto and Equipo Humano, show + */}
              {i === 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-accent/50 font-serif text-lg sm:text-xl md:text-2xl select-none italic"
                >
                  +
                </motion.span>
              )}
            </div>
          ))}

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="text-accent/50 font-serif text-lg sm:text-xl md:text-2xl select-none italic mx-0.5"
          >
            =
          </motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
            animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center relative"
          >
            <div className="absolute inset-0 bg-accent/8 blur-2xl rounded-full scale-150 pointer-events-none" />
            <span className="relative font-display text-lg sm:text-xl md:text-2xl font-black text-accent tracking-tight">
              99.99%
            </span>
            <span className="relative text-accent/70 text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.15em] mt-0.5 font-semibold whitespace-nowrap">
              Probabilidad de éxito
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const WhySysdeHero = () => (
  <section className="py-24 md:py-28 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-6"
      >
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
          ¿Por qué{" "}
          <span className="text-accent">SYSDE</span>?
        </h2>
      </motion.div>

      {/* Formula */}
      <FormulaReveal />

      {/* Cards */}
      <div className="space-y-3">
        {principles.map((p) => (
          <PrincipleCard key={p.number} p={p} />
        ))}
      </div>
    </div>
  </section>
);

export default WhySysdeHero;
