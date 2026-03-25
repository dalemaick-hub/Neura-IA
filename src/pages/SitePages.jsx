import React from "react";
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(189,157,255,0.08)]">
      <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <Link
          className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400 font-headline tracking-tight"
          to="/"
        >
          NEURA
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" to="/features">
            Features
          </Link>
          <Link className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" to="/about">
            About
          </Link>
          <Link className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" to="/intelligence">
            Intelligence
          </Link>
          <Link className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" to="/ethics">
            Ethics
          </Link>
          <Link className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" to="/discover">
            Discover
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="text-slate-300 hover:text-white transition-colors font-medium px-4 py-2" to="/signin">
            Sign In
          </Link>
          <Link to="/chat">
            <button className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-container font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function PageShell({ title, children }) {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen pt-28">
      <TopNav />
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">{title}</h1>
        {children}
      </section>
    </div>
  );
}

export function FeaturesPage() {
  return (
    <PageShell title="Funciones de NEURA">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">🧠 Comprensión emocional</h2>
          <p className="opacity-80">NEURA detecta emociones en tus mensajes y adapta su respuesta.</p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">💬 Conversación natural</h2>
          <p className="opacity-80">Respuestas fluidas, humanas y coherentes.</p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">📘 Memoria inteligente</h2>
          <p className="opacity-80">NEURA resume y recuerda información importante.</p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">⚡ Ultra velocidad</h2>
          <p className="opacity-80">Gracias a Groq, NEURA responde casi instantáneamente.</p>
        </div>
      </div>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell title="Sobre NEURA">
      <p className="text-lg opacity-90 leading-relaxed mb-6">
        NEURA nació con una misión clara: crear una inteligencia artificial que no solo responda, sino que entienda. Una IA que pueda
        acompañarte emocionalmente, ayudarte a pensar mejor y mejorar tu bienestar día a día.
      </p>
      <p className="text-lg opacity-90 leading-relaxed">Nuestro objetivo es construir una IA empática, segura y útil para todos.</p>
    </PageShell>
  );
}

export function IntelligencePage() {
  return (
    <PageShell title="La Inteligencia de NEURA">
      <p className="text-lg opacity-90 leading-relaxed mb-6">
        NEURA combina modelos de lenguaje avanzados con un sistema de memoria inteligente que resume, aprende y adapta su comportamiento
        según tus necesidades.
      </p>
      <ul className="space-y-4 text-lg opacity-80">
        <li>• Procesamiento emocional</li>
        <li>• Resumen automático de conversaciones</li>
        <li>• Adaptación al estilo del usuario</li>
        <li>• Respuestas rápidas gracias a Groq</li>
      </ul>
    </PageShell>
  );
}

export function EthicsPage() {
  return (
    <PageShell title="Ética y Seguridad">
      <p className="text-lg opacity-90 leading-relaxed mb-6">
        La ética es el corazón de NEURA. Cada interacción está diseñada para proteger tu privacidad, evitar sesgos y garantizar que la IA
        actúe siempre en tu beneficio.
      </p>
      <ul className="space-y-4 text-lg opacity-80">
        <li>• Privacidad primero</li>
        <li>• Sin manipulación emocional</li>
        <li>• Transparencia en el funcionamiento</li>
        <li>• Protección de datos del usuario</li>
      </ul>
    </PageShell>
  );
}

export function DiscoverPage() {
  return (
    <PageShell title="Descubre NEURA">
      <p className="text-lg opacity-90 leading-relaxed mb-6">
        NEURA no es solo una IA. Es un acompañante emocional que evoluciona contigo, aprende de tus preferencias y te ayuda a tomar mejores
        decisiones.
      </p>
      <p className="text-lg opacity-90 leading-relaxed">Explora cómo NEURA puede mejorar tu vida diaria.</p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link to="/chat">
          <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold text-lg shadow-[0_20px_40px_-15px_rgba(189,157,255,0.4)] hover:scale-105 transition-transform">
            Empieza ahora
          </button>
        </Link>
        <Link to="/features">
          <button className="w-full sm:w-auto px-10 py-5 rounded-full glass-panel border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-bright transition-colors">
            Ver funciones
          </button>
        </Link>
      </div>
    </PageShell>
  );
}

export function SignInPage() {
  return (
    <PageShell title="Iniciar Sesión">
      <p className="text-lg opacity-90 leading-relaxed">Próximamente podrás acceder a tu cuenta NEURA desde aquí.</p>
    </PageShell>
  );
}

