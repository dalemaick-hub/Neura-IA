const API_URL = "https://neura-ia.onrender.com";

export async function askNeura(message) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      user_id: "user_123",
    }),
  });

  if (!res.ok) {
    throw new Error("Error en API");
  }

  return res.json();
}