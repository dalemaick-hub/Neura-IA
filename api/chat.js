import { detectEmotion } from "../server/services/emotion.js";
import { generateResponse } from "../server/services/ai.js";
import { getOrCreateSession } from "../server/services/sessionMemory.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  try {
    const { message, mode, sessionId } = req.body || {};

    if (!sessionId || !String(sessionId).trim()) {
      return res.status(400).json({ error: "Falta sessionId" });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "Mensaje invalido" });
    }

    await getOrCreateSession(
      sessionId,
      req.headers["user-agent"],
      req.headers["x-forwarded-for"] || req.socket?.remoteAddress,
    );

    const emotion = await detectEmotion(message);
    const result = await generateResponse(sessionId, message, emotion, mode);

    return res.status(200).json({
      emotion,
      response: result.reply,
      actionableAdvice: result.actionableAdvice,
      checkInPrompt: result.checkInPrompt,
      mode: mode || "calmado",
      sessionId,
    });
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    return res.status(500).json({ error: error.message || "Error desconocido" });
  }
}
