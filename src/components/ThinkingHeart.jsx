import React from "react";

const ThinkingHeart = () => {
  return (
    <div
      className="flex justify-start mb-4"
      aria-live="polite"
      aria-label="Neura esta pensando"
    >
      <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl shadow-lg backdrop-blur-md">
        <div className="thinking-heart leading-none">{"\u2764\uFE0F"}</div>
      </div>
    </div>
  );
};

export default ThinkingHeart;
