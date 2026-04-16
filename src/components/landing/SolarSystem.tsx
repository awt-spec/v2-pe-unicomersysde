import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  CreditCard, Smartphone, BarChart3, Settings,
  Shield, Users, BookOpen, SlidersHorizontal,
  Briefcase, ClipboardList, Scale, RefreshCw, Layers,
  Wallet, Building2, MonitorCheck, ShieldCheck, HardDrive,
  LineChart, Lock, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Module = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  ring: number;
  angle: number;
  description: string;
};

const MODULES: Module[] = [
  // Ring 1 — SAF+ Core (10)
  { id: "security", label: "Adm. Seguridad", icon: Shield, color: "hsl(352,73%,44%)", ring: 1, angle: 0, description: "Gestión de usuarios, perfiles, permisos y políticas de seguridad de la plataforma." },
  { id: "policies", label: "Políticas de Negocio", icon: SlidersHorizontal, color: "hsl(352,73%,44%)", ring: 1, angle: 36, description: "Configuración de reglas de negocio, tasas, comisiones, plazos y flujos de aprobación." },
  { id: "clients", label: "Adm. Clientes", icon: Users, color: "hsl(352,73%,44%)", ring: 1, angle: 72, description: "Gestión integral del ciclo de vida del cliente: creación, actualización, segmentación y KYC." },
  { id: "accounting", label: "Contabilidad", icon: BookOpen, color: "hsl(352,73%,44%)", ring: 1, angle: 108, description: "Pólizas contables automáticas, plan de cuentas, cierre contable y reportes financieros." },
  { id: "loans", label: "Préstamos", icon: CreditCard, color: "hsl(352,73%,44%)", ring: 1, angle: 144, description: "HP, revolving, cash loans, microcréditos con tablas de amortización y control de garantías." },
  { id: "cards", label: "Core Tarjetas", icon: Smartphone, color: "hsl(352,73%,44%)", ring: 1, angle: 180, description: "Emisión, activación, bloqueo y gestión del ciclo de vida de tarjetas de crédito y débito." },
  { id: "origination", label: "Originación", icon: ClipboardList, color: "hsl(352,73%,44%)", ring: 1, angle: 216, description: "Flujo completo de solicitud, evaluación crediticia, scoring, aprobación y desembolso." },
  { id: "portfolio", label: "Gestión Cartera", icon: Briefcase, color: "hsl(352,73%,44%)", ring: 1, angle: 252, description: "Administración del portafolio crediticio: aging, clasificación de riesgo y reestructuración." },
  { id: "factoring", label: "Factoraje", icon: Scale, color: "hsl(352,73%,44%)", ring: 1, angle: 288, description: "Descuento de facturas, cesión de derechos y administración de documentos por cobrar." },
  { id: "params", label: "Parametrización", icon: Settings, color: "hsl(352,73%,44%)", ring: 1, angle: 324, description: "Catálogos maestros, tablas de referencia, monedas, sucursales y configuración general." },

  // Ring 2 — Integraciones (8)
  { id: "int-accounting", label: "Contabilidad", icon: BookOpen, color: "hsl(38,92%,50%)", ring: 2, angle: 0, description: "Integración con sistemas contables externos para sincronización de pólizas y balances." },
  { id: "int-aml", label: "AML", icon: ShieldCheck, color: "hsl(38,92%,50%)", ring: 2, angle: 45, description: "Integración con sistemas de prevención de lavado de activos y listas de control." },
  { id: "int-reports", label: "Reportes", icon: BarChart3, color: "hsl(38,92%,50%)", ring: 2, angle: 90, description: "Conexión con herramientas de BI y reportería para generación de informes regulatorios." },
  { id: "int-conciliation", label: "Conciliación", icon: RefreshCw, color: "hsl(38,92%,50%)", ring: 2, angle: 135, description: "Matching automático de pagos recibidos contra cuentas por cobrar y bancos." },
  { id: "int-thirdparty", label: "Pagos Terceros", icon: Wallet, color: "hsl(38,92%,50%)", ring: 2, angle: 180, description: "Integración con pasarelas de pago, corresponsales y recaudadores externos." },
  { id: "int-pos", label: "POS Retail", icon: MonitorCheck, color: "hsl(38,92%,50%)", ring: 2, angle: 225, description: "Terminal de punto de venta para originación de crédito y consultas en tienda." },
  { id: "int-unicaja", label: "Unicaja", icon: Building2, color: "hsl(38,92%,50%)", ring: 2, angle: 270, description: "Integración con el sistema Unicaja para operaciones de caja y recaudación." },
  { id: "int-digital", label: "Canales Digitales", icon: Smartphone, color: "hsl(38,92%,50%)", ring: 2, angle: 292, description: "APIs para portal web, app móvil, WhatsApp Business y kioscos de autoservicio." },
  { id: "int-api-core", label: "Core de APIs", icon: Layers, color: "hsl(38,92%,50%)", ring: 2, angle: 337, description: "Plataforma API REST/GraphQL centralizada con gateway, versionado, rate limiting y documentación OpenAPI." },

  // Ring 3 — Operaciones (3)
  { id: "op-bi", label: "Reportería BI", icon: LineChart, color: "hsl(215,60%,50%)", ring: 3, angle: 60, description: "Dashboards gerenciales interactivos con KPIs de cartera, originación y rentabilidad." },
  { id: "op-audit", label: "Seguridad & Auditoría", icon: Lock, color: "hsl(215,60%,50%)", ring: 3, angle: 180, description: "Log inmutable de operaciones, trazabilidad completa, MFA y SSO vía Azure AD." },
  
];

