// src/api.js 
 
// IMPORTANTE: El 'export' al principio permite que App.jsx lo vea 
export const askNeura = async (message, user_id = "user_123") => { 
  try { 
    // URL base de tu backend en Render
    const API_URL = import.meta.env.VITE_BACKEND_URL || "https://TU-URL.onrender.com";

    const response = await fetch(`${API_URL}/chat`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({ 
        message, 
        user_id 
      }), 
    }); 
 
    if (!response.ok) { 
      throw new Error("Error en la respuesta del servidor"); 
    } 
 
    const data = await response.json(); 
    // Ahora el backend devuelve { emotion, response }
    return data; // Retornamos todo el objeto por si App.jsx necesita la emoción
  } catch (error) { 
    console.error("Error en askNeura:", error); 
    throw error; 
  } 
}; 

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }