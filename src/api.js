const API_URL = "https://neura-ia.onrender.com";

export async function askNeura(messages) {
  try {
    const cleanMessages = Array.isArray(messages)
      ? messages.filter(
          (message) =>
            message &&
            typeof message.content === "string" &&
            message.content.trim() !== "",
        )
      : [];

    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: cleanMessages,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("ERROR BACKEND:", text);
      return {
        response: "Error real: " + text,
      };
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return {
      response: "Error conectando con Neura",
    };
  }
}

// Funciones vacias para evitar errores si se llaman en otras partes del codigo
export async function saveNeuraMemory() {
  return;
}

export async function searchWeb() {
  return "No encontre info";
}

export async function getEmbedding() {
  return null;
}
