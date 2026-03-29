import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { analizarEmocion } from "../services/ai.js";
import {
  clearHistory,
  loadHistory,
  loadUserProfile,
  saveHistory,
  saveUserProfile,
} from "../services/chatStorage.js";
import NeuraLayout from "../components/NeuraLayout";

const EMOTION_META = {
  feliz: {
    emoji: "\u2728",
    label: "Te sientes feliz",
    accent: "text-emerald-300",
    surface: "from-emerald-400/20 to-cyan-400/10",
    orb: "rgba(74, 222, 128, 0.55)",
  },
  triste: {
    emoji: "\u{1F614}",
    label: "Te sientes triste",
    accent: "text-sky-300",
    surface: "from-sky-400/20 to-indigo-400/10",
    orb: "rgba(56, 189, 248, 0.55)",
  },
  estresado: {
    emoji: "\u{1F9E0}",
    label: "Estado detectado: Estres",
    accent: "text-orange-300",
    surface: "from-orange-400/20 to-pink-400/10",
    orb: "rgba(251, 146, 60, 0.58)",
  },
  ansioso: {
    emoji: "\u{1F33F}",
    label: "Te sientes ansioso",
    accent: "text-teal-300",
    surface: "from-teal-400/20 to-sky-400/10",
    orb: "rgba(45, 212, 191, 0.55)",
  },
  enfadado: {
    emoji: "\u{1F525}",
    label: "Te sientes enfadado",
    accent: "text-rose-300",
    surface: "from-rose-400/20 to-orange-400/10",
    orb: "rgba(251, 113, 133, 0.58)",
  },
  neutral: {
    emoji: "\u{1F4AC}",
    label: "Te estoy escuchando",
    accent: "text-violet-200",
    surface: "from-violet-400/20 to-sky-400/10",
    orb: "rgba(189, 157, 255, 0.52)",
  },
};

const QUICK_REPLIES = [
  "Quiero un consejo mas directo",
  "Explicamelo mejor",
  "Dame algo practico",
];

const PERSONALITY_MODES = [
  { id: "calmado", label: "Calmado", emoji: "\u{1F9D8}" },
  { id: "motivador", label: "Motivador", emoji: "\u{1F4AA}" },
  { id: "analitico", label: "Analitico", emoji: "\u{1F9E0}" },
  { id: "directo", label: "Directo", emoji: "\u{1F5E3}" },
];

