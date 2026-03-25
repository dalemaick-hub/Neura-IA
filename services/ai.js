import Groq from "groq-sdk"; 
 
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY, 
}); 
 
/**
 * Genera una respuesta empática basada en el mensaje, la emoción y la memoria previa.
 */
export async function generateResponse(message, emotion, memory = "") { 
  const systemPrompt = `Eres Neura, una IA emocional y empática que ayuda emocionalmente.
  
  ${memory ? `Memoria del usuario (lo que sabes de él): ${memory}` : ""}
  
  Estado emocional detectado: ${emotion}.
  Responde con cercanía, validando sus sentimientos.`;

  const completion = await groq.chat.completions.create({ 
    model: "llama-3.1-8b-instant", 
    messages: [ 
      { 
        role: "system", 
        content: systemPrompt
      }, 
      { 
        role: "user", 
        content: message 
      } 
    ], 
  }); 
 
  return completion.choices[0].message.content; 
}

/**
 * Crea un resumen de los puntos clave de la conversación para la memoria a largo plazo.
 */
export async function summarizeHistory(history) {
  if (!history || history.length === 0) return "";

  const historyText = history.map(h => `${h.user}: ${h.content}`).join("\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "Resume los puntos clave de esta conversación (gustos, datos personales, estado emocional, temas importantes) en una o dos frases cortas para usar como memoria futura. Responde solo con el resumen."
      },
      {
        role: "user",
        content: historyText
      }
    ],
  });

  return completion.choices[0].message.content;
}