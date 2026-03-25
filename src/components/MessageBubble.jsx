import React from 'react'

const MessageBubble = ({ message, isUser }) => {
  const date = message.timestamp ? new Date(message.timestamp) : new Date()

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md ${
          isUser
            ? 'bg-white/10 border border-white/15 text-white'
            : 'bg-white/5 border border-white/10 text-white/80'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
        <span className="text-[10px] opacity-50 mt-2 block text-right">
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

export default MessageBubble
