const API_URL = import.meta.env.VITE_API_URL || "https://neura-ia.onrender.com"; 
  
export async function askNeura(message) { 
  try { 
    const res = await fetch(`${API_URL}/chat`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({ 
        message, 
        user_id: "user_123", 
      }), 
    }); 
 
    if (!res.ok) { 
      throw new Error("Error en la respuesta del servidor"); 
    } 
 
    return await res.json(); 
  } catch (error) { 
    console.error("Error:", error); 
    return { 
      response: "Error conectando con Neura 😢", 
    }; 
  } 
} 

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }