import { motion } from "framer-motion";
import { PIECES } from "./puzzleData";

type Props = {
  revealedLayer: number;
};

const ProgressCounter = ({ revealedLayer }: Props) => {
  const total = PIECES.length;
  const revealed = PIECES.filter((p) => p.layer <= revealedLayer).length;
  const pct = total > 0 ? (revealed / total) * 100 : 0;
  const isComplete = revealed === total;

  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (c * pct) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/90 backdrop-blur border border-border shadow-lg"
    >
      <svg width={52} height={52} viewBox="0 0 52 52" className="-rotate-90">
        <circle cx={26} cy={26} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={3} />
        <motion.circle
          cx={26} cy={26} r={r} fill="none"
          stroke={isComplete ? "#22c55e" : "hsl(var(--accent))"}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-foreground tabular-nums">
          {revealed}/{total}
        </span>
        <span className="text-[10px] text-muted-foreground leading-tight">
          {isComplete ? "¡Completo!" : "módulos"}
        </span>
      </div>
      {isComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
        />
      )}
    </motion.div>
  );
};

export default ProgressCounter;
