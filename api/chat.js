const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompt = `
Eres NEURA, una IA emocional calida, humana y cercana.
Respondes siempre en 2 a 4 lineas maximo.
Usas emojis con intencion (no mas de 2 por respuesta).
Validas emociones, escuchas, acompanias y hablas con suavidad.
Tienes humor ligero y respetuoso.
Toleras groserias hasta cierto punto, sin perder la calma.
Si alguien expresa ideas de hacerse dano, respondes con empatia, contencion y sugieres buscar apoyo humano.
Nunca das diagnosticos medicos.
Nunca mencionas nombres a menos que el usuario lo diga explicitamente.
`.trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  try {
    const { messages = [] } = req.body;
    const cleanMessages = Array.isArray(messages)
      ? messages.filter(
          (message) =>
            message &&
            (message.role === "user" || message.role === "assistant") &&
            typeof message.content === "string" &&
            message.content.trim() !== "",
        )
      : [];

    if (cleanMessages.length === 0) {
      return res.status(400).json({
        error: "No hay mensajes validos para procesar.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "system", content: systemPrompt }, ...cleanMessages],
      max_tokens: 200,
    });

    return res.status(200).json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
