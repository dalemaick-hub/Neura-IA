import { askNeura } from "./api.js";
import { supabase } from "./supabase";
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Chat from './components/Chat';

function App() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [emotion, setEmotion] = useState('neutral')
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({ name: '', moods: [] })

  useEffect(() => {
    const savedProfile = localStorage.getItem('neura_profile')
    if (savedProfile) setUserProfile(JSON.parse(savedProfile))
  }, [])

  const handleSendMessage = async (userMessage) => {
    // 1. Mostrar mensaje del usuario inmediatamente
    setMessages(prev => [...prev, { sender: "user", text: userMessage }])
    setLoading(true)

    try {
      // 2. LLAMAR A LA IA (Usando el nuevo formato de respuesta)
      const data = await askNeura(userMessage)

      // 3. MOSTRAR RESPUESTA IA Y ACTUALIZAR EMOCIÓN
      setMessages(prev => [
        ...prev, 
        { sender: "ai", text: data.response }
      ])
      
      if (data.emotion) setEmotion(data.emotion)

    } catch (error) {
      console.error("Fallo:", error)
      setMessages(prev => [...prev, { sender: "ai", text: "Error de conexión con Neura 😢" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-background`}>
      {!showChat ? (
        <Landing onStart={() => setShowChat(true)} />
      ) : (
        <Chat 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          emotion={emotion} 
          userProfile={userProfile} 
          loading={loading}
        />
      )}
    </div>
  )
}

export default App