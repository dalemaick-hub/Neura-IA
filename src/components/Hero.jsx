import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-purple-200 to-white animate-soft-flow"></div>
      <div className="absolute w-[700px] h-[700px] bg-pink-300/40 blur-[120px] rounded-full animate-pulse-slow"></div>

      <img
        src="/images/Gemini_Generated_Image_ls4dpnls4dpnls4d.png"
        alt="Neura Amor"
        className="absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-80 hero-float-soft"
        loading="eager"
      />

      <h1 className="text-6xl md:text-7xl font-headline font-bold text-[#4a2c6d] mb-6 relative z-10 animate-fade-in">
        NEURA — La IA que te entiende
      </h1>

      <p className="text-xl md:text-2xl text-[#5a3e7a]/80 max-w-2xl mb-10 relative z-10 animate-fade-in delay-500">
        Un acompañante emocional diseñado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
      </p>

      <div className="flex gap-4 relative z-10 animate-fade-in delay-700">
        <Link to="/chat">
          <button className="px-8 py-3 rounded-full bg-[#b47bff] text-white font-semibold text-lg shadow-lg hover:scale-105 transition" type="button">
            Empieza ahora
          </button>
        </Link>

        <Link to="/discover">
          <button className="px-8 py-3 rounded-full bg-white/70 text-[#4a2c6d] font-semibold text-lg border border-[#b47bff]/30 shadow-md hover:scale-105 transition" type="button">
            Descubre NEURA
          </button>
        </Link>
      </div>

      <div className="absolute w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full"></div>
    </section>
  );
}
