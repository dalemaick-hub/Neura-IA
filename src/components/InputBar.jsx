import React, { useState } from 'react'

const InputBar = ({ onSendMessage }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe lo que sientes..."
        className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="bg-[#b47bff] text-white px-5 py-3 rounded-full shadow-md hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
      >
        Enviar
      </button>
    </form>
  )
}

export default InputBar
