import { motion, AnimatePresence } from "framer-motion";
import { PIECES, LAYERS } from "./puzzleData";
import { CELL_W, CELL_H, PAD } from "./PieceAnimated";

type Props = {
  revealedLayer: number;
  layer3Assembled: boolean;
};

type Connection = {
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
  layer: number;
  id: string;
};

function getConnections(layer: number): Connection[] {
  const layerPieces = PIECES.filter((p) => p.layer === layer);
  const connections: Connection[] = [];
  const color = LAYERS[layer - 1]?.color || "#888";

  for (let i = 0; i < layerPieces.length; i++) {
    for (let j = i + 1; j < layerPieces.length; j++) {
      const a = layerPieces[i];
      const b = layerPieces[j];
      const aSpan = a.colSpan || 1;
      const bSpan = b.colSpan || 1;

      const aRight = a.col + aSpan;
      const bRight = b.col + bSpan;
      const sameRow = a.row === b.row;
      const adjH = sameRow && (aRight === b.col || bRight === a.col);
      const adjV = Math.abs(a.row - b.row) === 1 &&
        !(a.col + aSpan <= b.col || b.col + bSpan <= a.col);

      if (adjH || adjV) {
        const cx1 = PAD + a.col * CELL_W + (CELL_W * aSpan) / 2;
        const cy1 = PAD + a.row * CELL_H + CELL_H / 2;
        const cx2 = PAD + b.col * CELL_W + (CELL_W * bSpan) / 2;
        const cy2 = PAD + b.row * CELL_H + CELL_H / 2;
        connections.push({
          x1: cx1, y1: cy1, x2: cx2, y2: cy2,
          color, layer,
          id: `${a.id}-${b.id}`,
        });
      }
    }
  }
  return connections;
}

function buildPath(c: Connection): string {
  const dx = c.x2 - c.x1;
  const dy = c.y2 - c.y1;
  const isVertical = Math.abs(dy) > Math.abs(dx);

  if (isVertical) {
    const midY = (c.y1 + c.y2) / 2;
    return `M ${c.x1} ${c.y1} C ${c.x1} ${midY}, ${c.x2} ${midY}, ${c.x2} ${c.y2}`;
  } else {
    const midX = (c.x1 + c.x2) / 2;
    return `M ${c.x1} ${c.y1} C ${midX} ${c.y1}, ${midX} ${c.y2}, ${c.x2} ${c.y2}`;
  }
}

const ConnectionLines = ({ revealedLayer, layer3Assembled }: Props) => {
  const allConnections: Connection[] = [];

  for (let l = 1; l <= 3; l++) {
    const isAssembled = revealedLayer > l || (l === 3 && layer3Assembled);
    if (!isAssembled) continue;
    allConnections.push(...getConnections(l));
  }

  const totalW = 4 * CELL_W + 2 * PAD;
  const totalH = 5 * CELL_H + 2 * PAD;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-[1]"
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
    >
      <defs>
        {/* Glow filters per layer */}
        {LAYERS.map((layer) => (
          <filter key={`glow-${layer.id}`} id={`line-glow-${layer.id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={layer.color} floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glowColor" />
            <feMerge>
              <feMergeNode in="glowColor" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}

        {/* Animated gradient for energy flow */}
        {LAYERS.map((layer) => (
          <linearGradient key={`grad-${layer.id}`} id={`flow-grad-${layer.id}`} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={layer.color} stopOpacity="0">
              <animate attributeName="offset" values="-0.3;1" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="15%" stopColor={layer.color} stopOpacity="0.7">
              <animate attributeName="offset" values="-0.15;1.15" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor={layer.color} stopOpacity="0">
              <animate attributeName="offset" values="0;1.3" dur="2.5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        ))}
      </defs>

      <AnimatePresence>
        {allConnections.map((c, i) => {
          const d = buildPath(c);
          const midX = (c.x1 + c.x2) / 2;
          const midY = (c.y1 + c.y2) / 2;

          return (
            <g key={c.id}>
              {/* Soft glow under-line */}
              <motion.path
                d={d}
                fill="none"
                stroke={c.color}
                strokeWidth="6"
                strokeOpacity="0.06"
                strokeLinecap="round"
                filter={`url(#line-glow-${c.layer})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: i * 0.06, ease: "easeOut" }}
              />

              {/* Main solid line */}
              <motion.path
                d={d}
                fill="none"
                stroke={c.color}
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
              />

              {/* Energy flow pulse */}
              <motion.path
                d={d}
                fill="none"
                stroke={`url(#flow-grad-${c.layer})`}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.06 }}
              />

              {/* Junction node with pulse */}
              <motion.circle
                cx={midX}
                cy={midY}
                r="0"
                fill={c.color}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 3, opacity: 1 }}
                exit={{ r: 0, opacity: 0 }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.4, type: "spring" }}
              />
              <motion.circle
                cx={midX}
                cy={midY}
                fill="none"
                stroke={c.color}
                strokeWidth="1"
                initial={{ r: 3, opacity: 0 }}
                animate={{ r: [3, 8, 3], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />

              {/* Start & end nodes */}
              <motion.circle
                cx={c.x1} cy={c.y1} r="2"
                fill={c.color}
                fillOpacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.06, type: "spring" }}
              />
              <motion.circle
                cx={c.x2} cy={c.y2} r="2"
                fill={c.color}
                fillOpacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06, type: "spring" }}
              />
            </g>
          );
        })}
      </AnimatePresence>
    </svg>
  );
};

export default ConnectionLines;
