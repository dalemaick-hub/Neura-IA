const API_URL = "https://neura-ia.onrender.com"; 
  
export async function askNeura(message, emotion) { 
  try { 
    const res = await fetch(`${API_URL}/api/chat`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({ 
        message, 
        emotion 
      }), 
    }); 
 
    if (!res.ok) { 
      const text = await res.text();
      console.error("ERROR BACKEND:", text);
      return {
        response: "Error real: " + text
      };
    } 
 
    return await res.json(); 
  } catch (error) { 
    console.error("Error:", error); 
    return { 
      response: "Error conectando con Neura", 
    }; 
  } 
} 

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }
