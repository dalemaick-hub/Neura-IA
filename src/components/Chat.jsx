import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'

const Chat = ({ messages, onSendMessage, emotion, userProfile, loading }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col gap-6">
      <div ref={scrollRef} className="space-y-4 max-h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} isUser={msg.sender === 'user'} />
        ))}
        {loading && (
          <div className="flex justify-start mb-4 animate-pulse">
            <div className="bg-white/10 border border-white/10 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-200/70 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-200/70 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-200/70 animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <InputBar onSendMessage={onSendMessage} />
    </div>
  )
}

export default Chat
