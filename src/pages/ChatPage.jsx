import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { analizarEmocion, resetNeuraSession } from "../services/ai.js";
import {
  clearHistory,
  getOrCreateSessionId,
  loadHistory,
  loadUserProfile,
  resetSessionId,
  saveHistory,
  saveUserProfile,
} from "../services/chatStorage.js";
import NeuraLayout from "../components/NeuraLayout";

const EMOTION_META = {
  feliz: {
    emoji: "😄",
    label: "Te sientes: Felicidad",
    accent: "text-emerald-300",
    surface: "from-emerald-400/20 to-cyan-400/10",
    orb: "rgba(74, 222, 128, 0.55)",
  },
  triste: {
    emoji: "😢",
    label: "Te sientes: Tristeza",
    accent: "text-sky-300",
    surface: "from-sky-400/20 to-indigo-400/10",
    orb: "rgba(56, 189, 248, 0.55)",
  },
  estresado: {
    emoji: "😩",
    label: "Estado detectado: Estrés",
    accent: "text-orange-300",
    surface: "from-orange-400/20 to-pink-400/10",
    orb: "rgba(251, 146, 60, 0.58)",
  },
  ansioso: {
    emoji: "🌿",
    label: "Te sientes: Ansiedad",
    accent: "text-teal-300",
    surface: "from-teal-400/20 to-sky-400/10",
    orb: "rgba(45, 212, 191, 0.55)",
  },
  enfadado: {
    emoji: "🔥",
    label: "Te sientes: Enfado",
    accent: "text-rose-300",
    surface: "from-rose-400/20 to-orange-400/10",
    orb: "rgba(251, 113, 133, 0.58)",
  },
  neutral: {
    emoji: "💙",
    label: "Estoy aquí para escucharte",
    accent: "text-violet-200",
    surface: "from-violet-400/20 to-sky-400/10",
    orb: "rgba(189, 157, 255, 0.52)",
  },
};

const QUICK_REPLIES = [
  "Quiero un consejo más directo",
  "Explícamelo mejor",
  "Dame algo práctico",
];

const HERO_ACTIONS = [
  "Dame un consejo",
  "Sé más directo",
  "Ayúdame a calmarme",
];

const EMOTION_PRESETS = [
  { emotion: "triste", label: "😢", prompt: "Hoy me siento triste y quiero hablarlo contigo." },
  { emotion: "estresado", label: "😩", prompt: "Hoy me siento estresado y necesito bajar revoluciones." },
  { emotion: "neutral", label: "😌", prompt: "Quiero hacer un check-in emocional y sentir más calma." },
  { emotion: "feliz", label: "😄", prompt: "Hoy me siento feliz y quiero aprovechar bien esta energía." },
];

const PERSONALITY_MODES = [
  { id: "calmado", label: "Calmad@", emoji: "💜" },
  { id: "motivador", label: "Motivador", emoji: "💪" },
  { id: "analitico", label: "Analítico", emoji: "🧠" },
  { id: "directo", label: "Directo", emoji: "🗣️" },
];

