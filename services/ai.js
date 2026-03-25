import Groq from "groq-sdk"; 
 
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY, 
}); 

// 1. Variable global de memoria (En un entorno serverless como Render, esto se mantiene mientras la instancia esté viva)
let memory = ""; 

/**
 * 2. Función para resumir la memoria (rápida y barata)
 */
async function summarizeMemory(history) { 
  const summaryPrompt = ` 
  Resume la siguiente conversación en máximo 5 líneas. 
  Mantén solo información importante sobre el usuario, gustos, datos personales, estilo de hablar y temas clave. 

  Conversación: 
  ${history.map(m => `${m.role}: ${m.content}`).join("\n")} 
  `; 

  const completion = await groq.chat.completions.create({ 
    model: "llama-3.1-8b-instant", 
    messages: [ 
      { role: "system", content: "Eres un asistente que resume conversaciones." }, 
      { role: "user", content: summaryPrompt } 
    ] 
  }); 

  return completion.choices[0].message.content; 
} 

/**
 * 3. Función que actualiza la memoria cada X mensajes
 */
async function updateMemory(history) { 
  if (history.length >= 6) { 
    memory = await summarizeMemory(history); 
    // Limpiamos el historial pero dejamos los últimos 2 mensajes para mantener fluidez inmediata
    history.splice(0, history.length - 2); 
  } 
} 

/**
 * 4. Tu función principal usando memoria inteligente
 */
export async function generateResponse(history, message, emotion) { 
  await updateMemory(history); 
 
  const completion = await groq.chat.completions.create({ 
    model: "llama-3.1-8b-instant", 
    messages: [ 
      { role: "system", content: `Eres Neura, una IA empática. Memoria del usuario: ${memory}. Estado emocional: ${emotion}` }, 
      ...history, 
      { role: "user", content: message } 
    ] 
  }); 
 
  return completion.choices[0].message.content; 
}

// Mantener por compatibilidad si se usa en otros sitios
export const summarizeHistory = summarizeMemory;