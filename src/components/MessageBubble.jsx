import React from "react";

const MessageBubble = ({ message, isUser, showQuickReplies, onQuickReply, emotionMeta }) => {
  const date = message.timestamp ? new Date(message.timestamp) : new Date();

  return (
    <div className={`animate-message-in mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[85%] flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
        <div className={`flex items-center gap-2 px-2 text-xs uppercase tracking-[0.2em] ${isUser ? "text-white/40" : "text-purple-200/70"}`}>
          <span>{isUser ? "Usuario" : "NEURA"}</span>
          {!isUser && message.emotion && <span>· {message.emotion}</span>}
          {!isUser && message.mode && <span>· modo {message.mode}</span>}
        </div>

        <div
          className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 ${
            isUser
              ? "border border-violet-300/20 bg-gradient-to-br from-violet-500/70 to-fuchsia-500/60 text-white"
              : "border border-white/10 bg-white/5 text-white/85"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed md:text-base">{message.text}</p>
          <span className="mt-2 block text-right text-[10px] opacity-50">
            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {!isUser && (message.actionableAdvice || message.checkInPrompt) && (
          <div className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white/85 shadow-[0_20px_60px_-35px_rgba(189,157,255,0.35)]" style={{ background: `linear-gradient(135deg, ${emotionMeta.orb}22, rgba(15, 23, 42, 0.45))` }}>
            {message.actionableAdvice && (
              <>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Consejo accionable</p>
                <p className="mt-2 text-sm leading-6">{"\\u{1F4A1}"} {message.actionableAdvice}</p>
              </>
            )}
            {message.checkInPrompt && (
              <p className="mt-3 text-sm text-white/70">{"\\u{1F514}"} {message.checkInPrompt}</p>
            )}
          </div>
        )}

        {showQuickReplies && Array.isArray(message.quickReplies) && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => onQuickReply(reply)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
