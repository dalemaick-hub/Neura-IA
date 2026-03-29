import { Link } from "react-router-dom";

export default function LandingHero({ onStart }) {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-30 scale-105"
          src="/assets/imagen.png"
          alt="Dreamy abstract background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-variant/40 border border-outline-variant/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse pulse-orb"></span>
          <span className="text-sm font-medium tracking-wide text-primary">IA Empatica ya disponible</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-surface mb-6 leading-none">
          NEURA <span className="text-gradient">La IA que te entiende.</span>
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          No es solo inteligencia artificial. Es un acompanante emocional disenado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold text-lg shadow-[0_20px_40px_-15px_rgba(189,157,255,0.4)] hover:scale-105 transition-transform"
          >
            Empieza ahora
          </button>
          <Link className="w-full sm:w-auto" to="/discover">
            <button className="w-full px-10 py-5 rounded-full glass-panel border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-bright transition-colors">
              Descubre NEURA
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
