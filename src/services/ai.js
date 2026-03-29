const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function buildChatPayload(message, mode, sessionId) {
  return { message, mode, sessionId };
}

export async function analizarEmocion(texto, mode = "calmado", sessionId) {
  const normalizedText = texto?.trim();

  if (!normalizedText) {
    return {
      emotion: "neutral",
      response: "",
      actionableAdvice: "",
      checkInPrompt: "",
      mode,
      sessionId,
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildChatPayload(normalizedText, mode, sessionId)),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "No se pudo analizar el mensaje.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al consultar la IA:", error);
    return {
      emotion: "neutral",
      response: "Error conectando con Neura",
      actionableAdvice: "Respira profundo una vez y vuelve a intentarlo en unos segundos.",
      checkInPrompt: "¿Quieres que lo intentemos otra vez?",
      mode,
      sessionId,
    };
  }
}

export async function resetNeuraSession(sessionId) {
  if (!sessionId) {
    return;
  }

  try {
    await fetch(`${API_URL}/api/chat/session/${sessionId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("No se pudo limpiar la sesion de Neura:", error);
  }
}

export async function askNeura(message, mode = "calmado", sessionId) {
  return analizarEmocion(message, mode, sessionId);
}

export async function saveNeuraMemory() {
  return;
}

export async function searchWeb() {
  return "No encontre info";
}

export async function getEmbedding() {
  return null;
}
