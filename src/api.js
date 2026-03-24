// src/api.js 
 
// IMPORTANTE: El 'export' al principio permite que App.jsx lo vea 
export const askNeura = async (message) => { 
  try { 
    const response = await fetch('/api/chat', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ message }), 
    }); 

    if (!response.ok) { 
      throw new Error('Error en la respuesta de la IA'); 
    } 

    const data = await response.json(); 
    return data.text; // Retorna el texto que viene de Groq 
  } catch (error) { 
    console.error("Error en askNeura:", error); 
    throw error; 
  } 
};