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

export default function LandingHero({ onOpenChat }) {
  const [demoInput, setDemoInput] = useState("");
  const [demoMessages, setDemoMessages] = useState([
    { role: "assistant", content: "¿Cómo te sientes hoy? Cuéntame lo que quieras. 💜" }
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
      setDemoMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } catch (error) {
      setDemoMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tuve un problema de conexión." }]);
    } finally {
      setIsDemoTyping(false);
    }
  };

  return (
    <header id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-30 scale-105"
          src="/assets/imagen.png"
          alt="Fondo abstracto con nebulosas púrpura"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background"></div>
      </div>

      <div className="absolute inset-0 hero-gradient"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse pulse-orb"></span>
          <span className="text-sm font-medium tracking-wide text-primary">IA Empática · Disponible ahora</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-surface mb-6 leading-none">
          NEURA — <span className="text-gradient">La IA que te entiende.</span>
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          No es solo inteligencia artificial. Es un acompañante emocional diseñado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
        </p>

        <div
          id="chat-demo"
          className="max-w-2xl mx-auto rounded-[1.75rem] p-4 md:p-5 mb-10 bg-[rgba(22,26,33,0.85)] backdrop-blur-[20px] border border-[rgba(189,157,255,0.15)] shadow-[0_25px_70px_rgba(5,8,18,0.45)]"
        >
          <div className="min-h-[72px] flex flex-col gap-3 mb-4 text-left">
            {demoMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-2.5"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-dim to-tertiary flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                    N
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 text-sm leading-6 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-primary-dim to-primary text-white rounded-[1rem] rounded-br-md"
                    : "bg-[rgba(34,38,47,0.9)] text-on-surface rounded-[1rem] rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isDemoTyping && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-dim to-tertiary flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  N
                </div>
                <div className="flex items-center gap-1 rounded-[1rem] rounded-tl-none bg-[rgba(34,38,47,0.9)] px-4 py-3">
                  <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-primary [animation-delay:0.2s]"></span>
                  <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-primary [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2.5 items-center">
            <input
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendDemoMessage()}
              placeholder="Escribe algo... (ej: estoy estresado)"
              className="flex-1 rounded-full border border-primary/20 bg-[rgba(34,38,47,0.8)] px-5 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary/50"
            />
            <button
              onClick={sendDemoMessage}
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-dim to-primary text-on-primary-container transition-transform hover:scale-105"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold text-lg shadow-[0_20px_40px_-15px_rgba(189,157,255,0.4)] hover:scale-105 transition-transform"
          >
            Empieza ahora
          </button>
          <button
            onClick={() => document.getElementById("sobre-neura")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-10 py-5 rounded-full glass-panel border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-bright transition-colors"
          >
            Descubre NEURA
          </button>
        </div>
      </div>
    </header>
  );
}
