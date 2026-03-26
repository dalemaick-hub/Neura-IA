import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'
import ThinkingHeart from './ThinkingHeart'

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
        {loading && <ThinkingHeart />}
      </div>
      <InputBar onSendMessage={onSendMessage} />
    </div>
  )
}

export default Chat
