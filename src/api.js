import Groq from "groq-sdk"; 
import { OpenAIEmbeddings } from "@langchain/openai"; 
import { supabase } from "./lib/supabase"; 

const groq = new Groq({ 
  apiKey: "TU_GROQ_API_KEY_AQUI", // Asegúrate de configurar esto
  dangerouslyAllowBrowser: true 
}); 

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: "TU_OPENAI_API_KEY_AQUI", // Para embeddings (si decides usarlos)
});

export async function askNeura(message, profile = {}) { 
  // 1. BUSCAR EN LA MEMORIA DE SUPABASE (Búsqueda simple gratuita por texto)
  const { data: recuerdos } = await supabase 
    .from('neura_memory') 
    .select('content') 
    .textSearch('content', message.split(' ').join(' | ')) 
    .limit(3); 
 
  const contexto = recuerdos?.map(r => r.content).join("\n") || ""; 

  // 2. PEDIR RESPUESTA A GROQ (Gratis y rápido) 
  const chatCompletion = await groq.chat.completions.create({ 
    messages: [ 
      { 
        role: "system", 
        content: `Eres NEURA. Tu memoria actual dice: ${contexto}. 
        Sé amable y aprende del usuario.
        
        Información del usuario:
        Nombre: ${profile.name || "Usuario"}
        Historial emocional reciente: ${profile.moods?.slice(-5).join(", ") || "neutral"}

        Hablas de forma cercana, humana y empática. 
        Adaptas tus respuestas al estado emocional del usuario.` 
      }, 
      { 
        role: "user", 
        content: message 
      } 
    ], 
    model: "llama-3-8b-instant", 
  }); 

  const respuestaIA = chatCompletion.choices[0]?.message?.content; 

  // 3. AUTO-ALIMENTACIÓN: Guardar la charla para el futuro 
  try {
    await supabase.from('neura_memory').insert({ 
      content: `Usuario: ${message} | NEURA: ${respuestaIA}`, 
      metadata: { 
        date: new Date().toISOString(),
        user: profile.name || "Usuario"
      } 
    });
  } catch (err) {
    console.error("Error al auto-alimentar la memoria:", err);
  }

  return respuestaIA; 
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
