import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-background text-on-surface pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background opacity-40 animate-pulse"></div>

      <h1 className="text-6xl md:text-7xl font-headline font-bold text-on-surface mb-6 relative z-10">
        NEURA — La IA que te entiende
      </h1>

      <p className="text-xl md:text-2xl text-on-surface/70 max-w-2xl mb-10 relative z-10">
        Un acompañante emocional diseñado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <Link to="/chat">
          <button className="px-8 py-3 rounded-full bg-primary text-on-primary font-semibold text-lg hover:bg-primary-dim transition" type="button">
            Empieza ahora
          </button>
        </Link>

        <Link to="/discover">
          <button className="px-8 py-3 rounded-full bg-surface-container text-on-surface font-semibold text-lg border border-white/10 hover:bg-surface-container-high transition" type="button">
            Descubre NEURA
          </button>
        </Link>
      </div>

      <div className="absolute w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full animate-spin-slow"></div>
    </section>
  );
}

