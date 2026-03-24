const Groq = require("groq-sdk"); 
 
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
}); 
 
export default async function handler(req, res) { 
  try { 
    const { message } = req.body; 

    if (!process.env.GROQ_API_KEY) { 
      return res.status(500).json({ error: "Falta la API KEY en Vercel" }); 
    } 

    const completion = await groq.chat.completions.create({ 
      messages: [{ role: "user", content: message }], 
      model: "llama3-8b-8192", 
    }); 

    return res.status(200).json({ text: completion.choices[0].message.content }); 
  } catch (error) { 
    return res.status(500).json({ error: error.message }); 
  } 
}