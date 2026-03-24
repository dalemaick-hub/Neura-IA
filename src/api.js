export async function askNeura(message, profile = {}) { 
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": "Bearer TU_API_KEY" // Sustituir por tu clave de API de Groq
    }, 
    body: JSON.stringify({ 
      model: "llama3-70b-8192", 
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
      ] 
    }) 
  }) 

  const data = await response.json() 
  return data.choices[0].message.content 
}

// Funciones vacías para evitar errores de importación
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }
