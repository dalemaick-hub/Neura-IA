import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { askNeura } from "../api.js";

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
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const data = await askNeura(userMessage, emotion);
      setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
      if (data.emotion) setEmotion(data.emotion);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error de conexión con Neura" }]);
    } finally {
      setLoading(false);
    }
  };

  return <Chat messages={messages} onSendMessage={handleSendMessage} emotion={emotion} userProfile={userProfile} loading={loading} />;
}
