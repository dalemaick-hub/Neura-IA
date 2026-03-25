import React, { useState, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'

const Chat = ({ messages, onSendMessage, emotion, userProfile, loading }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const getThemeClasses = () => {
    switch (emotion) {
      case 'stress':
        return 'bg-slate-950/90 border-red-500/20 shadow-red-500/10'
      case 'positive':
        return 'bg-blue-950/60 border-primary/30 shadow-primary/20'
      default:
        return 'bg-surface-container/60 border-outline-variant/10'
    }
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col pt-20 pb-24 transition-colors duration-1000 ${
      emotion === 'stress' ? 'bg-[#0a0505]' : 'bg-background'
    }`}>
      {/* Dynamic Background */}
      <div className={`absolute inset-0 z-0 pointer-events-none opacity-30 blur-[100px] transition-all duration-1000 ${
        emotion === 'stress' ? 'bg-red-900/40' : emotion === 'positive' ? 'bg-primary/40' : 'bg-indigo-900/20'
      }`}></div>

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center text-on-primary-container font-black shadow-lg">N</div>
            <div>
              <div className="text-lg font-bold font-headline leading-none">NEURA</div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${emotion === 'stress' ? 'bg-red-500' : 'bg-primary'}`}></span>
                {emotion === 'stress' ? 'Modo Calma' : 'Conectada'}
              </div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-on-surface-variant font-medium uppercase tracking-tighter">Bienvenido, {userProfile.name || 'Viajero'}</div>
            <div className="text-[10px] opacity-40 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
          </div>
        </div>
      </nav>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-6 py-8 scrollbar-hide max-w-4xl mx-auto w-full"
      >
        <div className="flex flex-col gap-2">
          {messages.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-surface-variant/40 border border-outline-variant/20 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary opacity-50">auto_awesome</span>
              </div>
              <h2 className="text-2xl font-bold font-headline mb-2 text-on-surface">¿Cómo te sientes hoy?</h2>
              <p className="text-on-surface-variant max-w-xs mx-auto text-sm">Cuéntame lo que tienes en mente. Estoy aquí para escucharte y apoyarte.</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} isUser={msg.sender === 'user'} />
          ))}
          {loading && (
            <div className="flex justify-start mb-4 animate-pulse">
              <div className="bg-surface-variant/40 border border-outline-variant/20 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <InputBar onSendMessage={onSendMessage} />
    </div>
  )
}

export default Chat
