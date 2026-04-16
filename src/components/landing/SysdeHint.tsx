import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { openSysdeChat } from "./FloatingChat";

type Variant = "pill" | "icon-only" | "inline";

interface Props {
  text?: string;
  variant?: Variant;
  className?: string;
}

/**
 * Contextual hint that opens the SYSDE IA chat from anywhere on the page.
 * Variants:
 *  - pill (default): icon + text in a rounded pill
 *  - icon-only: just the lightbulb icon
 *  - inline: small inline text link
 */
const SysdeHint = ({ text = "¿Dudas? Pregunta a SYSDE IA", variant = "pill", className = "" }: Props) => {
  if (variant === "icon-only") {
    return (
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={openSysdeChat}
        className={`w-9 h-9 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors group ${className}`}
        title={text}
      >
        <Lightbulb className="w-4 h-4 text-accent group-hover:text-accent" />
      </motion.button>
    );
  }

  if (variant === "inline") {
    return (
      <button
        onClick={openSysdeChat}
        className={`inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 font-medium transition-colors ${className}`}
      >
        <Lightbulb className="w-3.5 h-3.5" />
        {text}
      </button>
    );
  }

  // pill (default)
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={openSysdeChat}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 hover:bg-accent/15 border border-accent/20 transition-all group ${className}`}
    >
      <Lightbulb className="w-4 h-4 text-accent" />
      <span className="text-xs font-medium text-foreground">
        {text}
      </span>
    </motion.button>
  );
};

export default SysdeHint;
