import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { askNeura } from "../api.js";
import NeuraLayout from "../components/NeuraLayout";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [emotion, setEmotion] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "", moods: [] });

  useEffect(() => {
    const savedProfile = localStorage.getItem("neura_profile");
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
  }, []);

  const handleSendMessage = async (userMessage) => {
    setMessages((prev) => [...prev, { sender: "user", text: userMessage, timestamp: Date.now() }]);
    setLoading(true);

    try {
      const data = await askNeura(userMessage, emotion);
      setMessages((prev) => [...prev, { sender: "ai", text: data.response, timestamp: Date.now() }]);
      if (data.emotion) setEmotion(data.emotion);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error de conexión con Neura", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-4xl md:text-5xl font-headline font-bold drop-shadow-xl">¿Cómo te sientes hoy?</h1>
        <p className="text-lg md:text-xl mt-4 text-white/80 max-w-2xl mx-auto">
          Cuéntame lo que tienes en mente. Estoy aquí para escucharte y apoyarte.
        </p>
      </header>

      <section className="px-6 py-12 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
          <Chat messages={messages} onSendMessage={handleSendMessage} emotion={emotion} userProfile={userProfile} loading={loading} />
        </div>
      </section>
    </NeuraLayout>
  );
}
