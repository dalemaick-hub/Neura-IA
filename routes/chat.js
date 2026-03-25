import express from "express"; 
import { detectEmotion } from "../services/emotion.js"; 
import { generateResponse, summarizeHistory } from "../services/ai.js"; 
import { supabase } from "../config/supabase.js"; 
 
const router = express.Router(); 
 
router.post("/", async (req, res) => { 
  try { 
    const { message, user_id = "user_default" } = req.body; 
 
    // 1. Detectar emoción
    const emotion = detectEmotion(message); 
 
    // 2. Recuperar memoria (resumen previo) de Supabase
    let latestSummary = "";
    if (supabase) {
      try {
        const { data: memoryData } = await supabase
          .from("user_memories")
          .select("summary")
          .eq("user_id", user_id)
          .single();
        
        if (memoryData) latestSummary = memoryData.summary;
      } catch (err) {
        console.warn("No se pudo recuperar la memoria previa:", err.message);
      }
    }

    // 3. Generar respuesta usando la memoria
    const response = await generateResponse(message, emotion, latestSummary); 
 
    // 4. Guardar mensajes en el historial (neura_memory)
    if (supabase) {
      try {
        await supabase.from("neura_memory").insert([
          { content: message, user: "Usuario", user_id },
          { content: response, user: "Neura", user_id }
        ]);

        // 5. Actualizar memoria cada 5 mensajes
        const { count } = await supabase
          .from("neura_memory")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user_id);

        if (count > 0 && count % 5 === 0) {
          console.log("Generando nuevo resumen de memoria...");
          const { data: recentHistory } = await supabase
            .from("neura_memory")
            .select("content, user")
            .eq("user_id", user_id)
            .order("created_at", { ascending: false })
            .limit(5);

          const newSummary = await summarizeHistory(recentHistory.reverse());
          
          // Guardar el nuevo resumen (upsert)
          await supabase
            .from("user_memories")
            .upsert({ user_id, summary: newSummary, updated_at: new Date().toISOString() });
        }
      } catch (dbErr) {
        console.error("Error en persistencia de memoria:", dbErr.message);
      }
    }

    res.json({ 
      emotion, 
      response, 
    }); 
  } catch (error) { 
    console.error("ERROR REAL:", error); 
 
    res.status(500).json({ 
      error: error.message || "Error desconocido", 
    }); 
  } 
}); 
 
export default router;