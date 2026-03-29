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
  feliz: { emoji: "✨", label: "Te sientes feliz" },
  triste: { emoji: "😔", label: "Te sientes triste" },
  estresado: { emoji: "🧠", label: "Detectado: Estres" },
  ansioso: { emoji: "🌿", label: "Te sientes ansioso" },
  enfadado: { emoji: "🔥", label: "Te sientes enfadado" },
  neutral: { emoji: "💬", label: "Te estoy escuchando" },
};

const QUICK_REPLIES = [
  "Quiero un consejo mas directo",
  "Explicamelo mejor",
  "Dame algo practico",
];

const PERSONALITY_MODES = [
  { id: "calmado", label: "Calmado", emoji: "🧘" },
  { id: "motivador", label: "Motivador", emoji: "💪" },
  { id: "analitico", label: "Analitico", emoji: "🧠" },
  { id: "directo", label: "Directo", emoji: "🗣️" },
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

  if (dominantMood === "estresado") {
    return "Esta semana: alto nivel de estres.";
  }

  if (dominantMood === "ansioso") {
    return "Esta semana: hay senales de ansiedad sostenida.";
  }

  if (dominantMood === "triste") {
    return "Esta semana: se percibe una carga emocional baja.";
  }

  if (dominantMood === "feliz") {
    return "Esta semana: tu energia emocional va en buen camino.";
  }

  if (dominantMood === "enfadado") {
    return "Esta semana: hay tension acumulada que conviene descargar.";
  }

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
    if (!isReady) {
      return;
    }

    saveHistory(messages);
  }, [isReady, messages]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

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
      <header className="relative w-full py-10 px-6 text-center bg-gradient-to-b from-[#3b2752] via-[#4a2c6d] to-[#5e3a7f] text-white overflow-hidden">
        <img
          src="/images/Recorte%20de%20mariposa.png"
          className="absolute top-10 left-10 w-20 animate-float-soft opacity-80"
          alt=""
          aria-hidden="true"
        />
        <img
          src="/images/Recorte%20de%20mariposa%20-%20copia.png"
          className="absolute top-20 right-16 w-24 animate-float-soft opacity-80 delay-500"
          alt=""
          aria-hidden="true"
        />
        <h1 className="text-4xl md:text-5xl font-headline font-bold drop-shadow-xl">Como te sientes hoy?</h1>
        <p className="text-lg md:text-xl mt-4 text-white/80 max-w-2xl mx-auto">
          Cuentame lo que tienes en mente. Estoy aqui para escucharte y apoyarte.
        </p>
      </header>

      <section className="px-6 py-12 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10 space-y-6">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Estado emocional</p>
              <p className="mt-2 text-lg font-semibold">
                {emotionMeta.emoji} {emotionMeta.label}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Resumen emocional</p>
              <p className="mt-2 text-sm leading-6 text-white/80">📊 {weeklySummary}</p>
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
                      ? "border-purple-300 bg-purple-300/20 text-white"
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
            userProfile={userProfile}
            loading={loading}
          />
          <button
            onClick={handleClearHistory}
            className="mt-4 mx-auto block px-5 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-purple-200 hover:bg-white/20 transition-all backdrop-blur-md shadow-lg"
          >
            Limpiar historial
          </button>
        </div>
      </section>
    </NeuraLayout>
  );
}
