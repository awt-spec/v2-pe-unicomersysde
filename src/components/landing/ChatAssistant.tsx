import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: string[] = [];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Error de conexión" }));
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${err.error || "Error al conectar con el asistente."}` }]);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error al conectar con el asistente." }]);
    }

    setIsLoading(false);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-xl"
      style={{ height: "520px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-card">
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">SYSDE IA</p>
          <p className="text-xs text-muted-foreground">Asistente inteligente de la propuesta</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-0 py-0 bg-background">
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center gap-4 px-5"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <Bot className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              Pregúntame lo que necesites sobre la propuesta SAF+ para Unicomer.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-5 py-4 ${msg.role === "assistant" ? "bg-muted/50" : "bg-background"}`}
            >
              <div className="max-w-2xl mx-auto flex gap-4">
                {msg.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs font-semibold text-foreground mb-1">
                    {msg.role === "assistant" ? "SYSDE IA" : "Tú"}
                  </p>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none text-foreground [&_p]:m-0 [&_p]:mb-2 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_strong]:text-foreground [&_a]:text-accent">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground">{msg.content}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="px-5 py-4 bg-muted/50">
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                <Bot className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1 pt-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input - ChatGPT style */}
      <div className="border-t border-border bg-card px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="max-w-2xl mx-auto flex items-center gap-2 bg-muted rounded-xl px-4 py-2 border border-border focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/20 transition-all"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Envía un mensaje a SYSDE IA..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg h-8 w-8 flex-shrink-0 disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          SYSDE IA puede cometer errores. Verifica la información importante.
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;
