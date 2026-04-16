import { motion } from "framer-motion";
import ChatAssistant from "./ChatAssistant";

const ChatSection = () => (
  <section className="py-16 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          <span className="text-accent">SYSDE</span> IA
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Pregunta lo que necesites sobre la propuesta, alcance funcional, arquitectura o equipo.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-2xl mx-auto"
      >
        <ChatAssistant />
      </motion.div>
    </div>
  </section>
);

export default ChatSection;
