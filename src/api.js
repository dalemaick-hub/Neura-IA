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
            Eres Neura, una IA emocional avanzada y empática. 
            
            - Tu objetivo es ser una compañera de apoyo para el usuario.
            - Nunca repites respuestas de forma idéntica. 
            - Te adaptas al estado emocional del usuario. 
            - Suenas natural, humana y comprensiva.
            - El usuario se llama: ${profile.name || 'Amigo'}.
            - Usa la memoria reciente proporcionada para mantener el hilo de la conversación.
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

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }
