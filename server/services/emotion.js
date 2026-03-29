import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const EMOTION_MODEL = process.env.GROQ_EMOTION_MODEL || "llama-3.1-8b-instant";
const EMOTION_PROMPT = "Clasifica la emocion del usuario en una sola palabra: feliz, triste, estresado, ansioso, enfadado o neutral.";

function normalizeEmotion(label) {
  const value = label?.trim().toLowerCase() || "neutral";

  if (value.includes("feliz")) return "feliz";
  if (value.includes("triste")) return "triste";
  if (value.includes("estres")) return "estresado";
  if (value.includes("ans")) return "ansioso";
  if (value.includes("enfad")) return "enfadado";

  return "neutral";
}

export async function detectEmotion(text) {
  if (!text?.trim()) {
    return "neutral";
  }

  try {
    const completion = await groq.chat.completions.create({
      model: EMOTION_MODEL,
      messages: [
        {
          role: "system",
          content: EMOTION_PROMPT,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0,
      max_tokens: 10,
    });

    return normalizeEmotion(completion.choices[0].message.content);
  } catch (error) {
    console.error("No se pudo detectar la emocion con Groq:", error);
    return "neutral";
  }
}
