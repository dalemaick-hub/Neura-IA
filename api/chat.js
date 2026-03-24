const Groq = require("groq-sdk"); 
 
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 
 
export default async function handler(req, res) { 
  if (req.method !== 'POST') return res.status(405).json({ error: 'Solo POST' }); 
  
  try { 
    const { message } = req.body; 
    const completion = await groq.chat.completions.create({ 
      messages: [{ role: "user", content: message }], 
      model: "llama3-8b-8192", 
    }); 

    res.status(200).json({ text: completion.choices[0].message.content }); 
  } catch (error) { 
    res.status(500).json({ error: error.message }); 
  } 
}