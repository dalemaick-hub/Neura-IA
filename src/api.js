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
            content: `
            You are Neura, an advanced emotional AI.
            
            You NEVER repeat the same answer.
            You adapt to the user.
            You use memory and context.
            You respond naturally and differently each time.
            `
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

export async function getEmbedding(text) { 
  try { 
    const response = await fetch("https://api.openai.com/v1/embeddings", { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer TU_OPENAI_API_KEY_AQUI` 
      }, 
      body: JSON.stringify({ 
        model: "text-embedding-3-small", 
        input: text 
      }) 
    }); 
    const data = await response.json(); 
    return data.data[0].embedding; 
  } catch (error) { 
    console.error("Error al obtener embedding:", error); 
    return null; 
  } 
}

// Mantengo estas funciones vacías o simples para no romper App.jsx si se llaman
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
