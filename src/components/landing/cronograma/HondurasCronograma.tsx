import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, PencilRuler, Settings, RefreshCw, FlaskConical,
  GraduationCap, Flag, CreditCard, Users, Monitor,
  ArrowDownCircle, TrendingUp, Banknote, Zap,
  Building2, LifeBuoy, Shield, BarChart3, Plug,
  CheckCircle2, ChevronLeft, ChevronRight, X, Target,
  Cloud, Server,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HONDURAS_DRIVERS, PHASE_SAVINGS, COMPROMISOS, LIC_FEATURES,
  buildFases, getDeployConfig,
} from "./data";
import type { DeployMode, Fase } from "./types";

const PHASE_ICONS: Record<string, React.ElementType> = {
  rocket: Rocket, "pencil-ruler": PencilRuler, settings: Settings,
  "refresh-cw": RefreshCw, "flask-conical": FlaskConical,
  "graduation-cap": GraduationCap, flag: Flag,
};

const DRIVER_ICONS: Record<string, React.ElementType> = {
  "credit-card": CreditCard, users: Users, monitor: Monitor,
  "arrow-down-circle": ArrowDownCircle, "trending-up": TrendingUp,
  banknote: Banknote, zap: Zap,
};

const LIC_ICONS: Record<string, React.ElementType> = {
  users: Users, "building-2": Building2, "life-buoy": LifeBuoy,
  "refresh-cw": RefreshCw, shield: Shield, "bar-chart-3": BarChart3,
  plug: Plug,
};

const RISK_COLORS: Record<string, string> = {
  ALTO: "bg-destructive/80 text-destructive-foreground",
  MEDIO: "bg-warning/80 text-warning-foreground",
  BAJO: "bg-success/80 text-white",
};

