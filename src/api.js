// src/api.js 
 
// La palabra 'export' es lo que permite que App.jsx importe esta función 
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
      throw new Error('Error en la comunicación con la API'); 
    } 

    const data = await response.json(); 
    return data.text; // Este es el texto que viene de Groq 
  } catch (error) { 
    console.error("Error en askNeura:", error); 
    throw error; 
  } 
};