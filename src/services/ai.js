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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "No se pudo analizar el mensaje.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al consultar la IA:", error);
    
    let userFriendlyResponse = "Error conectando con Neura";
    let actionableAdvice = "Respira profundo una vez y vuelve a intentarlo en unos segundos.";

    if (error.message.includes("Failed to fetch")) {
      userFriendlyResponse = "No pude contactar con Neura. Es posible que el servidor esté despertando (tarda unos 40s) o haya un problema de conexión.";
    } else if (error.message.includes("401") || error.message.toLowerCase().includes("api key")) {
      userFriendlyResponse = "Hay un problema con la llave de acceso (API Key) de OpenAI.";
      actionableAdvice = "Por favor, revisa la configuración de las variables de entorno en el servidor.";
    } else if (error.message.includes("insufficient_quota")) {
      userFriendlyResponse = "La cuenta de OpenAI se ha quedado sin saldo o cuota.";
      actionableAdvice = "Revisa el panel de facturación de OpenAI.";
    }

    return {
      emotion: "neutral",
      response: userFriendlyResponse,
      actionableAdvice: actionableAdvice,
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
