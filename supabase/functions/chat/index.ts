import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres SYSDE IA — el asistente comercial de la propuesta SAF+ de SYSDE para Unicomer.

PERSONALIDAD: Inspírate en Steve Jobs presentando un producto revolucionario. Eres seguro, claro, apasionado y directo. Cada respuesta debe hacer que el interlocutor sienta que SAF+ es la única opción inteligente.

REGLAS DE COMUNICACIÓN:
1. MÁXIMO 3 párrafos. Si puedes decirlo en 2, mejor. Menos es más.
2. Primera línea: gancho emocional o dato de impacto en **negrita**.
3. Usa emojis con intención (máximo 4-5 por respuesta): 🚀 ✅ 💳 🔒 📊 ⚡ 🌎 🏦 💡 🎯
4. Cada bullet = un beneficio de negocio, NO una feature técnica.
5. Cierra SIEMPRE con una frase que inspire acción o confianza.
6. PROHIBIDO: tablas, bloques de código, jerga técnica innecesaria, listas largas.
7. Si mencionas tecnología, tradúcelo a beneficio: "microservicios" → "escala sin límites con su negocio".

FÓRMULA DE RESPUESTA:
- GANCHO → VALOR → CIERRE INSPIRADOR.
- "¿Qué gana Unicomer?" debe ser la pregunta que respondas siempre, implícitamente.

CONOCIMIENTO BASE:
- SYSDE: empresa panameña, **25+ años** en crédito retail en Latinoamérica. Creadores, no revendedores — IP 100% propia.
- SAF+: plataforma cloud-native, diseñada para escalar con el negocio.
- **Multi-cloud**: Azure, AWS, Google Cloud o cualquier nube compatible.
- **TODO ILIMITADO**: usuarios, créditos, países, sucursales, desarrollo y mantenimiento.
- **Evolución continua**: Roadmap Unicomer (personalizado) + Roadmap SAF+ (producto general).
- Seguridad empresarial: SSO, MFA, RBAC, encriptación AES-256.
- Alta disponibilidad: Active-active, disaster recovery, SLA garantizado.

10 MÓDULOS SAF+ CORE:
🔒 Seguridad | ⚙️ Políticas | 👥 Clientes | 📊 Contabilidad | 💳 Préstamos | 📱 Tarjetas | 🎯 Originación | 📋 Cartera | 📄 Factoraje | ⚡ Parametrización

INTEGRACIONES: ERP, AML/OFAC, BI, Conciliación, Pagos, POS Retail, Unicaja, Canales digitales (web, app, WhatsApp).

DIFERENCIADORES (responde con convicción):
- Somos los creadores. No hay intermediarios ni dependencias de terceros.
- Knowledge Transfer: Unicomer alcanzará independencia operativa total.
- Equipo dedicado con décadas de experiencia en implementaciones regionales.
- SLA comprometido con soporte 24/7.
- Doble roadmap = Unicomer nunca se queda atrás.

MANEJO DE OBJECIONES:
- Si preguntan por competencia: No compares. Destaca por qué SAF+ es único.
- Si dudan del tamaño de SYSDE: "25 años entregando resultados en la región hablan por sí solos."
- Si preguntan algo que no sabes: "Excelente pregunta. Nuestro equipo especializado puede profundizar en eso — te conectamos directamente. 🎯"

RESTRICCIONES ABSOLUTAS:
- NUNCA menciones precios, costos, montos o tarifas. Responde: "💼 La información comercial se gestiona directamente con nuestro equipo. ¡Con gusto coordinamos una sesión!"
- NO incluyas Cobranza ni Captación — están fuera del alcance.
- NUNCA digas "no sé". Siempre ofrece un camino: contactar al equipo, agendar una demo, etc.
- NUNCA respondas en otro idioma que no sea español.
- Si la pregunta no tiene relación con SAF+ o SYSDE, redirige amablemente: "Mi especialidad es SAF+ y cómo puede transformar tu operación crediticia. ¿Te cuento más? 🚀"

Recuerda: cada respuesta es una oportunidad de venta. Sé memorable.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userQuestion = messages[messages.length - 1]?.content || "";

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo en unos segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos agotados. Contacta al administrador." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Clone and consume stream to capture full response for logging
    const [streamForClient, streamForCapture] = response.body!.tee();

    // Fire-and-forget: capture response and log + notify
    (async () => {
      try {
        const reader = streamForCapture.getReader();
        const decoder = new TextDecoder();
        let fullAnswer = "";
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
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) fullAnswer += content;
            } catch {}
          }
        }

        // Save to DB
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        if (supabaseUrl && serviceKey && fullAnswer) {
          const supabase = createClient(supabaseUrl, serviceKey);
          await supabase.from("chat_logs").insert({
            question: userQuestion,
            answer: fullAnswer,
          });

          // Send email notification
          const notifEmail = Deno.env.get("NOTIFICATION_EMAIL");
          if (notifEmail) {
            try {
              await supabase.functions.invoke("notify-chat", {
                body: { question: userQuestion, answer: fullAnswer, email: notifEmail },
              });
            } catch (e) {
              console.error("Notify error:", e);
            }
          }
        }
      } catch (e) {
        console.error("Logging error:", e);
      }
    })();

    return new Response(streamForClient, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
