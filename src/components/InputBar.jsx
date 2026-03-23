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
    <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/80 to-transparent z-40">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="glass-panel border border-outline-variant/30 rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe lo que sientes..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-primary-dim text-on-primary-container flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
          >
            <span className="material-symbols-outlined text-2xl">send</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default InputBar
