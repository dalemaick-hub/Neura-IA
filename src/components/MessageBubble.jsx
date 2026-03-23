import React from 'react'

const MessageBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md ${
          isUser 
            ? 'bg-primary/20 border border-primary/30 text-on-surface' 
            : 'bg-surface-variant/40 border border-outline-variant/20 text-on-surface-variant'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
        <span className="text-[10px] opacity-50 mt-2 block text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

export default MessageBubble
