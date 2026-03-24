import express from "express"; 
import { detectEmotion } from "../services/emotion.js"; 
import { generateResponse } from "../services/ai.js"; 
import { supabase } from "../config/supabase.js"; 

const router = express.Router(); 

router.post("/", async (req, res) => { 
  try { 
    const { message, user_id } = req.body; 

    const emotion = detectEmotion(message); 

    const responseAI = await generateResponse(message, emotion); 

    // Guardar en Supabase 
    if (supabase) {
      await supabase.from("messages").insert([ 
        { 
          user_id, 
          message, 
          response: responseAI, 
          emotion, 
        }, 
      ]); 
    }

    res.json({ 
      emotion, 
      response: responseAI, 
    }); 
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ error: "Error en el chat" }); 
  } 
}); 

export default router;