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
      // 2. RECUPERAR MEMORIA (Opcional, no bloquea)
      let memoryContext = ""
      try {
        const { data: memoryData } = await supabase
          .from("neura_memory")
          .select("content")
          .order("created_at", { ascending: false })
          .limit(3)
        
        if (memoryData && memoryData.length > 0) {
          memoryContext = "\n\nMemoria reciente:\n" + memoryData.reverse().map(m => m.content).join("\n")
        }
      } catch (memErr) {
        console.warn("No se pudo cargar la memoria:", memErr)
      }

      // 3. GUARDAR MENSAJE USUARIO (No bloquea la IA si falla)
      supabase.from("neura_memory").insert([{ 
        content: userMessage, 
        user: userProfile.name || 'Usuario' 
      }]).then(({ error }) => {
        if (error) console.error("Error al guardar mensaje usuario:", error)
      })

      // 4. LLAMAR A LA IA (Con el contexto si existe)
      const aiText = await askNeura(userMessage + memoryContext)

      // 5. MOSTRAR RESPUESTA IA
      setMessages(prev => [...prev, { text: aiText, sender: "ai" }])

      // 6. GUARDAR RESPUESTA IA (No bloquea)
      supabase.from("neura_memory").insert([{ 
        content: aiText, 
        user: 'Neura' 
      }]).then(({ error }) => {
        if (error) console.error("Error al guardar respuesta IA:", error)
      })

    } catch (error) {
      console.error("Fallo:", error)
      setMessages(prev => [...prev, { text: "Error de conexión con la IA", sender: "ai" }])
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