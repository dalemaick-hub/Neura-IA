import Groq from "groq-sdk"; 

const groq = new Groq({ 
  apiKey: "TU_GROQ_API_KEY_AQUI", // Asegúrate de configurar esto
  dangerouslyAllowBrowser: true 
}); 

export async function askNeura(message, profile = {}) { 
  try { 
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "Eres Neura, una IA empática."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const data = await response.json();
    return data.text;
  } catch (error) { 
    console.error("Error en la IA:", error);
    throw error;
  } 
}

// Mantengo estas funciones vacías o simples para no romper App.jsx si se llaman
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
