import Groq from "groq-sdk"; 
 
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY, 
}); 
 
export async function generateResponse(message, emotion) { 
  const systemPrompt = ` 
Eres Neura, una IA emocional y empática. 
 
Estado emocional detectado: ${emotion} 
 
Responde con empatía, claridad y cercanía. 
No seas genérico. 
 `; 
 
  const chatCompletion = await groq.chat.completions.create({ 
    messages: [ 
      { role: "system", content: systemPrompt }, 
      { role: "user", content: message }, 
    ], 
    model: "llama3-70b-8192", 
  }); 
 
  return chatCompletion.choices[0].message.content; 
}