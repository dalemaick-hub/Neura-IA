import express from "express"; 
import { detectEmotion } from "../services/emotion.js"; 
import { generateResponse } from "../services/ai.js"; 
// import { supabase } from "../config/supabase.js"; // Opcional por ahora

const router = express.Router(); 

// Historial en memoria (volátil, se reinicia con el servidor)
let chatHistory = [];

router.post("/", async (req, res) => { 
  try { 
    const { message } = req.body; 
 
    // 1. Detectar emoción
    const emotion = detectEmotion(message); 
 
    // 2. Generar respuesta usando el historial y memoria inteligente
    const response = await generateResponse(chatHistory, message, emotion); 
 
    // 3. Actualizar historial local para la próxima iteración
    chatHistory.push({ role: "user", content: message });
    chatHistory.push({ role: "assistant", content: response });

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