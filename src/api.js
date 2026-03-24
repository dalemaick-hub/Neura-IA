import Groq from "groq-sdk"; 

const groq = new Groq({ 
  apiKey: "TU_GROQ_API_KEY_AQUI", // Asegúrate de configurar esto
  dangerouslyAllowBrowser: true 
}); 

export async function askNeura(message, profile = {}) { 
  try { 
    const chatCompletion = await groq.chat.completions.create({ 
      model: "llama-3-8b-instant", 
      messages: [
        {
          role: "system",
          content: "Eres Neura, una IA empática."
        },
        {
          role: "user",
          content: message
        }
      ], 
    }); 

    return chatCompletion.choices[0]?.message?.content; 
  } catch (error) { 
    console.error("Error en la IA:", error);
    throw error;
  } 
}

// Mantengo estas funciones vacías o simples para no romper App.jsx si se llaman
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
