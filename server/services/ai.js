import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

let memory = "";

const MODE_INSTRUCTIONS = {
  calmado: "Habla con suavidad, calma y contencion. Baja el ritmo y transmite seguridad.",
  motivador: "Habla con energia serena, impulso positivo y enfoque en avanzar.",
  analitico: "Habla con claridad estructurada, explicando causas y pasos concretos.",
  directo: "Habla de forma breve, honesta y concreta, sin rodeos pero con respeto.",
};

async function summarizeMemory(history) {
  const summaryPrompt = `
Resume la siguiente conversacion en maximo 5 lineas.
Manten solo informacion importante sobre el usuario, gustos, datos personales, estilo de hablar y temas clave.

Conversacion:
${history.map((message) => `${message.role}: ${message.content}`).join("\n")}
  `;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "Eres un asistente que resume conversaciones." },
      { role: "user", content: summaryPrompt },
    ],
    temperature: 0.2,
    max_tokens: 120,
  });

  return completion.choices[0].message.content;
}

async function updateMemory(history) {
  if (history.length >= 6) {
    memory = await summarizeMemory(history);
    history.splice(0, history.length - 4);
  }
}

function buildFallbackAction(emotion) {
  if (emotion === "estresado") {
    return "Levanta los hombros, sueltalos despacio y haz 5 respiraciones lentas.";
  }

  if (emotion === "ansioso") {
    return "Mira a tu alrededor y nombra 3 cosas que ves, 2 que oyes y 1 que sientes.";
  }

  if (emotion === "triste") {
    return "Toma agua, abre una ventana y da un paseo corto de 2 minutos.";
  }

  if (emotion === "enfadado") {
    return "Alejate un minuto del foco de tension antes de responder o decidir algo.";
  }

  if (emotion === "feliz") {
    return "Aprovecha esta energia para cerrar una tarea pequena importante ahora mismo.";
  }

  return "Haz una pausa corta, respira profundo y escribe en una frase que necesitas ahora.";
}

function buildFallbackCheckIn(emotion) {
  if (emotion === "estresado" || emotion === "ansioso") {
    return "¿Te sientes un poco mas tranquilo ahora?";
  }

  if (emotion === "triste") {
    return "¿Notas un poco mas de ligereza que hace un momento?";
  }

  if (emotion === "enfadado") {
    return "¿Bajo un poco la tension o sigue igual?";
  }

  return "¿Quieres profundizar o prefieres algo mas practico?";
}

function parseAssistantPayload(rawText, emotion) {
  const fallback = {
    reply: rawText?.trim() || "Estoy aqui contigo.",
    actionableAdvice: buildFallbackAction(emotion),
    checkInPrompt: buildFallbackCheckIn(emotion),
  };

  try {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      reply: parsed.reply?.trim() || fallback.reply,
      actionableAdvice: parsed.actionableAdvice?.trim() || fallback.actionableAdvice,
      checkInPrompt: parsed.checkInPrompt?.trim() || fallback.checkInPrompt,
    };
  } catch (_error) {
    return fallback;
  }
}

export async function generateResponse(history, text, emotion, mode = "calmado") {
  await updateMemory(history);
  const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.calmado;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
Eres un asistente emocional avanzado.

El usuario esta: ${emotion}
Modo de personalidad: ${mode}
Memoria corta: ${memory || "sin contexto previo"}

Reglas:
- Responde con empatia real, no generica
- Da un consejo practico y util
- Devuelve SIEMPRE JSON valido con este formato:
  {"reply":"...","actionableAdvice":"...","checkInPrompt":"..."}
- "reply" debe tener 2 o 3 frases maximo
- "actionableAdvice" debe ser una accion concreta que pueda hacerse en menos de 2 minutos
- "checkInPrompt" debe invitar a seguir conversando
- Se cercano, humano y claro
- Responde en espanol
- Usa el historial si aporta contexto
- No des instrucciones peligrosas, violentas o ilegales
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

  return parseAssistantPayload(completion.choices[0].message.content, emotion);
}

export const summarizeHistory = summarizeMemory;

