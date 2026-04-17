import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Apple-style cinematic announcement with INTERACTIVE elements:
 *  - Mouse-tracked parallax (3D tilt + orbs follow cursor)
 *  - Floating reactive orbs that respond to pointer
 *  - Scroll-driven blur-to-sharp word reveal
 *  - Animated counters that count when in view
 *  - Hover-reactive metric pills
 */
const EASE = [0.16, 1, 0.3, 1] as const;

/* Animated counter — counts when triggered */
const Counter = ({ to, prefix = "", suffix = "", duration = 1.6 }: { to: number; prefix?: string; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = value.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString("en-US"));
    });
    return unsub;
  }, [value]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => animate(value, to, { duration, ease: EASE })}
      viewport={{ once: true, margin: "-80px" }}
    >
      {prefix}{display}{suffix}
    </motion.span>
  );
};

const PricingHeroAnnouncement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* ───────── SCROLL-DRIVEN ───────── */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const washOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 1, 1, 0.2]);
  const washScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.05, 1.2]);

  const w1Opacity = useTransform(scrollYProgress, [0.08, 0.28, 0.7, 0.85], [0, 1, 1, 0]);
  const w1Blur = useTransform(scrollYProgress, [0.08, 0.3], [20, 0]);
  const w1Y = useTransform(scrollYProgress, [0.08, 0.3, 0.7, 0.9], [40, 0, 0, -30]);

  const w2Opacity = useTransform(scrollYProgress, [0.16, 0.36, 0.7, 0.85], [0, 1, 1, 0]);
  const w2Blur = useTransform(scrollYProgress, [0.16, 0.38], [20, 0]);
  const w2Y = useTransform(scrollYProgress, [0.16, 0.38, 0.7, 0.9], [40, 0, 0, -30]);

  const subOpacity = useTransform(scrollYProgress, [0.3, 0.46, 0.7, 0.82], [0, 1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0.3, 0.48], [20, 0]);

  const pillsOpacity = useTransform(scrollYProgress, [0.42, 0.58, 0.7, 0.82], [0, 1, 1, 0]);
  const pillsY = useTransform(scrollYProgress, [0.42, 0.6], [30, 0]);

  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.02]);

  const w1Filter = useTransform(w1Blur, (v) => `blur(${v}px)`);
  const w2Filter = useTransform(w2Blur, (v) => `blur(${v}px)`);

  /* ───────── MOUSE-DRIVEN ───────── */
  const mx = useMotionValue(0); // -1 → 1
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 });

  const tiltX = useTransform(sy, [-1, 1], [4, -4]); // rotateX
  const tiltY = useTransform(sx, [-1, 1], [-4, 4]); // rotateY

  // Orb parallax derived from cursor
  const orb1X = useTransform(sx, [-1, 1], [-60, 60]);
  const orb1Y = useTransform(sy, [-1, 1], [-40, 40]);
  const orb2X = useTransform(sx, [-1, 1], [80, -80]);
  const orb2Y = useTransform(sy, [-1, 1], [50, -50]);
  const orb3X = useTransform(sx, [-1, 1], [-30, 30]);
  const orb3Y = useTransform(sy, [-1, 1], [60, -60]);

  // Wash follows cursor subtly
  const washX = useTransform(sx, [-1, 1], ["-3%", "3%"]);
  const washY = useTransform(sy, [-1, 1], ["-3%", "3%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mx.set(nx);
    my.set(ny);
  };

  const handleLeave = () => {
    if (reduce) return;
    mx.set(0);
    my.set(0);
  };

  /* Formula tokens — staggered word reveal driven by scroll */
  const f1 = {
    o: useTransform(scrollYProgress, [0.42, 0.55, 0.7, 0.82], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0.42, 0.58], [30, 0]),
    blur: useTransform(scrollYProgress, [0.42, 0.58], [12, 0]),
  };
  const f2 = {
    o: useTransform(scrollYProgress, [0.46, 0.59, 0.7, 0.82], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0.46, 0.62], [30, 0]),
    blur: useTransform(scrollYProgress, [0.46, 0.62], [12, 0]),
  };
  const f3 = {
    o: useTransform(scrollYProgress, [0.5, 0.63, 0.7, 0.82], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0.5, 0.66], [30, 0]),
    blur: useTransform(scrollYProgress, [0.5, 0.66], [12, 0]),
  };
  const f4 = {
    o: useTransform(scrollYProgress, [0.54, 0.67, 0.7, 0.82], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0.54, 0.7], [30, 0]),
    blur: useTransform(scrollYProgress, [0.54, 0.7], [12, 0]),
  };
  const f5 = {
    o: useTransform(scrollYProgress, [0.58, 0.71, 0.74, 0.84], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0.58, 0.74], [30, 0]),
    blur: useTransform(scrollYProgress, [0.58, 0.74], [12, 0]),
  };

  const f1Filter = useTransform(f1.blur, (v) => `blur(${v}px)`);
  const f2Filter = useTransform(f2.blur, (v) => `blur(${v}px)`);
  const f3Filter = useTransform(f3.blur, (v) => `blur(${v}px)`);
  const f4Filter = useTransform(f4.blur, (v) => `blur(${v}px)`);
  const f5Filter = useTransform(f5.blur, (v) => `blur(${v}px)`);


  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ minHeight: reduce ? "auto" : "200vh" }}
    >
      {/* Sticky pinned stage */}
      <div
        className={cn(
          "sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden",
          reduce && "static h-auto py-32"
        )}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Radial wash that drifts with cursor */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: reduce ? 1 : washOpacity,
            scale: reduce ? 1 : washScale,
            x: reduce ? 0 : washX,
            y: reduce ? 0 : washY,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--accent) / 0.14), transparent 70%)",
          }}
        />

        {/* Floating interactive orbs */}
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                top: "12%",
                left: "8%",
                background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)",
                filter: "blur(40px)",
                x: orb1X,
                y: orb1Y,
                opacity: washOpacity,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
              style={{
                bottom: "10%",
                right: "10%",
                background: "radial-gradient(circle, hsl(var(--accent) / 0.12), transparent 70%)",
                filter: "blur(50px)",
                x: orb2X,
                y: orb2Y,
                opacity: washOpacity,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute w-[280px] h-[280px] rounded-full pointer-events-none"
              style={{
                top: "40%",
                right: "20%",
                background: "radial-gradient(circle, hsl(var(--foreground) / 0.05), transparent 70%)",
                filter: "blur(30px)",
                x: orb3X,
                y: orb3Y,
                opacity: washOpacity,
              }}
            />
          </>
        )}

        {/* Top/bottom blends */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-background to-transparent z-10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-background to-transparent z-10" />

        {/* Content stage with 3D tilt */}
        <motion.div
          ref={stageRef}
          className="relative max-w-6xl mx-auto px-6 text-center z-20"
          style={{
            scale: reduce ? 1 : stageScale,
            rotateX: reduce ? 0 : tiltX,
            rotateY: reduce ? 0 : tiltY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Headline — pushed forward in 3D */}
          <h2
            className="font-display font-semibold text-foreground tracking-[-0.04em] leading-[0.95] text-[14vw] md:text-[8.5rem] lg:text-[10rem]"
            style={{ transform: "translateZ(40px)" }}
          >
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
            className="mt-10 md:mt-12 text-lg md:text-2xl text-muted-foreground font-light tracking-tight max-w-2xl mx-auto leading-snug"
            style={{
              opacity: reduce ? 1 : subOpacity,
              y: reduce ? 0 : subY,
              transform: reduce ? undefined : "translateZ(20px)",
            }}
          >
            Una inversión. Una plataforma.
            <br className="hidden md:block" />
            <span className="text-foreground/80"> Todos los países.</span>
          </motion.p>

          {/* Formula: 9 + x = TODOS — Apple-style, interactive (hovers + scroll-driven blur reveal) */}
          <motion.div
            className="mt-14 md:mt-20"
            style={{
              opacity: reduce ? 1 : pillsOpacity,
              y: reduce ? 0 : pillsY,
              transform: reduce ? undefined : "translateZ(30px)",
            }}
          >
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-muted-foreground/60 font-medium mb-8">
              Despliegue multi-país sin límites
            </p>

            <div
              className="flex items-end justify-center gap-6 md:gap-12"
              style={{ fontFamily: "'Cambria Math', 'Latin Modern Math', 'STIX Two Math', Cambria, Georgia, serif" }}
            >
              {/* 9 */}
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.08, y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group relative flex flex-col items-center cursor-default"
                style={{
                  opacity: reduce ? 1 : f1.o,
                  y: reduce ? 0 : f1.y,
                  filter: reduce ? "none" : f1Filter,
                }}
              >
                <div className="absolute inset-0 -m-4 bg-accent/15 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative font-semibold text-accent leading-none tabular-nums tracking-tight text-[5rem] md:text-[8rem]">
                  9
                </span>
                <span className="mt-3 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-sans whitespace-nowrap" style={{ fontFamily: "inherit" }}>
                  países hoy
                </span>
              </motion.div>

              {/* + */}
              <motion.span
                className="text-4xl md:text-6xl font-light text-muted-foreground/50 leading-none pb-10 md:pb-14 select-none"
                style={{
                  opacity: reduce ? 1 : f2.o,
                  y: reduce ? 0 : f2.y,
                  filter: reduce ? "none" : f2Filter,
                }}
              >
                +
              </motion.span>

              {/* x */}
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.08, y: -6, rotate: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group relative flex flex-col items-center cursor-default"
                style={{
                  opacity: reduce ? 1 : f3.o,
                  y: reduce ? 0 : f3.y,
                  filter: reduce ? "none" : f3Filter,
                }}
              >
                <motion.span
                  className="block italic font-semibold text-foreground leading-none tracking-tight text-[5rem] md:text-[8rem]"
                  animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  x
                </motion.span>
                <span className="mt-3 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-sans whitespace-nowrap" style={{ fontFamily: "inherit" }}>
                  países futuros
                </span>
              </motion.div>

              {/* = */}
              <motion.span
                className="text-4xl md:text-6xl font-light text-muted-foreground/50 leading-none pb-10 md:pb-14 select-none"
                style={{
                  opacity: reduce ? 1 : f4.o,
                  y: reduce ? 0 : f4.y,
                  filter: reduce ? "none" : f4Filter,
                }}
              >
                =
              </motion.span>

              {/* TODOS */}
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.06, y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group relative flex flex-col items-center cursor-default"
                style={{
                  opacity: reduce ? 1 : f5.o,
                  y: reduce ? 0 : f5.y,
                  filter: reduce ? "none" : f5Filter,
                }}
              >
                <div className="absolute inset-0 -m-4 bg-accent/20 blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <span
                  className="relative font-bold leading-none tracking-tight pb-2 text-[2.5rem] md:text-[5rem] bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent"
                  style={{ fontFamily: "inherit" }}
                >
                  TODOS
                </span>
                <span className="mt-3 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-sans whitespace-nowrap" style={{ fontFamily: "inherit" }}>
                  ilimitado
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        {!reduce && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 z-20"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.12, 0.25], [0, 1, 0]),
            }}
          >
            <span>Scroll</span>
            <motion.span
              className="block h-6 w-px bg-muted-foreground/40"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              style={{ transformOrigin: "top" }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PricingHeroAnnouncement;
