import express from "express"; 
import { detectEmotion } from "../services/emotion.js"; 
import { generateResponse } from "../services/ai.js"; 
 
const router = express.Router(); 
 
// 👇 MUY IMPORTANTE: solo "/" 
router.post("/", async (req, res) => { 
  try { 
    const { message } = req.body; 
 
    const emotion = detectEmotion(message); 
    const response = await generateResponse(message, emotion); 
 
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