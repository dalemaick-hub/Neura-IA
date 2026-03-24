// src/api.js 
export const askNeura = async (message) => { 
  try { 
    const response = await fetch('/api/chat', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ message }) 
    }); 
    
    if (!response.ok) throw new Error('Error en la comunicación con la IA'); 
    
    const data = await response.json(); 
    return data.text; 
  } catch (error) { 
    console.error("Error en askNeura:", error); 
    throw error; 
  } 
}; 

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }