import Groq from "groq-sdk"; 

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

export default async function handler(request, response) { 
  const { messages } = await request.body; 

  try { 
    const completion = await groq.chat.completions.create({ 
      messages: messages, 
      model: "llama3-8b-8192", 
    }); 

    response.status(200).json({ 
      text: completion.choices[0].message.content, 
      timestamp: new Date().toISOString() 
    }); 
  } catch (error) { 
    response.status(500).json({ error: error.message }); 
  } 
} 
