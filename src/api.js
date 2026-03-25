// src/api.js 

export async function askNeura(message) { 
  const res = await fetch("https://neura-ia.onrender.com/chat", { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify({ 
      message, 
      user_id: "user_123", 
    }), 
  }); 

  return res.json(); 
} 

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }