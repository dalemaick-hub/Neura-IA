import React, { useState } from "react";
import LandingFooter from "./landing/LandingFooter";
import LandingHero from "./landing/LandingHero";
import LandingHighlights from "./landing/LandingHighlights";
import LandingNav from "./landing/LandingNav";
import { analizarEmocion } from "../services/ai";

// Función para generar o recuperar el ID de sesión del visitante
function getSessionId() {
  let id = sessionStorage.getItem('neura_session_id');
  if (!id) {
    id = 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    sessionStorage.setItem('neura_session_id', id);
  }
  return id;
}

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
      const sessionId = getSessionId();
      const result = await analizarEmocion(input, "calmado", sessionId);
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
        open={open}
        onToggleMenu={() => setOpen((value) => !value)}
        onCloseMenu={() => setOpen(false)}
        onOpenChat={openChat}
        onStart={onStart}
      />
      <LandingHero onOpenChat={openChat} />
      <LandingHighlights onOpenChat={openChat} onStart={onStart} />
      <LandingFooter />

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-[#0f1218] border border-primary/15 rounded-[1.75rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex flex-col max-h-[80vh] overflow-hidden">
            <div className="p-5 md:p-6 border-b border-primary/10 flex justify-between items-center bg-[#0f1218]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-tertiary shadow-[0_0_12px_#ff6daf] animate-pulse"></span>
                <div>
                  <h3 className="font-headline font-bold text-white">NEURA</h3>
                  <p className="text-xs text-on-surface-variant">IA Empática · En línea</p>
                </div>
              </div>
              <button onClick={closeChat} className="text-white/40 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-[1.25rem] text-sm leading-6 ${
                    msg.role === "user" 
                      ? "bg-gradient-to-br from-primary-dim to-primary text-white rounded-br-md" 
                      : "bg-surface-variant text-white/90 border border-white/8 rounded-tl-md"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-variant text-white/40 px-4 py-2 rounded-2xl text-xs animate-pulse">
                    NEURA está pensando...
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 md:p-6 border-t border-primary/10 flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribe cómo te sientes..."
                className="flex-1 bg-surface-variant border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button 
                onClick={sendMessage}
                disabled={isTyping}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-dim to-primary text-on-primary-container flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={openChat}
          className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-dim to-tertiary text-white">
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </span>
          Hablar con NEURA
        </button>
      </div>
    </div>
  );
};

export default Landing;
