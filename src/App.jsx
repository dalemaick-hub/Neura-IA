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
      // 2. GUARDAR EN SUPABASE (Tabla correcta: neura_memory)
      await supabase.from("neura_memory").insert([{ 
        content: userMessage, 
        user: userProfile.name || 'Usuario' 
      }])

      // 3. LLAMAR A LA IA (Usando tu función askNeura)
      const aiText = await askNeura(userMessage, userProfile)

      // 4. MOSTRAR RESPUESTA IA
      setMessages(prev => [...prev, { text: aiText, sender: "ai" }])

      // 5. GUARDAR RESPUESTA IA EN SUPABASE
      await supabase.from("neura_memory").insert([{ 
        content: aiText, 
        user: 'Neura' 
      }])

    } catch (error) {
      console.error("Error en el sistema:", error)
      setMessages(prev => [...prev, { text: "Lo siento, tuve un problema al conectar.", sender: "ai" }])
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