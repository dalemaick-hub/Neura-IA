export async function askNeura(message) { 
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": "Bearer TU_API_KEY_AQUI" 
    }, 
    body: JSON.stringify({ 
      model: "llama3-70b-8192", 
      messages: [ 
        { 
          role: "system", 
          content: ` 
            Eres Neura, una IA emocional avanzada. 
            Recuerdas conversaciones pasadas. 
            Hablas de forma cercana, humana y empática. 
            Nunca repites lo mismo. 
            Adaptas tus respuestas al estado emocional del usuario. 
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

export async function searchWeb(query) { 
  const res = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json`) 
  const data = await res.json() 

  return data.Abstract || "No encontré info" 
} 
