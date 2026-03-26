import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { askNeura } from "../api.js";
import NeuraLayout from "../components/NeuraLayout";

const HISTORY_KEY = "neura_history";

export function loadHistory() {
  const saved = localStorage.getItem(HISTORY_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveHistory(nextMessages) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextMessages));
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [emotion] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "", moods: [] });

  useEffect(() => {
    const savedProfile = localStorage.getItem("neura_profile");

    try {
      setMessages(loadHistory());
    } catch (error) {
      console.warn("No se pudo leer neura_history desde localStorage.", error);
    }

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setMessages([]);
  };

  const handleSendMessage = async (userMessage) => {
    if (!userMessage || userMessage.trim() === "") {
      console.log("Mensaje vacío bloqueado");
      return;
    }

    const trimmedMessage = userMessage.trim();
    const backendMessages = [
      ...messages.map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      })),
      {
        role: "user",
        content: trimmedMessage,
      },
    ];
    const nextMessages = [...messages, { sender: "user", text: trimmedMessage, timestamp: Date.now() }];

    setMessages(nextMessages);
    setLoading(true);

    try {
      const data = await askNeura(backendMessages);
      setMessages((prev) => [
        ...prev,
        { sender: "neura", text: data.response, timestamp: Date.now() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "neura", text: "Error de conexion con Neura", timestamp: Date.now() },
      ]);
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
        <h1 className="text-4xl md:text-5xl font-headline font-bold drop-shadow-xl">Como te sientes hoy?</h1>
        <p className="text-lg md:text-xl mt-4 text-white/80 max-w-2xl mx-auto">
          Cuentame lo que tienes en mente. Estoy aqui para escucharte y apoyarte.
        </p>
      </header>

      <section className="px-6 py-12 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10">
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            emotion={emotion}
            userProfile={userProfile}
            loading={loading}
          />
          <button
            onClick={clearHistory}
            className="mt-4 mx-auto block px-5 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-purple-200 hover:bg-white/20 transition-all backdrop-blur-md shadow-lg"
          >
            Limpiar historial
          </button>
        </div>
      </section>
    </NeuraLayout>
  );
}
