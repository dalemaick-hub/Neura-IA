import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import IntelligencePage from "./pages/IntelligencePage";
import EthicsPage from "./pages/EthicsPage";
import DiscoverPage from "./pages/DiscoverPage";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0c14] text-white">
        <img
          src="/images/neura-logo.png"
          onError={(e) => {
            e.currentTarget.src = "/images/Gemini_Generated_Image_ls4dpnls4dpnls4d.png";
            e.currentTarget.style.filter = "grayscale(1) contrast(1.15) brightness(1.05)";
            e.currentTarget.style.opacity = "0.8";
          }}
          className="w-32 opacity-80 animate-pulse"
        />
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/intelligence" element={<IntelligencePage />} />
        <Route path="/ethics" element={<EthicsPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
