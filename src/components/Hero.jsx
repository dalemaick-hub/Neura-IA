import { Link } from "react-router-dom";
import { useState } from "react";

export default function Hero() {
  const [heroInput, setHeroInput] = useState("");
  const [heroMessages, setHeroMessages] = useState([
    { role: "neura", text: "¿Cómo te sientes hoy? Cuéntame lo que quieras. 💜" },
  ]);
  const [heroLoading, setHeroLoading] = useState(false);

  async function sendHeroMessage() {
    const text = heroInput.trim();
    if (!text || heroLoading) return;

    setHeroInput("");
    setHeroMessages((prev) => [...prev, { role: "user", text }]);
    setHeroLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: getSessionId(),
          mode: "calmado",
        }),
      });
      const data = await res.json();
      const reply =
        (data?.response || "Estoy aquí para escucharte. 💜") +
        " ¿Quieres contarme más? 💬";
      setHeroMessages((prev) => [...prev, { role: "neura", text: reply }]);
    } catch {
      setHeroMessages((prev) => [
        ...prev,
        { role: "neura", text: "Estoy aquí. 💜 ¿Quieres contarme más?" },
      ]);
    } finally {
      setHeroLoading(false);
    }
  }

  function getSessionId() {
    let id = sessionStorage.getItem("neura_session_id");
    if (!id) {
      id =
        "session_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
      sessionStorage.setItem("neura_session_id", id);
    }
    return id;
  }

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f3d] via-[#3b2752] to-[#4a2c6d] opacity-95" />
      <div className="absolute w-[700px] h-[700px] bg-pink-300/30 blur-[120px] rounded-full animate-pulse" />

      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
        <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
        <span className="text-sm text-white/80 font-medium">
          IA Empática · Disponible ahora
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-4 relative z-10 drop-shadow-xl leading-tight">
        NEURA —{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          La IA que te entiende
        </span>
      </h1>

      <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 relative z-10">
        Tu acompañante emocional: escucha, detecta cómo te sientes y te ayuda a
        estar mejor, cada día.
      </p>

      <div className="relative z-10 w-full max-w-xl mb-8 bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-4">
        <div className="flex flex-col gap-2 mb-3" style={{ minHeight: "60px" }}>
          {heroMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-start ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "neura" && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5">
                  N
                </div>
              )}
              <div
                className={`px-3 py-2 rounded-xl text-sm leading-relaxed max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-tr-none"
                    : "bg-white/10 text-white/90 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {heroLoading && (
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                N
              </div>
              <div className="flex gap-1 px-3 py-2 bg-white/10 rounded-xl rounded-tl-none">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendHeroMessage()}
            placeholder="Escribe cómo te sientes..."
            className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-purple-400/50"
          />
          <button
            onClick={sendHeroMessage}
            disabled={heroLoading}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 hover:scale-105 transition disabled:opacity-50"
            type="button"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <Link to="/chat">
          <button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
            type="button"
          >
            Empieza ahora
          </button>
        </Link>
        <Link to="/discover">
          <button
            className="px-8 py-3 rounded-full bg-white/15 text-white font-semibold text-lg border border-white/30 hover:scale-105 transition"
            type="button"
          >
            Descubre NEURA
          </button>
        </Link>
      </div>

      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-3xl rounded-full" />
    </section>
  );
}
