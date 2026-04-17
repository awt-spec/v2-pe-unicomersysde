import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Apple-style cinematic announcement banner with scroll-driven transitions.
 * - Pinned scroll feel via long min-height + sticky inner content
 * - Parallax on background wash
 * - Staggered blur-to-sharp word reveal driven by scroll progress
 * - Subtle scale/opacity fade-out on exit
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const PricingHeroAnnouncement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Track when the banner enters → exits the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background wash — slowly drifts and intensifies on entry, fades on exit
  const washOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 1, 1, 0.2]);
  const washScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.05, 1.2]);
  const washY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  // Eyebrow — fades in early, drifts up & out
  const eyebrowOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.55, 0.75], [0, 1, 1, 0]);
  const eyebrowY = useTransform(scrollYProgress, [0.05, 0.25], [16, 0]);

  // Headline word 1 — "Propuesta"
  const w1Opacity = useTransform(scrollYProgress, [0.12, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
  const w1Blur = useTransform(scrollYProgress, [0.12, 0.32], [20, 0]);
  const w1Y = useTransform(scrollYProgress, [0.12, 0.32, 0.7, 0.9], [40, 0, 0, -30]);

  // Headline word 2 — "Económica"
  const w2Opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.85], [0, 1, 1, 0]);
  const w2Blur = useTransform(scrollYProgress, [0.2, 0.42], [20, 0]);
  const w2Y = useTransform(scrollYProgress, [0.2, 0.42, 0.7, 0.9], [40, 0, 0, -30]);

  // Subline — last to appear, lingers, then fades
  const subOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.7, 0.82], [0, 1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0.32, 0.5], [20, 0]);

  // Hairline scaleX
  const lineScale = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.42, 0.55, 0.75, 0.85], [0, 1, 1, 0]);

  // Whole stage — gentle scale "breath" so content feels alive
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.02]);

  // Filter strings (combine blur into CSS filter)
  const w1Filter = useTransform(w1Blur, (v) => `blur(${v}px)`);
  const w2Filter = useTransform(w2Blur, (v) => `blur(${v}px)`);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ minHeight: reduce ? "auto" : "180vh" }}
    >
      {/* Sticky stage — content stays pinned while user scrolls past */}
      <div
        className={cn(
          "sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden",
          reduce && "static h-auto py-32"
        )}
      >
        {/* Background radial wash with parallax */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: reduce ? 1 : washOpacity,
            scale: reduce ? 1 : washScale,
            y: reduce ? 0 : washY,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--accent) / 0.12), transparent 70%)",
          }}
        />

        {/* Soft top/bottom fade so banner blends into surrounding sections */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-background to-transparent"
        />

        <motion.div
          className="relative max-w-6xl mx-auto px-6 text-center"
          style={{ scale: reduce ? 1 : stageScale }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-muted-foreground/70 font-medium mb-8"
            style={{
              opacity: reduce ? 1 : eyebrowOpacity,
              y: reduce ? 0 : eyebrowY,
            }}
          >
            Capítulo Final
          </motion.p>

          {/* Headline */}
          <h2 className="font-display font-semibold text-foreground tracking-[-0.04em] leading-[0.95] text-[14vw] md:text-[8.5rem] lg:text-[10rem]">
            <motion.span
              className="inline-block mr-[0.25em]"
              style={{
                opacity: reduce ? 1 : w1Opacity,
                filter: reduce ? "none" : w1Filter,
                y: reduce ? 0 : w1Y,
              }}
            >
              Propuesta
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent"
              style={{
                opacity: reduce ? 1 : w2Opacity,
                filter: reduce ? "none" : w2Filter,
                y: reduce ? 0 : w2Y,
              }}
            >
              Económica
            </motion.span>
          </h2>

          {/* Subline */}
          <motion.p
            className="mt-10 md:mt-14 text-lg md:text-2xl text-muted-foreground font-light tracking-tight max-w-2xl mx-auto leading-snug"
            style={{
              opacity: reduce ? 1 : subOpacity,
              y: reduce ? 0 : subY,
            }}
          >
            Una inversión. Una plataforma.
            <br className="hidden md:block" />
            <span className="text-foreground/80"> Todos los países.</span>
          </motion.p>

          {/* Hairline */}
          <motion.div
            className="mx-auto mt-16 h-px w-16 bg-foreground/20 origin-center"
            style={{
              scaleX: reduce ? 1 : lineScale,
              opacity: reduce ? 1 : lineOpacity,
            }}
          />

          {/* Scroll affordance — gently bobs while banner is in early state */}
          {!reduce && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[-4rem] flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 0]),
              }}
            >
              <span>Scroll</span>
              <motion.span
                className="block h-6 w-px bg-muted-foreground/40"
                animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PricingHeroAnnouncement;
