import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import ThinkingHeart from "./ThinkingHeart";

const Chat = ({ messages, onSendMessage, emotion, emotionMeta, userProfile, loading }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px emotion-wave"
          style={{ backgroundImage: `linear-gradient(90deg, transparent, ${emotionMeta.orb}, transparent)` }}
        ></div>

        <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4 text-white">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <div className="emotion-orb absolute h-7 w-7 rounded-full blur-sm" style={{ backgroundColor: emotionMeta.orb }}></div>
              <span className="relative text-lg">🧠</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">NEURA</p>
              <p className="text-sm text-white/70">Tu espacio emocional activo</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Emocion</p>
            <p className={`text-sm ${emotionMeta.accent}`}>{emotion}</p>
          </div>
        </div>

        <div ref={scrollRef} className="max-h-[55vh] space-y-4 overflow-y-auto pr-2 scrollbar-hide">
          {messages.length === 0 && (
            <div className="animate-message-in rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-6 text-center text-white/70">
              <p className="text-base font-medium text-white">¿Cómo te sientes hoy?</p>
              <p className="mt-2 text-sm text-white/60">Estoy aquí para escucharte. Empieza con una frase corta y seguimos desde ahí.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg}
              isUser={msg.sender === "user"}
              onQuickReply={onSendMessage}
              showQuickReplies={!loading && msg.sender === "neura" && idx === messages.length - 1}
              emotionMeta={emotionMeta}
            />
          ))}

          {loading && <ThinkingHeart />}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white/60">
        {userProfile?.moods?.length
          ? `Registro emocional guardado: ${userProfile.moods.slice(-5).join(", ")}`
          : "Aún no hay emociones registradas."}
      </div>

      <div className="rounded-full border border-white/10 bg-black/10 p-2 shadow-[0_0_35px_rgba(189,157,255,0.08)]">
        <InputBar onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
