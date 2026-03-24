import { supabase } from "./supabase"
import { getNeuraResponse } from "./neuraBrain"
import { askNeura, searchWeb, saveNeuraMemory } from "./api"
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

    const profile = JSON.parse(localStorage.getItem("neura_profile")) || { name: "", moods: [] }

    // Guardar mensaje en Supabase
    const { data, error } = await supabase.from("documents").insert({ 
      content: userMessage,
      type: "user"
    })
    console.log("SUPABASE RESPONSE (USER):", data, error)

    // 🚀 PASO 4 — HACER QUE NEURA APRENDA AUTOMÁTICAMENTE
    // detectar si es algo importante y guardarlo como conocimiento inteligente (con embeddings)
    if (userMessage.length > 50) { 
      await saveNeuraMemory(userMessage, { 
        type: "knowledge",
        user: profile.name 
      })
    }

    // 🌐 INVESTIGACIÓN WEB AUTOMÁTICA
    if (userMessage.toLowerCase().includes("qué es") || userMessage.toLowerCase().includes("investiga")) { 
      try {
        const info = await searchWeb(userMessage) 
        if (info && info !== "No encontré info") {
          await saveNeuraMemory(`Investigación sobre "${userMessage}": ${info}`, { 
            type: "web_research",
            user: profile.name 
          })
        }
      } catch (err) {
        console.error("Error en investigación web:", err)
      }
    }

    // Usar la lógica local para detectar la emoción y guardar en el perfil
    const localResponse = getNeuraResponse(userMessage, profile)
    profile.moods = [...(profile.moods || []), localResponse.mood]
    localStorage.setItem("neura_profile", JSON.stringify(profile))
    setUserProfile({ ...profile })

    // Actualizar emoción para UI (para mantener el efecto visual de fondo)
    setEmotion(localResponse.mood === 'estres' ? 'stress' : (localResponse.mood === 'positivo' ? 'positive' : 'neutral'))

    // IA REAL CON MEMORIA INTELIGENTE
    try {
      // 🚀 PASO 3 — HACER QUE USE MEMORIA
      const { data: memoryData } = await supabase 
        .from("documents") 
        .select("content") 
        .eq("type", "user") 
        .order("created_at", { ascending: false }) 
        .limit(3) 

      const memory = memoryData ? memoryData.map(d => d.content).join("\n") : ""

      // 🔹 llamar a la IA con contexto de memoria y enviar content para guardado
      const aiText = await askNeura(` 
      Previous messages: 
      ${memory} 
      
      User says: 
      ${userMessage} 
      `, profile, userMessage)

      // añadir mensaje IA
      setMessages(prev => [...prev, { text: aiText, sender: "ai" }])

      // ✅ PASO 5 — GUARDAR BIEN 
      // IA:
      const { data: aiData, error: aiError } = await supabase.from("documents").insert({ 
        content: aiText,
        type: "ai"
      })
      console.log("SUPABASE RESPONSE (AI):", aiData, aiError)

      // Guardar también en memoria inteligente si la respuesta es relevante
      if (aiText.length > 50) {
        await saveNeuraMemory(aiText, { type: "ai_response", user: "Neura" })
      }
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
