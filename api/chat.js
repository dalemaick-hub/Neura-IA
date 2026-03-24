import Groq from "groq-sdk"; 
 
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 
 
export default async function handler(req, res) { 
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed'); 
  
  try { 
    const { message } = req.body; 

    const completion = await groq.chat.completions.create({ 
      messages: [{ role: "user", content: message }], 
      model: "llama3-8b-8192", 
    }); 

    const responseText = completion.choices[0]?.message?.content || "No pude pensar nada."; 
    return res.status(200).json({ text: responseText }); 
    
  } catch (error) { 
    console.error("Error en Groq:", error); 
    return res.status(500).json({ error: error.message }); 
  } 
}