const RING_LABELS = ["", "SAF+ Core", "Integraciones", "Operaciones"];
const RING_COLORS = ["", "hsl(352,73%,44%)", "hsl(38,92%,50%)", "hsl(215,60%,50%)"];
const RING_RADII = [0, 130, 215, 285];
const CANVAS = 650;
const CENTER = CANVAS / 2;
const NODE_SIZE = 54;
const ORBIT_SPEEDS = [0, 3, -2, 1.5];
const EASE = [0.25, 0.4, 0.25, 1] as const;

const SolarSystemDesktop = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeRing, setActiveRing] = useState(0);
  const [selected, setSelected] = useState<Module | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const animRef = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const isPaused = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.15) setActiveRing(0);
    else if (v < 0.40) setActiveRing(1);
    else if (v < 0.68) setActiveRing(2);
    else setActiveRing(3);
  });

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTime.current === 0) lastTime.current = timestamp;
      if (!isPaused.current) {
        const delta = (timestamp - lastTime.current) / 1000;
        setTime((t) => t + delta);
      }
      lastTime.current = timestamp;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleSelect = (mod: Module) => {
    isPaused.current = true;
    setSelected(mod);
  };

  const handleClose = () => {
    isPaused.current = false;
    setSelected(null);
  };

  const getPos = (mod: Module) => {
    const baseAngle = mod.angle + time * ORBIT_SPEEDS[mod.ring];
    const rad = (baseAngle * Math.PI) / 180;
    const r = RING_RADII[mod.ring];
    return {
      x: CENTER + r * Math.cos(rad) - NODE_SIZE / 2,
      y: CENTER + r * Math.sin(rad) - NODE_SIZE / 2,
      cx: CENTER + r * Math.cos(rad),
      cy: CENTER + r * Math.sin(rad),
    };
  };

  const isRingVisible = (ring: number) => activeRing >= ring;

  return (
    <div ref={scrollRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 flex gap-12 items-center max-w-7xl">
          {/* Left panel */}
          <div className="w-80 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="font-display text-4xl font-bold text-foreground mb-2">
                Módulos <span className="text-accent">Incluidos</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                21 módulos en 3 capas orbitales. Desplázate para revelar cada capa.
              </p>
            </motion.div>

            {/* Legend */}
            <div className="flex flex-col gap-3 mb-8">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-500",
                    activeRing === ring ? "bg-card border border-border shadow-sm" : "opacity-40"
                  )}
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: RING_COLORS[ring] }}
                  />
                  <span className="text-sm font-medium text-foreground">{RING_LABELS[ring]}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {MODULES.filter((m) => m.ring === ring).length}
                  </span>
                </div>
              ))}
            </div>

            {/* Module list for active ring */}
            <AnimatePresence mode="wait">
              {activeRing > 0 && (
                <motion.div
                  key={activeRing}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  {MODULES.filter((m) => m.ring === activeRing).map((mod, idx) => (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
                        hovered === mod.id ? "bg-card border border-border" : "hover:bg-card/50"
                      )}
                      onMouseEnter={() => setHovered(mod.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => handleSelect(mod)}
                    >
                      <mod.icon className="h-4 w-4 shrink-0" style={{ color: mod.color }} />
                      <span className="text-xs font-medium text-foreground">{mod.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solar system */}
          <div className="relative shrink-0" style={{ width: CANVAS, height: CANVAS }}>
            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${CANVAS} ${CANVAS}`}>
              {/* Orbital rings with reveal */}
              {[1, 2, 3].map((ring) => (
                <motion.circle
                  key={ring}
                  cx={CENTER}
                  cy={CENTER}
                  r={RING_RADII[ring]}
                  fill="none"
                  stroke={RING_COLORS[ring]}
                  strokeWidth={1}
                  strokeDasharray="6 8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isRingVisible(ring) ? 0.3 : 0,
                    scale: isRingVisible(ring) ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.8, ease: EASE as unknown as number[] }}
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                />
              ))}

              {/* Active ring glow */}
              {activeRing > 0 && (
                <motion.circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RING_RADII[activeRing]}
                  fill="none"
                  stroke={RING_COLORS[activeRing]}
                  strokeWidth={2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                />
              )}

              {/* Connector to hovered / selected */}
              {(hovered || selected) && (() => {
                const target = selected || MODULES.find((m) => m.id === hovered);
                if (!target || !isRingVisible(target.ring)) return null;
                const pos = getPos(target);
                return (
                  <motion.line
                    x1={CENTER} y1={CENTER}
                    x2={pos.cx} y2={pos.cy}
                    stroke={target.color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })()}
            </svg>

            {/* Radial glow for active ring */}
            {activeRing > 0 && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle ${RING_RADII[activeRing] + 40}px at center, ${RING_COLORS[activeRing]}10 0%, transparent 70%)`,
                }}
              />
            )}

            {/* Center sun */}
            <motion.div
              className="absolute flex flex-col items-center justify-center rounded-full bg-accent shadow-xl z-10"
              style={{
                width: 80, height: 80,
                left: CENTER - 40, top: CENTER - 40,
                boxShadow: "0 0 40px hsl(352 73% 44% / 0.3), 0 0 80px hsl(352 73% 44% / 0.1)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: EASE as unknown as number[] }}
            >
              <Layers className="h-7 w-7 text-accent-foreground" />
              <span className="text-[9px] font-bold text-accent-foreground mt-0.5">SAF+</span>
            </motion.div>

            {/* Module nodes */}
            {MODULES.map((mod) => {
              const pos = getPos(mod);
              const isVisible = isRingVisible(mod.ring);
              const isActive = activeRing === mod.ring;
              const isHovered = hovered === mod.id;
              const isSelected = selected?.id === mod.id;

              return (
                <motion.div
                  key={mod.id}
                  className={cn(
                    "absolute flex flex-col items-center justify-center rounded-xl border cursor-pointer z-20"
                  )}
                  style={{
                    width: NODE_SIZE,
                    height: NODE_SIZE,
                    left: pos.x,
                    top: pos.y,
                    borderColor: isSelected || isHovered ? mod.color : "hsl(var(--border))",
                    background: isSelected ? mod.color : "hsl(var(--card))",
                  }}
                  animate={{
                    scale: isVisible ? (isSelected ? 1.25 : isHovered ? 1.15 : 1) : 0,
                    opacity: isVisible ? (isActive || isSelected ? 1 : 0.35) : 0,
                    boxShadow: isSelected
                      ? `0 0 24px ${mod.color}50`
                      : isHovered
                      ? `0 0 16px ${mod.color}30`
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                  transition={{ duration: 0.4, ease: EASE as unknown as number[] }}
                  onMouseEnter={() => setHovered(mod.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (!isVisible) return;
                    isSelected ? handleClose() : handleSelect(mod);
                  }}
                >
                  <mod.icon
                    className="h-5 w-5"
                    style={{ color: isSelected ? "#fff" : mod.color }}
                  />
                  <span
                    className="text-[7px] font-semibold mt-0.5 text-center leading-tight px-1"
                    style={{ color: isSelected ? "#fff" : "hsl(var(--muted-foreground))" }}
                  >
                    {mod.label}
                  </span>
                </motion.div>
              );
            })}

            {/* Popup detail */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute z-30 bg-card border border-border rounded-2xl shadow-2xl p-5 w-72"
                  style={{
                    left: Math.min(Math.max(getPos(selected).cx - 144, 10), CANVAS - 290),
                    top: getPos(selected).cy > CENTER
                      ? getPos(selected).cy - NODE_SIZE - 160
                      : getPos(selected).cy + NODE_SIZE + 10,
                  }}
                >
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selected.color}20` }}
                    >
                      <selected.icon className="h-5 w-5" style={{ color: selected.color }} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">{selected.label}</h4>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {RING_LABELS[selected.ring]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selected.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selected.color }} />
                    <span className="text-[10px] font-medium text-foreground">Incluido en SAF+</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile fallback
const MobileModules = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const tabs = [
    { ring: 1, label: "SAF+ Core", color: "hsl(352,73%,44%)" },
    { ring: 2, label: "Integraciones", color: "hsl(38,92%,50%)" },
    { ring: 3, label: "Operaciones", color: "hsl(215,60%,50%)" },
  ];

  return (
    <div className="py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Módulos <span className="text-accent">Incluidos</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2">21 módulos en 3 capas</p>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.ring}
            onClick={() => { setActiveTab(t.ring); setExpandedId(null); }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              activeTab === t.ring ? "bg-accent text-accent-foreground border-accent" : "bg-card text-foreground border-border hover:bg-muted"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-2 gap-3 max-w-md mx-auto"
        >
          {MODULES.filter((m) => m.ring === activeTab).map((mod) => {
            const isOpen = expandedId === mod.id;
            return (
              <motion.div
                key={mod.id}
                onClick={() => setExpandedId(isOpen ? null : mod.id)}
                className={cn("bg-card border rounded-xl p-4 cursor-pointer transition-all", isOpen ? "col-span-2 border-accent" : "border-border")}
                layout
              >
                <div className="flex items-center gap-2.5">
                  <mod.icon className="h-5 w-5 shrink-0" style={{ color: mod.color }} />
                  <span className="text-sm font-medium text-foreground">{mod.label}</span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{mod.description}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-[10px] font-medium text-foreground">Incluido en SAF+</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SolarSystem = () => (
  <section id="modulos" className="bg-background">
    <div className="hidden lg:block"><SolarSystemDesktop /></div>
    <div className="lg:hidden"><MobileModules /></div>
  </section>
);

export default SolarSystem;
