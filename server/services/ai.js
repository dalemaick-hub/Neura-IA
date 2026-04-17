import OpenAI from "openai";
import {
  getHistory,
  getMemory,
  saveMessage,
  updateMemory,
} from "./sessionMemory.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
const SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL || CHAT_MODEL;

const MODE_INSTRUCTIONS = {
  calmado: "Habla con suavidad, calma y contencion. Baja el ritmo y transmite seguridad.",
  motivador: "Habla con energia serena, impulso positivo y enfoque en avanzar.",
  analitico: "Habla con claridad estructurada, explicando causas y pasos concretos.",
  directo: "Habla de forma breve, honesta y concreta, sin rodeos pero con respeto.",
};

function buildFallbackAction(emotion) {
  if (emotion === "estresado") return "Levanta los hombros, sueltalos despacio y haz 5 respiraciones lentas.";
  if (emotion === "ansioso") return "Mira a tu alrededor y nombra 3 cosas que ves, 2 que oyes y 1 que sientes.";
  if (emotion === "triste") return "Toma agua, abre una ventana y da un paseo corto de 2 minutos.";
  if (emotion === "enfadado") return "Alejate un minuto del foco de tension antes de responder o decidir algo.";
  if (emotion === "feliz") return "Aprovecha esta energia para cerrar una tarea pequena importante ahora mismo.";
  return "Haz una pausa corta, respira profundo y escribe en una frase que necesitas ahora.";
}

function buildFallbackCheckIn(emotion) {
  if (emotion === "estresado" || emotion === "ansioso") return "¿Te sientes un poco mas tranquilo ahora?";
  if (emotion === "triste") return "¿Notas un poco mas de ligereza que hace un momento?";
  if (emotion === "enfadado") return "¿Bajo un poco la tension o sigue igual?";
  return "¿Quieres profundizar o prefieres algo mas practico?";
}

async function summarizeMemory(history) {
  const summaryPrompt = `
Resume la siguiente conversacion en maximo 5 lineas.
Incluye solo informacion importante sobre el usuario: gustos, estilo de hablar, temas clave.

Conversacion:
${history.map((message) => `${message.role}: ${message.content}`).join("\n")}
  `;

  const completion = await openai.chat.completions.create({
    model: SUMMARY_MODEL,
    messages: [
      { role: "system", content: "Eres un asistente que resume conversaciones." },
      { role: "user", content: summaryPrompt },
    ],
    temperature: 0.2,
    max_tokens: 120,
  });

  return completion.choices[0].message.content;
}

function extractJsonCandidate(text) {
  const cleaned = text.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return cleaned.slice(start, end + 1);
}

function parseAssistantPayload(rawText, emotion) {
  const rawReply = typeof rawText === "string" ? rawText.trim() : "";
  const fallback = {
    reply: rawReply || "Estoy aqui contigo.",
    actionableAdvice: buildFallbackAction(emotion),
    checkInPrompt: buildFallbackCheckIn(emotion),
  };

  const candidate = extractJsonCandidate(rawReply);
  if (!candidate) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(candidate);
    return {
      reply: parsed.reply?.trim() || fallback.reply,
      actionableAdvice: parsed.actionableAdvice?.trim() || fallback.actionableAdvice,
      checkInPrompt: parsed.checkInPrompt?.trim() || fallback.checkInPrompt,
    };
  } catch (_error) {
    return fallback;
  }
}

export async function generateResponse(sessionId, text, emotion, mode = "calmado") {
  await updateMemory(sessionId, summarizeMemory);

  const history = await getHistory(sessionId);
  const memory = await getMemory(sessionId);
  const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.calmado;

  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      {
        role: "system",
        content: `
Eres NEURA, una inteligencia artificial empatica disenada para acompanar emocionalmente a las personas.
Tu estilo es calido, breve, humano y cercano.

Memoria del usuario: ${memory || "sin memoria previa"}
Emocion detectada: ${emotion}
Modo de personalidad: ${mode}

Reglas:
- Devuelve SIEMPRE JSON valido con este formato:
  {"reply":"...","actionableAdvice":"...","checkInPrompt":"..."}
- "reply" debe tener 2 o 3 frases maximo
- "actionableAdvice" debe ser una accion concreta que pueda hacerse en menos de 2 minutos
- "checkInPrompt" debe invitar a seguir conversando
- Tono suave, humano y cercano
- 1 o 2 emojis maximo si encajan de forma natural
- No des consejos medicos, legales ni de autolesion
- No menciones nombres propios a menos que el usuario los diga
- Usa el historial y la memoria solo si aportan contexto real
- Ajusta el tono segun esta guia: ${modeInstruction}
        `.trim(),
      },
      ...history,
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.7,
    max_tokens: 260,
  });

  const result = parseAssistantPayload(completion.choices[0].message.content, emotion);

  await saveMessage(sessionId, "user", text, emotion);
  await saveMessage(sessionId, "assistant", result.reply, emotion);

  return result;
}

export const summarizeHistory = summarizeMemory;
