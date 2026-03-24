import { createClient } from "@supabase/supabase-js"; 
import Groq from "groq-sdk"; 
 
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); 
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 
 
export default async function handler(req, res) { 
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" }); 
 
  try { 
    const { messages, content } = req.body; 
 
    // 1. Hablar con Groq 
    const completion = await groq.chat.completions.create({ 
      messages: messages, 
      model: "llama3-8b-8192", 
    }); 
 
    const aiText = completion.choices[0].message.content; 
 
    // 2. Guardar en Supabase (Aquí es donde se llenarán tus datos) 
    if (content) { 
      await supabase.from("neura_memory").insert([{ content: content }]); 
    } 
 
    // 3. Responder al frontend con fecha real 
    return res.status(200).json({ 
      text: aiText, 
      timestamp: new Date().toISOString() 
    }); 
  } catch (error) { 
    console.error("Error crítico:", error); 
    return res.status(500).json({ error: error.message }); 
  } 
}
