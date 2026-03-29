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
      <div className="flex-1 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe lo que sientes..."
          className="w-full bg-transparent px-1 py-2 text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={!input.trim()}
        className="rounded-full bg-[#b47bff] px-5 py-3 text-white shadow-md transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        Enviar
      </button>
    </form>
  );
};

export default InputBar;