function buildWeeklySummary(moods) {
  const recentMoods = moods.slice(-7);

  if (recentMoods.length === 0) {
    return "Aun no hay suficiente informacion emocional esta semana.";
  }

  const counts = recentMoods.reduce((accumulator, mood) => {
    accumulator[mood] = (accumulator[mood] || 0) + 1;
    return accumulator;
  }, {});

  const [dominantMood] = Object.entries(counts).sort((left, right) => right[1] - left[1])[0];

  if (dominantMood === "estresado") return "Esta semana: alto nivel de estres.";
  if (dominantMood === "ansioso") return "Esta semana: hay senales de ansiedad sostenida.";
  if (dominantMood === "triste") return "Esta semana: se percibe una carga emocional baja.";
  if (dominantMood === "feliz") return "Esta semana: tu energia emocional va en buen camino.";
  if (dominantMood === "enfadado") return "Esta semana: hay tension acumulada que conviene descargar.";

  return "Esta semana: tu estado emocional ha sido bastante estable.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [emotion, setEmotion] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "", moods: [] });
  const [isReady, setIsReady] = useState(false);
  const [mode, setMode] = useState("calmado");

  useEffect(() => {
    const savedMessages = loadHistory();
    const savedProfile = loadUserProfile();
    const lastDetectedEmotion = [...savedMessages]
      .reverse()
      .find((message) => message.sender === "neura" && message.emotion)?.emotion;

    setMessages(savedMessages);
    setUserProfile(savedProfile);
    setEmotion(lastDetectedEmotion || savedProfile.moods.at(-1) || "neutral");
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    saveHistory(messages);
  }, [isReady, messages]);

  useEffect(() => {
    if (!isReady) return;
    saveUserProfile(userProfile);
  }, [isReady, userProfile]);

  const handleClearHistory = () => {
    clearHistory();
    setMessages([]);
  };

  const handleSendMessage = async (userMessage) => {
    if (!userMessage || userMessage.trim() === "") {
      console.log("Mensaje vacio bloqueado");
      return;
    }

    const trimmedMessage = userMessage.trim();
    const nextMessages = [...messages, { sender: "user", text: trimmedMessage, timestamp: Date.now() }];

    setMessages(nextMessages);
    setLoading(true);

    try {
      const data = await analizarEmocion(trimmedMessage, mode);
      const detectedEmotion = data.emotion || "neutral";

      setEmotion(detectedEmotion);
      setUserProfile((prev) => ({
        ...prev,
        moods: [...prev.moods, detectedEmotion].slice(-30),
      }));
      setMessages((prev) => [
        ...prev,
        {
          sender: "neura",
          text: data.response,
          timestamp: Date.now(),
          emotion: detectedEmotion,
          mode: data.mode || mode,
          actionableAdvice: data.actionableAdvice,
          checkInPrompt: data.checkInPrompt,
          quickReplies: QUICK_REPLIES,
        },
      ]);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        { sender: "neura", text: "Error de conexion con Neura", timestamp: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const emotionMeta = EMOTION_META[emotion] || EMOTION_META.neutral;
  const weeklySummary = buildWeeklySummary(userProfile.moods);
  const currentMode = PERSONALITY_MODES.find((item) => item.id === mode) || PERSONALITY_MODES[0];

  return (
    <NeuraLayout>
      <header className="relative w-full overflow-hidden bg-gradient-to-b from-[#321b4f] via-[#49276d] to-[#5e3a7f] px-6 py-10 text-center text-white">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 animate-pulse-slow"
          style={{ background: emotionMeta.orb }}
        />
        <img
          src="/images/Recorte%20de%20mariposa.png"
          className="absolute left-10 top-10 w-20 animate-float-soft opacity-80"
          alt=""
          aria-hidden="true"
        />
        <img
          src="/images/Recorte%20de%20mariposa%20-%20copia.png"
          className="absolute right-16 top-20 w-24 animate-float-soft opacity-80 delay-500"
          alt=""
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="mx-auto mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
            <span className="emotion-orb h-3 w-3 rounded-full" style={{ backgroundColor: emotionMeta.orb }}></span>
            <span className={`text-sm font-medium ${emotionMeta.accent}`}>{emotionMeta.label}</span>
          </div>
          <h1 className="text-4xl font-headline font-bold drop-shadow-xl md:text-5xl">\u00BFC\u00F3mo te sientes hoy?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
            Estoy aqui para escucharte. En pocos segundos podemos bajar ruido mental y darte un siguiente paso claro.
          </p>
        </div>
      </header>

      <section className="min-h-[60vh] px-6 py-12">
        <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${emotionMeta.surface} px-4 py-4 text-white shadow-[0_20px_60px_-35px_rgba(189,157,255,0.45)]`}>
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Estado emocional</p>
              <p className={`mt-2 text-lg font-semibold ${emotionMeta.accent}`}>
                {emotionMeta.emoji} {emotionMeta.label}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Resumen emocional</p>
              <p className="mt-2 text-sm leading-6 text-white/80">{"\\u{1F4CA}"} {weeklySummary}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Modo personalidad</p>
                <p className="mt-2 text-sm text-white/75">
                  {currentMode.emoji} NEURA responde ahora en modo {currentMode.label.toLowerCase()}.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {PERSONALITY_MODES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`rounded-full border px-3 py-2 text-sm transition ${
                    mode === item.id
                      ? "border-purple-300 bg-purple-300/20 text-white shadow-[0_0_25px_rgba(189,157,255,0.25)]"
                      : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>
          </div>

          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            emotion={emotion}
            emotionMeta={emotionMeta}
            userProfile={userProfile}
            loading={loading}
          />
          <button
            onClick={handleClearHistory}
            className="mx-auto mt-4 block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-purple-200 shadow-lg backdrop-blur-md transition-all hover:bg-white/20"
          >
            Limpiar historial
          </button>
        </div>
      </section>
    </NeuraLayout>
  );
}