function buildWeeklySummary(moods) {
  const recentMoods = moods.slice(-7);

  if (recentMoods.length === 0) {
    return "Aún no hay suficiente información emocional esta semana.";
  }

  const counts = recentMoods.reduce((accumulator, mood) => {
    accumulator[mood] = (accumulator[mood] || 0) + 1;
    return accumulator;
  }, {});

  const [dominantMood] = Object.entries(counts).sort((left, right) => right[1] - left[1])[0];

  if (dominantMood === "estresado") return "Esta semana: alto nivel de estrés.";
  if (dominantMood === "ansioso") return "Esta semana: hay señales de ansiedad sostenida.";
  if (dominantMood === "triste") return "Esta semana: se percibe una carga emocional baja.";
  if (dominantMood === "feliz") return "Esta semana: tu energía emocional va en buen camino.";
  if (dominantMood === "enfadado") return "Esta semana: hay tensión acumulada que conviene descargar.";

  return "Esta semana: tu estado emocional ha sido bastante estable.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [emotion, setEmotion] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "", moods: [] });
  const [isReady, setIsReady] = useState(false);
  const [mode, setMode] = useState("calmado");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const savedMessages = loadHistory();
    const savedProfile = loadUserProfile();
    const storedSessionId = getOrCreateSessionId();
    const lastDetectedEmotion = [...savedMessages]
      .reverse()
      .find((message) => message.sender === "neura" && message.emotion)?.emotion;

    setMessages(savedMessages);
    setUserProfile(savedProfile);
    setSessionId(storedSessionId);
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

  const sendMessage = async (userMessage) => {
    if (!userMessage || userMessage.trim() === "" || !sessionId) {
      return;
    }

    const trimmedMessage = userMessage.trim();
    const nextMessages = [...messages, { sender: "user", text: trimmedMessage, timestamp: Date.now() }];

    setMessages(nextMessages);
    setLoading(true);

    try {
      const data = await analizarEmocion(trimmedMessage, mode, sessionId);
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
        { sender: "neura", text: "Error de conexión con Neura", timestamp: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (sessionId) {
      await resetNeuraSession(sessionId);
    }

    clearHistory();
    setMessages([]);
    setEmotion("neutral");
    setUserProfile({ name: "", moods: [] });
    setSessionId(resetSessionId());
  };

  const emotionMeta = EMOTION_META[emotion] || EMOTION_META.neutral;
  const weeklySummary = buildWeeklySummary(userProfile.moods);
  const currentMode = PERSONALITY_MODES.find((item) => item.id === mode) || PERSONALITY_MODES[0];

  return (
    <NeuraLayout>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0018] via-[#12002e] to-[#1a003d] px-6 py-10 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(128,90,213,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.15),transparent_28%)]" />
        <div className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-80 animate-pulse-slow" style={{ background: emotionMeta.orb }} />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
          <div className="text-center mt-6">
            <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg md:text-6xl">
              NEURA
            </h1>
            <p className="mt-1 tracking-wide text-purple-300">Tu inteligencia emocional</p>
            <p className="mt-6 text-lg opacity-90">¿Cómo te sientes hoy?</p>
            <p className={`mt-1 text-sm ${emotionMeta.accent}`}>{emotionMeta.label}</p>
            <button
              type="button"
              className="mt-4 inline-flex rounded-full border border-purple-400/40 bg-purple-600/30 px-4 py-1 text-sm backdrop-blur-md"
            >
              {currentMode.emoji} Modo: {currentMode.label}
            </button>
          </div>

          <div className="mb-6 mt-10">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 shadow-[0_0_40px_rgba(150,0,255,0.6)]">
              <div className="absolute inset-2 rounded-full border border-white/15 bg-black/10 backdrop-blur-lg"></div>
              <span className="relative text-5xl">😊</span>
              <div className="emotion-wave absolute -bottom-3 left-1/2 h-px w-40 -translate-x-1/2" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${emotionMeta.orb}, transparent)` }}></div>
            </div>
          </div>

          <div className="w-full max-w-2xl space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${emotionMeta.surface} px-4 py-4 text-white`}>
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Estado detectado</p>
                <p className={`mt-2 text-lg font-semibold ${emotionMeta.accent}`}>
                  {emotionMeta.emoji} {emotionMeta.label}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Esta semana</p>
                <p className="mt-2 text-sm leading-6 text-white/80">📊 {weeklySummary}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
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

            <Chat
              messages={messages}
              onSendMessage={sendMessage}
              emotion={emotion}
              emotionMeta={emotionMeta}
              userProfile={userProfile}
              loading={loading}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {HERO_ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => sendMessage(action)}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                {action}
              </button>
            ))}
          </div>

          <div className="mt-8 flex gap-4 text-2xl">
            {EMOTION_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => sendMessage(preset.prompt)}
                className="transition hover:-translate-y-1 hover:scale-110"
                aria-label={preset.prompt}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-purple-300/80">
            <p>Privado y seguro · Solo tú y NEURA</p>
            <p className="mt-1">Respuestas en segundos · Gracias a Groq + Llama 3</p>
            <button
              type="button"
              onClick={handleClearHistory}
              className="mt-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/15"
            >
              Limpiar historial
            </button>
          </div>
        </div>
      </section>
    </NeuraLayout>
  );
}
