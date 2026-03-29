import React, { useState } from "react";

const InputBar = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="flex-1 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 backdrop-blur-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe cómo te sientes..."
          className="w-full bg-transparent px-1 py-2 text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={!input.trim()}
        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-white shadow-[0_10px_30px_-12px_rgba(192,132,252,0.8)] transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        ➤
      </button>
    </form>
  );
};

export default InputBar;
