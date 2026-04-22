import React, { useState } from "react";
import LandingFooter from "./landing/LandingFooter";
import LandingHero from "./landing/LandingHero";
import LandingHighlights from "./landing/LandingHighlights";
import LandingNav from "./landing/LandingNav";
import { analizarEmocion } from "../services/ai";

const Landing = ({ onStart }) => {
  const [open, setOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola, soy NEURA. ¿En qué puedo acompañarte hoy? 💜" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const openChat = () => {
    setShowChatModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeChat = () => {
    setShowChatModal(false);
    document.body.style.overflow = "auto";
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await analizarEmocion(input, "calmado", "landing-demo-" + Date.now());
      setMessages(prev => [...prev, { role: "assistant", content: result.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tuve un problema de conexión. Inténtalo de nuevo." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen overflow-x-hidden selection:bg-primary/30">
      <LandingNav
        onStart={onStart}
        open={open}
        onToggleMenu={() => setOpen((value) => !value)}
        onCloseMenu={() => setOpen(false)}
        onOpenChat={openChat}
      />
      <LandingHero onStart={onStart} onOpenChat={openChat} />
      <LandingHighlights />
      <LandingFooter />

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-sm">N</div>
                <h3 className="font-headline font-bold text-white">Chat con NEURA</h3>
              </div>
              <button onClick={closeChat} className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-on-primary rounded-tr-none" 
                      : "bg-white/5 text-white/90 border border-white/10 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-white/40 px-4 py-2 rounded-2xl text-xs animate-pulse">
                    NEURA está pensando...
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribe algo..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button 
                onClick={sendMessage}
                disabled={isTyping}
                className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
