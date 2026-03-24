// src/api.js 
export const askNeura = async (message) => { // <--- ¡ESTA PALABRA ES LA CLAVE! 
  try { 
    const response = await fetch('/api/chat', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ message }) 
    }); 
    
    if (!response.ok) throw new Error('Error en la API'); 
    
    const data = await response.json(); 
    return data.text; 
  } catch (error) { 
    console.error("Error:", error); 
    throw error; 
  } 
};