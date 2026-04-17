import express from "express";
import { detectEmotion } from "../services/emotion.js";
import { clearSessionData, getOrCreateSession } from "../services/sessionMemory.js";
import { generateResponse } from "../services/ai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, mode, sessionId } = req.body;

    if (!sessionId || !String(sessionId).trim()) {
      return res.status(400).json({
        error: "Falta sessionId",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Mensaje invalido",
      });
    }

    await getOrCreateSession(
      sessionId,
      req.get("user-agent"),
      req.get("x-forwarded-for") || req.ip,
    );

    const emotion = await detectEmotion(message);
    const result = await generateResponse(sessionId, message, emotion, mode);

    return res.json({
      emotion,
      response: result.reply,
      actionableAdvice: result.actionableAdvice,
      checkInPrompt: result.checkInPrompt,
      mode: mode || "calmado",
      sessionId,
    });
  } catch (error) {
    console.error("ERROR REAL EN BACKEND:", error);
    
    // Si el error viene de OpenAI, capturamos su mensaje específico
    const errorMessage = error.error?.message || error.message || "Error desconocido en el servidor";
    const statusCode = error.status || 500;

    return res.status(statusCode).json({
      error: errorMessage,
      type: error.type || "server_error"
    });
  }
});

router.delete("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId || !sessionId.trim()) {
      return res.status(400).json({ error: "Falta sessionId" });
    }

    await clearSessionData(sessionId);

    return res.json({ ok: true });
  } catch (error) {
    console.error("No se pudo limpiar la sesion:", error);
    return res.status(500).json({ error: error.message || "No se pudo limpiar la sesion" });
  }
});

export default router;