const HondurasCronograma = () => {
  const [mode, setMode] = useState<DeployMode>("saas");
  const [validated, setValidated] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("hn-validated");
      if (saved) return JSON.parse(saved);
    } catch {}
    const init: Record<string, boolean> = {};
    COMPROMISOS.forEach((c) => (init[c.codigo] = true));
    return init;
  });
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [phaseTab, setPhaseTab] = useState<"tareas" | "entregables">("tareas");

  const fases = useMemo(() => buildFases(mode), [mode]);
  const config = useMemo(() => getDeployConfig(mode), [mode]);

  const toggleGroup = useCallback((codigos: string[]) => {
    setValidated((prev) => {
      const allOn = codigos.every((c) => prev[c]);
      const next = { ...prev };
      codigos.forEach((c) => (next[c] = !allOn));
      localStorage.setItem("hn-validated", JSON.stringify(next));
      return next;
    });
  }, []);

  const mesesAhorrados = useMemo(() => {
    let total = 0;
    PHASE_SAVINGS.forEach((g) => {
      const codes = mode === "saas" ? g.codigos.saas : g.codigos.onprem;
      if (codes.every((c) => validated[c])) {
        total += mode === "saas" ? g.mesesSaas : g.mesesOnprem;
      }
    });
    return total;
  }, [validated, mode]);

  const currentMonths = 24 - mesesAhorrados;
  const activeFase = fases.find((f) => f.id === selectedPhase) ?? null;

  return (
    <section id="cronograma" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Planning de Implementación
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-2">
            Cronograma Honduras
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Ejercicio interactivo de aceleración — valida compromisos para reducir el tiempo de implementación.
          </p>
        </motion.div>

        {/* Deploy mode toggle */}
        <div className="flex justify-center gap-3 mb-8">
          {([
            { key: "saas" as const, label: "SaaS / Cloud", Icon: Cloud },
            { key: "onpremise" as const, label: "On-Premise", Icon: Server },
          ]).map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all",
                mode === key
                  ? "bg-accent text-accent-foreground border-accent shadow-md"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/20"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Drivers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-10"
        >
          {HONDURAS_DRIVERS.map((d) => {
            const Icon = DRIVER_ICONS[d.icon] ?? Zap;
            return (
              <div key={d.label} className="bg-card rounded-xl border border-border p-3 text-center">
                <Icon className="h-5 w-5 mx-auto text-accent mb-1" />
                <p className="font-bold text-foreground text-sm">{d.value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{d.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Acceleration exercise */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border shadow-sm p-5 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-5 w-5 text-accent" />
                <h3 className="font-display font-bold text-foreground text-lg">
                  Ejercicio de Aceleración
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Activa o desactiva grupos de compromisos para ver el impacto en el cronograma.
              </p>
            </div>
            <div className="flex items-center gap-6 bg-muted/50 rounded-xl px-5 py-3 border border-border/50">
              <div className="text-center">
                <span className="block text-3xl font-bold text-muted-foreground line-through decoration-2">24</span>
                <span className="text-[10px] text-muted-foreground">estándar</span>
              </div>
              <ChevronRight className="h-5 w-5 text-accent animate-pulse" />
              <div className="text-center">
                <span className={cn("block text-4xl font-bold", mesesAhorrados > 0 ? "text-success" : "text-foreground")}>
                  {currentMonths}
                </span>
                <span className="text-[10px] text-muted-foreground">meses</span>
              </div>
              {mesesAhorrados > 0 && (
                <span className="text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                  −{mesesAhorrados} meses
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Ahorro acumulado: {mesesAhorrados} meses</span>
              <span>{currentMonths} de 24 meses</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full transition-colors", mesesAhorrados > 8 ? "bg-success" : "bg-accent")}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((mesesAhorrados / 12) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Saving groups */}
          <div className="space-y-2">
            {PHASE_SAVINGS.map((g) => {
              const codes = mode === "saas" ? g.codigos.saas : g.codigos.onprem;
              const meses = mode === "saas" ? g.mesesSaas : g.mesesOnprem;
              const allOn = codes.every((c) => validated[c]);
              const relatedCompromisos = COMPROMISOS.filter((c) => codes.includes(c.codigo));

              return (
                <div key={g.grupo} className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => toggleGroup(codes)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 transition-all text-left",
                      allOn ? "bg-success/5 hover:bg-success/10" : "bg-card hover:bg-muted/40"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                      allOn ? "bg-success border-success" : "border-muted-foreground/30"
                    )}>
                      {allOn && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-foreground flex-1">{g.grupo}</span>
                    <span className={cn(
                      "text-xs font-bold px-2.5 py-1 rounded-full",
                      allOn ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                    )}>
                      −{meses} mes{meses > 1 ? "es" : ""}
                    </span>
                  </button>
                  <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
                    <div className="flex flex-wrap gap-1.5">
                      {relatedCompromisos.map((c) => (
                        <span
                          key={c.codigo}
                          className={cn(
                            "text-[10px] font-medium px-2 py-0.5 rounded-full",
                            validated[c.codigo] ? RISK_COLORS[c.riesgo] : "bg-muted text-muted-foreground"
                          )}
                          title={c.titulo}
                        >
                          {c.codigo} · {c.riesgo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Mini Gantt */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border shadow-sm p-5 md:p-8 mb-8"
        >
          <h3 className="font-display font-bold text-foreground text-lg mb-5">
            Cronograma — {config.label}
          </h3>

          {/* Month headers */}
          <div className="mb-2 flex items-end">
            <div className="w-44 shrink-0" />
            <div className="flex-1 flex">
              {Array.from({ length: 14 }, (_, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className="text-[9px] text-muted-foreground font-medium">M{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-1">
            {fases.map((f) => {
              const Icon = PHASE_ICONS[f.icon] ?? Rocket;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedPhase(selectedPhase === f.id ? null : f.id)}
                  className={cn(
                    "w-full flex items-center rounded-lg py-2 px-2 transition-all hover:bg-muted/40",
                    selectedPhase === f.id && "bg-accent/5 ring-1 ring-accent/40"
                  )}
                >
                  <div className="w-44 shrink-0 flex items-center gap-2">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", f.bg)}>
                      <Icon className={cn("h-3.5 w-3.5", f.color)} />
                    </div>
                    <span className="text-xs font-medium text-foreground truncate">{f.nombre}</span>
                  </div>
                  <div className="flex-1 relative h-7">
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: 14 }, (_, i) => (
                        <div key={i} className="flex-1 border-l border-border/20" />
                      ))}
                    </div>
                    <motion.div
                      className={cn("absolute top-1 h-5 rounded-md", f.bg, "border", f.color.replace("text-", "border-") + "/30")}
                      style={{
                        left: `${(f.barStart / 14) * 100}%`,
                        width: `${((f.barEnd - f.barStart) / 14) * 100}%`,
                      }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-foreground/70">
                        {f.periodo}
                      </span>
                    </motion.div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Month labels bottom */}
          <div className="flex items-center mt-2">
            <div className="w-44 shrink-0" />
            <div className="flex-1 flex">
              {Array.from({ length: 14 }, (_, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className="text-[8px] text-muted-foreground/50">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparativa */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border border-border p-6 text-center"
          >
            <span className="text-muted-foreground text-xs uppercase tracking-widest font-medium">Estándar</span>
            <p className="text-5xl font-bold text-muted-foreground/60 mt-3">24</p>
            <p className="text-sm text-muted-foreground mt-1">meses</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border-2 border-success bg-success/5 p-6 text-center"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Con Compromisos</span>
            <p className="text-5xl font-bold mt-3 text-success">
              {currentMonths}
            </p>
            <p className="text-sm text-muted-foreground mt-1">meses</p>
            {mesesAhorrados > 0 && (
              <p className="text-xs text-success font-medium mt-2">
                {mesesAhorrados} meses ahorrados
              </p>
            )}
          </motion.div>
        </div>

        {/* Phase Detail / Licensing */}
        <AnimatePresence mode="wait">
          {activeFase ? (
            <motion.div
              key={activeFase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-5 md:p-8 mb-8"
            >
              <PhaseDetail
                fase={activeFase}
                tab={phaseTab}
                setTab={setPhaseTab}
                onClose={() => setSelectedPhase(null)}
                onPrev={() => {
                  const idx = fases.findIndex((f) => f.id === activeFase.id);
                  if (idx > 0) setSelectedPhase(fases[idx - 1].id);
                }}
                onNext={() => {
                  const idx = fases.findIndex((f) => f.id === activeFase.id);
                  if (idx < fases.length - 1) setSelectedPhase(fases[idx + 1].id);
                }}
                fases={fases}
              />
            </motion.div>
          ) : (
            <motion.div
              key="lic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-5 md:p-8 mb-8"
            >
              <h3 className="font-display font-bold text-foreground text-lg mb-4">
                Licenciamiento SAF+
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {LIC_FEATURES.map((f) => {
                  const Icon = LIC_ICONS[f.icon] ?? Shield;
                  return (
                    <div key={f.title} className="bg-muted/50 rounded-xl p-4 border border-border/50 text-center">
                      <Icon className="h-6 w-6 mx-auto text-accent mb-2" />
                      <p className="font-semibold text-foreground text-sm">{f.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase nav dots */}
        <div className="flex justify-center gap-2">
          {fases.map((f) => {
            const Icon = PHASE_ICONS[f.icon] ?? Rocket;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedPhase(selectedPhase === f.id ? null : f.id)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all border",
                  selectedPhase === f.id
                    ? "bg-accent border-accent text-accent-foreground scale-110 shadow-md"
                    : "bg-card border-border text-muted-foreground hover:border-foreground/20"
                )}
                title={f.nombre}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── Phase Detail ── */
function PhaseDetail({
  fase, tab, setTab, onClose, onPrev, onNext, fases,
}: {
  fase: Fase;
  tab: "tareas" | "entregables";
  setTab: (t: "tareas" | "entregables") => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  fases: Fase[];
}) {
  const idx = fases.findIndex((f) => f.id === fase.id);
  const Icon = PHASE_ICONS[fase.icon] ?? Rocket;
  const relCompromisos = COMPROMISOS.filter((c) => fase.compromisos.includes(c.codigo));

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", fase.bg)}>
            <Icon className={cn("h-5 w-5", fase.color)} />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-lg">{fase.nombre}</h3>
            <span className="text-xs text-muted-foreground">{fase.periodo} · {fase.responsables}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrev}
            disabled={idx === 0}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onNext}
            disabled={idx === fases.length - 1}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg border border-border hover:bg-muted ml-1 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-muted/50 rounded-lg p-1 w-fit">
        {(["tareas", "entregables"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-medium transition-all",
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "tareas" ? "Tareas" : "Entregables"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          {(tab === "tareas" ? fase.tareas : fase.entregables).map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-muted/40 rounded-lg px-3 py-2.5 border border-border/50">
              <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
              <span className="text-xs text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Compromisos Unicomer
          </p>
          <div className="space-y-1.5">
            {relCompromisos.map((c) => (
              <div key={c.codigo} className="bg-muted/40 rounded-lg px-3 py-2.5 border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", RISK_COLORS[c.riesgo])}>
                    {c.codigo}
                  </span>
                  <span className="text-xs font-medium text-foreground">{c.titulo}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{c.descripcion}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-accent/5 rounded-lg p-3 border border-accent/20">
            <div className="flex items-start gap-2">
              <Zap className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
              <p className="text-[11px] text-accent font-medium">{fase.aceleracion}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HondurasCronograma;
