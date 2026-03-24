import { OpenAI } from "openai"; 
import { OpenAIEmbeddings } from "@langchain/openai"; 
import { supabase } from "./lib/supabase"; 

const openai = new OpenAI({ 
  apiKey: "TU_OPENAI_API_KEY_AQUI", // Asegúrate de configurar esto
  dangerouslyAllowBrowser: true // Necesario para ejecutar en el cliente (Vite)
}); 

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: "TU_OPENAI_API_KEY_AQUI", // Asegúrate de configurar esto
});

export async function askNeura(message, profile = {}) { 
  // --- PASO A: BUSCAR EN LA MEMORIA DE SUPABASE --- 
  const queryEmbedding = await embeddings.embedQuery(message); 

  const { data: recuerdos } = await supabase.rpc('match_neura_memory', { 
    query_embedding: queryEmbedding, 
    match_threshold: 0.5, // Nivel de coincidencia 
    match_count: 3,        // Cuántos datos recordar 
  }); 

  // Convertimos los recuerdos en un solo texto 
  const contextoMemoria = recuerdos?.map(r => r.content).join("\n") || "No hay datos previos."; 

  // --- PASO B: CONECTAR CON LA IA (OpenAI) --- 
  const response = await openai.chat.completions.create({ 
    model: "gpt-3.5-turbo", // O gpt-4 
    messages: [ 
      { 
        role: "system", 
        content: `Eres NEURA. Tu memoria actual contiene esto: ${contextoMemoria}. 
        Usa esta información para dar respuestas personalizadas y aprender del usuario.
        
        Información del usuario:
        Nombre: ${profile.name || "Usuario"}
        Historial emocional reciente: ${profile.moods?.slice(-5).join(", ") || "neutral"}

        Hablas de forma cercana, humana y empática. 
        Nunca repites lo mismo. 
        Adaptas tus respuestas al estado emocional del usuario.` 
      }, 
      { 
        role: "user", 
        content: message 
      } 
    ], 
  }); 

  const aiText = response.choices[0].message.content; 

  // --- PASO C: AUTO-ALIMENTACIÓN (La parte clave) --- 
  // Esto guarda la respuesta para que NEURA la "recuerde" la próxima vez 
  try {
    await supabase.from('neura_memory').insert({ 
      content: `El usuario preguntó: ${message}. NEURA respondió: ${aiText}`, 
      embedding: queryEmbedding, // Reutilizamos el vector de la pregunta
      metadata: { 
        user: profile.name || "Usuario",
        type: "auto_learned"
      }
    });
  } catch (err) {
    console.error("Error al auto-alimentar la memoria:", err);
  }

  return aiText; 
} 

export async function saveNeuraMemory(content, metadata = {}) {
  const embedding = await embeddings.embedQuery(content);

  const { error } = await supabase.from('neura_memory').insert({ 
    content, 
    embedding, 
    metadata 
  });

  if (error) {
    console.error("Error al guardar memoria en Supabase:", error);
    throw error;
  }
}

export async function searchWeb(query) { 
  const res = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json`) 
  const data = await res.json() 

  return data.Abstract || "No encontré info" 
} 
