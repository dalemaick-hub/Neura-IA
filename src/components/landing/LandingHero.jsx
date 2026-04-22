import { Link } from "react-router-dom";
import { useState } from "react";
import { analizarEmocion } from "../../services/ai";

// Función para generar o recuperar el ID de sesión del visitante
function getSessionId() {
  let id = sessionStorage.getItem('neura_session_id');
  if (!id) {
    id = 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    sessionStorage.setItem('neura_session_id', id);
  }
  return id;
}

export default function LandingHero({ onStart, onOpenChat }) {
  const [demoInput, setDemoInput] = useState("");
  const [demoMessages, setDemoMessages] = useState([
    { role: "assistant", content: "¿Cómo te sientes hoy? 💜" }
  ]);
  const [isDemoTyping, setIsDemoTyping] = useState(false);

  const sendDemoMessage = async () => {
    if (!demoInput.trim() || isDemoTyping) return;

    const text = demoInput.trim();
    setDemoMessages(prev => [...prev, { role: "user", content: text }]);
    setDemoInput("");
    setIsDemoTyping(true);

    try {
      const sessionId = getSessionId();
      const result = await analizarEmocion(text, "calmado", sessionId);
      setMessages(prev => [...prev, { role: "assistant", content: result.response }]);
    } catch (error) {
      setDemoMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tuve un problema de conexión." }]);
    } finally {
      setIsDemoTyping(false);
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-30 scale-105"
          src="/assets/imagen.png"
          alt="Dreamy abstract background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse pulse-orb"></span>
            <span className="text-sm font-medium tracking-wide text-primary">IA Empática ya disponible</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-6 leading-tight">
            NEURA <br />
            <span className="text-gradient">La IA que te entiende.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed font-light">
            No es solo inteligencia artificial. Es un acompañante emocional diseñado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenChat}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold text-lg shadow-[0_20px_40px_-15px_rgba(189,157,255,0.4)] hover:scale-105 transition-transform"
            >
              Probar NEURA gratis
            </button>
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 rounded-full glass-panel border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-bright transition-colors"
            >
              Comenzar
            </button>
          </div>
        </div>

        {/* Chat Demo */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl rounded-[2.5rem]"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[500px]">
            <div className="p-5 border-b border-white/5 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              <span className="text-xs text-white/30 ml-2 font-mono uppercase tracking-widest">Demo Live</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {demoMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-primary/20 text-primary border border-primary/20 rounded-tr-none" 
                      : "bg-white/5 text-white/80 border border-white/10 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isDemoTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-white/30 px-4 py-2 rounded-2xl text-xs animate-pulse">
                    ...
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 pt-0">
              <div className="relative flex items-center">
                <input 
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendDemoMessage()}
                  placeholder="Dime cómo estás..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors pr-14"
                />
                <button 
                  onClick={sendDemoMessage}
                  className="absolute right-2 w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
