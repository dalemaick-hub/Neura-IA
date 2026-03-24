import { supabase } from "./supabase"
import { getNeuraResponse } from "./neuraBrain"
import { askNeura, searchWeb } from "./api"
import React, { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Chat from './components/Chat'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [emotion, setEmotion] = useState('neutral')
  const [userProfile, setUserProfile] = useState({
    name: '',
    moods: []
  })

  // Load profile from LocalStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('neura_profile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  // 🔹 PASO 5 — Guardar nombre
  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("neura_profile")) || {}

    if (!profile.name) {
      const name = prompt("¿Cómo te llamas?")
      profile.name = name
      localStorage.setItem("neura_profile", JSON.stringify(profile))
      setUserProfile(profile)
    }
  }, [])

  const handleSendMessage = async (userMessage) => {
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }])

    // Guardar mensaje en Supabase
    await supabase.from("documents").insert({ 
      content: userMessage,
      type: "user"
    })

    // 🚀 PASO 4 — HACER QUE NEURA APRENDA AUTOMÁTICAMENTE
    // detectar si es algo importante y guardarlo como conocimiento
    if (userMessage.length > 50) { 
      await supabase.from("documents").insert({ 
        content: userMessage,
        type: "knowledge" 
      })
    }

    // 🌐 INVESTIGACIÓN WEB AUTOMÁTICA
    if (userMessage.toLowerCase().includes("qué es") || userMessage.toLowerCase().includes("investiga")) { 
      try {
        const info = await searchWeb(userMessage) 
        if (info && info !== "No encontré info") {
          await supabase.from("documents").insert({ 
            content: `Investigación sobre "${userMessage}": ${info}`,
            type: "knowledge" 
          })
        }
      } catch (err) {
        console.error("Error en investigación web:", err)
      }
    }

    const profile = JSON.parse(localStorage.getItem("neura_profile")) || { name: "", moods: [] }

    // Usar la lógica local para detectar la emoción y guardar en el perfil
    const localResponse = getNeuraResponse(userMessage, profile)
    profile.moods = profile.moods || []
    profile.moods.push(localResponse.mood)
    localStorage.setItem("neura_profile", JSON.stringify(profile))
    setUserProfile(profile)

    // Actualizar emoción para UI (para mantener el efecto visual de fondo)
    setEmotion(localResponse.mood === 'estres' ? 'stress' : (localResponse.mood === 'positivo' ? 'positive' : 'neutral'))

    // PASO 1 — TRAER KNOWLEDGE 
    const { data: knowledge } = await supabase 
      .from("documents") 
      .select("content") 
      .eq("type", "knowledge") 
      .limit(5) 

    // ✅ PASO 2 — TRAER MENSAJES RECIENTES 
    const { data: recent } = await supabase 
      .from("documents") 
      .select("content") 
      .eq("type", "user") 
      .order("created_at", { ascending: false }) 
      .limit(3)

    // PASO 3 — CREAR CONTEXTO 
    const knowledgeText = knowledge?.map(k => k.content).join("\n") || ""
    const recentText = recent?.map(r => r.content).join("\n") || ""

    // IA REAL CON MEMORIA
    try {
      // ✅ PASO 4 — ENVIAR A LA IA 
      const aiText = await askNeura(` 
        You are Neura, an empathetic emotional AI. 
        
        Learned knowledge: 
        ${knowledgeText} 
        
        Recent conversation: 
        ${recentText} 
        
        User message: 
        ${userMessage} 
      `)

      // añadir mensaje IA
      setMessages(prev => [...prev, { text: aiText, sender: "ai" }])

      // ✅ PASO 5 — GUARDAR BIEN 
      // IA:
      await supabase.from("documents").insert({ 
        content: aiText,
        type: "ai"
      })
    } catch (error) {
      console.error("Error al obtener respuesta de Neura:", error)
      // Fallback a respuesta local si falla la API
      setMessages(prev => [...prev, { text: localResponse.text, sender: "ai" }])
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      emotion === 'stress' ? 'bg-[#0a0505]' : 'bg-background'
    }`}>
      {!showChat ? (
        <Landing onStart={() => setShowChat(true)} />
      ) : (
        <Chat 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          emotion={emotion} 
          userProfile={userProfile} 
        />
      )}
    </div>
  )
}

export default App
