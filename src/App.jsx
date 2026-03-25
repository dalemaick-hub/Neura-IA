import { supabase } from "./supabase"
import { getNeuraResponse } from "./neuraBrain"
import { askNeura } from "./api" // Simplificado para que funcione
import React, { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Chat from './components/Chat'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [emotion, setEmotion] = useState('neutral')
  const [userProfile, setUserProfile] = useState({ name: '', moods: [] })

  useEffect(() => {
    const savedProfile = localStorage.getItem('neura_profile')
    if (savedProfile) setUserProfile(JSON.parse(savedProfile))
  }, [])

  const handleSendMessage = async (userMessage) => {
    // 1. Mostrar mensaje del usuario inmediatamente
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }])

    try {
      // 2. RECUPERAR MEMORIA (COMENTADO TEMPORALMENTE)
      /*
      const { data: memoryData } = await supabase
        .from("neura_memory")
        .select("content")
        .order("created_at", { ascending: false })
        .limit(3)

      const memory = memoryData ? memoryData.reverse().map(m => m.content).join("\n") : ""
      */

      // 3. GUARDAR EN SUPABASE (COMENTADO TEMPORALMENTE)
      /*
      await supabase.from("neura_memory").insert([{ 
        content: userMessage, 
        user: userProfile.name || 'Usuario' 
      }])
      */

      // 4. LLAMAR A LA IA (Simplificado)
      const data = await askNeura(userMessage)
      const aiText = data.response; // Extraemos el texto de la respuesta del backend
      const aiEmotion = data.emotion; // Extraemos la emoción

      // 5. MOSTRAR RESPUESTA IA
      setMessages(prev => [...prev, { text: aiText, sender: "ai" }])
      if (aiEmotion) setEmotion(aiEmotion)

      // 6. GUARDAR RESPUESTA IA EN SUPABASE (COMENTADO TEMPORALMENTE)
      /*
      await supabase.from("neura_memory").insert([{ 
        content: aiText, 
        user: 'Neura' 
      }])
      */

    } catch (error) {
      console.error("Fallo:", error)
      setMessages(prev => [...prev, { text: "Error de conexión", sender: "ai" }])
    }
  }

  return (
    <div className={`min-h-screen bg-background`}>
      {!showChat ? (
        <Landing onStart={() => setShowChat(true)} />
      ) : (
        <Chat messages={messages} onSendMessage={handleSendMessage} emotion={emotion} userProfile={userProfile} />
      )}
    </div>
  )
}

export default App