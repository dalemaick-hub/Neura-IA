import express from "express";
import { detectEmotion } from "../services/emotion.js";
import { generateResponse } from "../services/ai.js";

const router = express.Router();
let chatHistory = [];

router.post("/", async (req, res) => {
  try {
    const { message, mode } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Mensaje invalido",
      });
    }

    const emotion = await detectEmotion(message);
    const result = await generateResponse(chatHistory, message, emotion, mode);

    chatHistory.push({ role: "user", content: message });
    chatHistory.push({ role: "assistant", content: result.reply });

    return res.json({
      emotion,
      response: result.reply,
      actionableAdvice: result.actionableAdvice,
      checkInPrompt: result.checkInPrompt,
      mode: mode || "calmado",
    });
  } catch (error) {
    console.error("ERROR REAL:", error);
    return res.status(500).json({
      error: error.message || "Error desconocido",
    });
  }
});

export default router;
