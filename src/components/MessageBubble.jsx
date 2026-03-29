import React from "react";

const MessageBubble = ({ message, isUser, showQuickReplies, onQuickReply }) => {
  const date = message.timestamp ? new Date(message.timestamp) : new Date();

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div className={`flex items-center gap-2 px-2 text-xs uppercase tracking-[0.2em] ${isUser ? "text-white/40" : "text-purple-200/70"}`}>
          <span>{isUser ? "Usuario" : "NEURA"}</span>
          {!isUser && message.emotion && <span>· {message.emotion}</span>}
          {!isUser && message.mode && <span>· modo {message.mode}</span>}
        </div>
        <div
          className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md ${
          isUser
            ? "bg-white/10 border border-white/15 text-white"
            : "bg-white/5 border border-white/10 text-white/80"
        }`}
        >
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <span className="text-[10px] opacity-50 mt-2 block text-right">
            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {showQuickReplies && Array.isArray(message.quickReplies) && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => onQuickReply(reply)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {!isUser && (message.actionableAdvice || message.checkInPrompt) && (
          <div className="w-full rounded-2xl border border-emerald-300/15 bg-emerald-400/10 px-4 py-3 text-white/85">
            {message.actionableAdvice && (
              <>
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/70">Consejo accionable</p>
                <p className="mt-2 text-sm leading-6">💡 {message.actionableAdvice}</p>
              </>
            )}
            {message.checkInPrompt && (
              <p className="mt-3 text-sm text-white/70">🔔 {message.checkInPrompt}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
