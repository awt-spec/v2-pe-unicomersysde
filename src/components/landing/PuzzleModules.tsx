import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Check, ExternalLink, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { PIECES, LAYERS, type PuzzlePiece } from "./puzzle/puzzleData";
import { getPieceEdges } from "./puzzle/puzzleUtils";
import PieceAnimated, { CELL_W, CELL_H, PAD } from "./puzzle/PieceAnimated";
import PieceDetailSlide from "./puzzle/PieceDetailSlide";
import ConnectionLines from "./puzzle/ConnectionLines";
import ProgressCounter from "./puzzle/ProgressCounter";
import { openSysdeChat } from "./FloatingChat";

const PuzzleModules = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealedLayer, setRevealedLayer] = useState(0);
  const [layer3Assembled, setLayer3Assembled] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<PuzzlePiece | null>(null);
  const [mobileTab, setMobileTab] = useState(1);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const layer1P = useTransform(scrollYProgress, [0.02, 0.25], [0, 1], { clamp: true });
  const layer2P = useTransform(scrollYProgress, [0.30, 0.52], [0, 1], { clamp: true });
  const layer3P = useTransform(scrollYProgress, [0.57, 0.78], [0, 1], { clamp: true });
  const finalP = useTransform(scrollYProgress, [0.85, 0.95], [0, 1], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.02) setRevealedLayer(0);
    else if (v < 0.28) setRevealedLayer(1);
    else if (v < 0.54) setRevealedLayer(2);
    else setRevealedLayer(3);
    setLayer3Assembled(v > 0.82);
  });

  const handlePieceClick = (piece: PuzzlePiece) => {
    setSelectedPiece(piece);
  };

  const handleNavigate = (sectionId?: string) => {
    if (!sectionId) return;
    setSelectedPiece(null);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Mobile
  if (isMobile) {
    const layerPieces = PIECES.filter((p) => p.layer === mobileTab);
    const layer = LAYERS[mobileTab - 1];
    return (
      <section id="modulos" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            Alcance <span className="text-accent">Completo</span>
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-6">Módulos · Modelo · Precio</p>
          <div className="flex gap-1 mb-6">
            {LAYERS.map((l) => (
              <button key={l.id} onClick={() => setMobileTab(l.id)}
                className={cn("flex-1 py-2.5 px-2 text-xs font-medium rounded-lg transition-all",
                  mobileTab === l.id ? "text-white shadow-md" : "bg-secondary text-muted-foreground")}
                style={mobileTab === l.id ? { backgroundColor: l.color } : {}}>
                {l.name}
              </button>
            ))}
          </div>
          <div className="grid gap-3">
            {layerPieces.map((piece) => (
              <button key={piece.id} onClick={() => setSelectedPiece(selectedPiece?.id === piece.id ? null : piece)}
                className="w-full text-left bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: layer.color }}><piece.icon size={20} /></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm flex items-center gap-2">
                      {piece.label}
                      <Check size={14} className="text-accent" />
                    </p>
                    <p className="text-xs text-muted-foreground">{piece.description}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedPiece?.id === piece.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">{piece.fullDescription}</p>
                      {piece.sectionId && (
                        <button onClick={() => handleNavigate(piece.sectionId)} className="mt-3 text-xs text-accent font-medium flex items-center gap-1 hover:underline">
                          Ver detalle <ExternalLink size={12} />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getProgress = (layer: number) => layer === 1 ? layer1P : layer === 2 ? layer2P : layer3P;
  const totalW = 4 * CELL_W + 2 * PAD;
  const totalH = 5 * CELL_H + 2 * PAD;

  return (
    <section id="modulos" ref={sectionRef} className="relative" style={{ height: "900vh" }}>
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {/* Side panel */}
        <div className="w-56 shrink-0 bg-card border-r border-border flex flex-col justify-center px-5">
          {LAYERS.map((layer) => {
            const isActive = revealedLayer >= layer.id;
            const isCurrent = revealedLayer === layer.id;
            return (
              <div key={layer.id} className={cn("transition-all duration-500 mb-5", isActive ? "opacity-100" : "opacity-25")}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color, boxShadow: isCurrent ? `0 0 0 4px ${layer.color}33` : "none" }} />
                  <span className={cn("font-display text-sm font-semibold", isCurrent ? "text-foreground" : "text-muted-foreground")}>{layer.name}</span>
                </div>
                {isActive && (
                  <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 pl-5">
                    {PIECES.filter((p) => p.layer === layer.id).map((p) => (
                      <li key={p.id}
                        className="text-xs text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1.5"
                        onClick={() => handlePieceClick(p)}>
                        <Check size={10} className="text-accent shrink-0" />
                        {p.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Main area */}
        <div className="flex-1 relative flex flex-col items-center justify-center bg-background">
          {/* Layer label + progress counter + SYSDE IA hint */}
          <div className="absolute bottom-10 inset-x-0 flex items-center justify-center gap-4 z-20">
            <ProgressCounter revealedLayer={revealedLayer} />
            <AnimatePresence mode="wait">
              {revealedLayer >= 1 && revealedLayer <= 3 && (
                <motion.div key={revealedLayer} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-card border border-border shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LAYERS[revealedLayer - 1].color }} />
                  <span className="font-display text-base font-bold" style={{ color: LAYERS[revealedLayer - 1].color }}>{LAYERS[revealedLayer - 1].name}</span>
                  <span className="text-xs text-muted-foreground">— Parte {revealedLayer} de 3</span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openSysdeChat}
              className="w-9 h-9 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/20 flex items-center justify-center transition-all"
              title="Pregunta a SYSDE IA"
            >
              <Lightbulb className="w-4 h-4 text-accent" />
            </motion.button>
          </div>

          {/* Completion title */}
          <motion.div className="absolute top-8 inset-x-0 flex justify-center z-20" style={{ opacity: finalP }}>
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">Alcance <span className="text-accent">Completo</span></h2>
              <p className="text-muted-foreground text-sm mt-1">20 capacidades · 3 pilares · Una plataforma</p>
            </div>
          </motion.div>

          {/* Puzzle grid */}
          <div className="relative" style={{ width: totalW, height: totalH }}>
            <ConnectionLines revealedLayer={revealedLayer} layer3Assembled={layer3Assembled} />
            {PIECES.map((piece) => {
              const layer = LAYERS[piece.layer - 1];
              const progress = getProgress(piece.layer);
              const span = piece.colSpan || 1;
              const fx = PAD + piece.col * CELL_W;
              const fy = PAD + piece.row * CELL_H;
              const edges = getPieceEdges(piece.row, piece.col, span);

              return (
                <PieceAnimated
                  key={piece.id}
                  piece={piece}
                  edges={edges}
                  color={layer.color}
                  progress={progress}
                  fx={fx}
                  fy={fy}
                  isVisible={revealedLayer >= piece.layer}
                  isAssembled={revealedLayer > piece.layer || (piece.layer === 3 && layer3Assembled)}
                  onClick={() => handlePieceClick(piece)}
                />
              );
            })}
          </div>

          {/* Detail slide */}
          <AnimatePresence>
            {selectedPiece && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={() => setSelectedPiece(null)}>
                <motion.div
                  initial={{ scale: 0.92, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.92, y: 30, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PieceDetailSlide
                    piece={selectedPiece}
                    color={LAYERS[selectedPiece.layer - 1].color}
                    onClose={() => setSelectedPiece(null)}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PuzzleModules;
