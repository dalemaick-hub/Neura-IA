import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import ThinkingHeart from "./ThinkingHeart";

const Chat = ({ messages, onSendMessage, emotion, userProfile, loading }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-white/10 bg-[#120d1b]/50 px-4 py-4">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">NEURA</p>
            <p className="text-sm text-white/70">Conversacion activa contigo</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Emocion</p>
            <p className="text-sm text-white/80">{emotion}</p>
          </div>
        </div>

        <div ref={scrollRef} className="mt-4 space-y-4 max-h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
          {messages.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-6 text-center text-white/65">
              <p className="text-sm">Empieza contandome como te sientes hoy. Guardare el hilo para que la charla tenga continuidad.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg}
              isUser={msg.sender === "user"}
              onQuickReply={onSendMessage}
              showQuickReplies={!loading && msg.sender === "neura" && idx === messages.length - 1}
            />
          ))}

          {loading && <ThinkingHeart />}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white/60">
        {userProfile?.moods?.length
          ? `Registro emocional guardado: ${userProfile.moods.slice(-5).join(", ")}`
          : "Aun no hay emociones registradas."}
      </div>

      <div className="rounded-full border border-white/10 bg-black/10 p-2">
        <InputBar onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
