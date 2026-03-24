export const askNeura = async (message) => { 
  const response = await fetch('/api/chat', { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ message }) 
  }); 
  
  if (!response.ok) throw new Error('Error en la API'); 
  const data = await response.json(); 
  return data.text; 
};

// Funciones vacías para evitar errores si se llaman en otras partes del código
export async function saveNeuraMemory() { return; }
export async function searchWeb() { return "No encontré info"; }
export async function getEmbedding() { return null; }
