import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import ChatAssistant from "./ChatAssistant";

// Global event to open chat from anywhere
const OPEN_CHAT_EVENT = "sysde-open-chat";

export const openSysdeChat = () => {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
};

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    window.addEventListener(OPEN_CHAT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpen);
  }, [handleOpen]);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
              <div className="relative w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105 transition-all">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs font-medium text-foreground"
                >
                  ¿Dudas? Pregunta a <span className="text-accent font-bold">SYSDE IA</span>
                  <div className="absolute -bottom-1 right-5 w-2 h-2 bg-card border-r border-b border-border rotate-45" />
                </motion.div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-accent/5">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                <span className="font-display font-bold text-sm text-foreground">SYSDE IA</span>
                <span className="text-[10px] text-muted-foreground">· Asistente de propuesta</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatAssistant />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
