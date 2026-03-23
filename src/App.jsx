import React, { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Chat from './components/Chat'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [emotion, setEmotion] = useState('neutral')
  const [userProfile, setUserProfile] = useState({
    name: '',
    moodHistory: [],
    preferences: []
  })

  // Load profile from LocalStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Save profile to LocalStorage when it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
  }, [userProfile])

  const detectEmotion = (text) => {
    const stressWords = ['cansado', 'estresado', 'mal', 'agobiado', 'triste', 'ansioso', 'preocupado', 'frustrado']
    const positiveWords = ['feliz', 'bien', 'genial', 'excelente', 'motivado', 'alegre', 'contento', 'entusiasmado']

    const lowerText = text.toLowerCase()
    
    if (stressWords.some(word => lowerText.includes(word))) {
      return 'stress'
    } else if (positiveWords.some(word => lowerText.includes(word))) {
      return 'positive'
    }
    return 'neutral'
  }

  const handleSendMessage = (text) => {
    const userMessage = {
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    const detectedEmotion = detectEmotion(text)
    setEmotion(detectedEmotion)

    // Update mood history
    if (detectedEmotion !== 'neutral') {
      setUserProfile(prev => ({
        ...prev,
        moodHistory: [...prev.moodHistory, { mood: detectedEmotion, timestamp: new Date().toISOString() }]
      }))
    }

    setMessages(prev => [...prev, userMessage])

    // Simulated IA Response
    setTimeout(() => {
      let aiResponseText = ''
      
      if (detectedEmotion === 'stress') {
        aiResponseText = "Entiendo que te sientas así. Respira profundo, estoy aquí para apoyarte. ¿Quieres hablar más sobre eso?"
      } else if (detectedEmotion === 'positive') {
        aiResponseText = "¡Qué alegría escucharlo! Me encanta verte con esa energía. ¿Qué te hace sentir así?"
      } else {
        aiResponseText = "Te escucho. Gracias por compartir eso conmigo. Cuéntame más."
      }

      const aiMessage = {
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
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
