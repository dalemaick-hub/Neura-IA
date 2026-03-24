export async function askNeura(message, profile = {}, content = null) { 
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
            
            You never repeat answers. 
            You always respond differently. 
            You adapt to the user emotionally. 
            You sound natural, human and supportive. 
            `
          },
          {
            role: "user",
            content: message
          }
        ],
        content: content
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

// Funciones vacías para evitar errores de importación
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }
