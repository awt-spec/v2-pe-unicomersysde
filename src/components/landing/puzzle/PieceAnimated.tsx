import { motion, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { type PuzzlePiece, CELL_W as DATA_CELL_W } from "./puzzleData";
import { type PieceEdges, buildPathMulti } from "./puzzleUtils";

const CELL_W = DATA_CELL_W;
const CELL_H = 110;
const PAD = 22;

export { CELL_W, CELL_H, PAD };

const PieceAnimated = ({
  piece, edges, color, progress, fx, fy, isVisible, isAssembled, onClick,
}: {
  piece: PuzzlePiece;
  edges: PieceEdges;
  color: string;
  progress: any;
  fx: number; fy: number;
  isVisible: boolean;
  isAssembled: boolean;
  onClick: () => void;
}) => {
  const span = piece.colSpan || 1;
  const pieceW = CELL_W * span;

  const x = useTransform(progress, [0, 1], [fx + piece.scatterX, fx]);
  const y = useTransform(progress, [0, 1], [fy + piece.scatterY, fy]);
  const rotate = useTransform(progress, [0, 1], [piece.scatterRotate, 0]);
  const scale = useTransform(progress, [0, 0.15, 1], [0.45, 0.8, 1]);
  const opacity = useTransform(progress, [0, 0.08], [0, 1]);

  if (!isVisible) return null;

  const path = buildPathMulti(pieceW, CELL_H, CELL_W, edges);
  const vbX = -PAD;
  const vbY = -PAD;
  const vbW = pieceW + 2 * PAD;
  const vbH = CELL_H + 2 * PAD;

  const greenColor = "#22c55e";

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        x, y, rotate, scale, opacity,
        width: pieceW + 2 * PAD,
        height: CELL_H + 2 * PAD,
        marginLeft: -PAD,
        marginTop: -PAD,
      }}
      onClick={onClick}
    >
      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        className="w-full h-full"
        style={{ filter: isAssembled ? `drop-shadow(0 0 8px ${greenColor}50)` : `drop-shadow(0 2px 4px ${color}30)` }}
      >
        {/* Radial glow flash on assembly */}
        {isAssembled && (
          <>
            <defs>
              <radialGradient id={`glow-${piece.id}`} cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor={greenColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={greenColor} stopOpacity="0" />
              </radialGradient>
            </defs>
            <motion.rect
              x={0} y={0} width={pieceW} height={CELL_H} rx={8}
              fill={`url(#glow-${piece.id})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.2, delay: piece.col * 0.1, ease: "easeOut" }}
            />
          </>
        )}
        {isAssembled && (
          <motion.path
            d={path}
            fill="none"
            stroke={greenColor}
            strokeWidth="4"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: piece.col * 0.15 + piece.row * 0.1 }}
          />
        )}
        <path
          d={path}
          fill={isAssembled ? `${greenColor}10` : `${color}18`}
          stroke={isAssembled ? greenColor : color}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Snap bounce effect on assembly */}
      <motion.div
        className="absolute flex flex-col items-center justify-center pointer-events-none"
        style={{ left: PAD, top: PAD, width: pieceW, height: CELL_H }}
        animate={isAssembled ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.4, delay: piece.col * 0.08, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-4 rounded-xl"
          animate={isAssembled
            ? { opacity: [0, 0.07, 0] }
            : { opacity: [0, 0.05, 0], scale: [1, 1.04, 1] }
          }
          transition={{ duration: isAssembled ? 3.5 : 2.5, repeat: Infinity, ease: "easeInOut", delay: piece.col * 0.4 + piece.row * 0.3 }}
          style={{ backgroundColor: isAssembled ? greenColor : color }}
        />
        <motion.div
          animate={isAssembled ? {} : { y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: piece.col * 0.5 + piece.row * 0.25 }}
          className="flex flex-col items-center justify-center"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white relative z-10 mb-1 transition-colors duration-500"
            style={{ backgroundColor: isAssembled ? greenColor : color }}
          >
            <piece.icon size={16} />
          </div>
          <span className="text-[10px] font-bold text-foreground leading-tight text-center relative z-10 px-1">
            {piece.label}
          </span>

          {isAssembled && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20, delay: piece.col * 0.08 + 0.2 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center z-20 shadow-md"
              style={{ backgroundColor: greenColor }}
            >
              <Check size={12} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Hover card — flips below for top rows */}
      {(() => {
        const showBelow = piece.row <= 1;
        return (
          <div
            className="absolute opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none"
            style={{
              left: "50%",
              ...(showBelow
                ? { top: "100%", transform: "translateX(-50%)", marginTop: -8 }
                : { bottom: "100%", transform: "translateX(-50%)", marginBottom: -8 }),
            }}
          >
            {showBelow && (
              <div className="flex justify-center">
                <div className="w-3 h-3 bg-card border-l border-t border-border rotate-45 mb-[-6px] relative z-10" />
              </div>
            )}
            <div className="bg-card text-card-foreground rounded-xl shadow-2xl border border-border w-[260px] overflow-hidden">
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border" style={{ backgroundColor: `${isAssembled ? greenColor : color}12` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: isAssembled ? greenColor : color }}>
                  <piece.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{piece.label}</p>
                  <p className="text-[10px] font-medium" style={{ color: isAssembled ? greenColor : color }}>{piece.layerLabel}</p>
                </div>
                {isAssembled && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${greenColor}20` }}>
                    <Check size={10} style={{ color: greenColor }} strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] text-muted-foreground leading-relaxed">{piece.description}</p>
              </div>
              <div className="px-4 py-2 border-t border-border bg-muted/30">
                <p className="text-[10px] text-muted-foreground text-center">Click para ver detalle</p>
              </div>
            </div>
            {!showBelow && (
              <div className="flex justify-center">
                <div className="w-3 h-3 bg-card border-r border-b border-border rotate-45 -mt-1.5" />
              </div>
            )}
          </div>
        );
      })()}
    </motion.div>
  );
};

export default PieceAnimated;
