import React from 'react'

const Landing = ({ onStart }) => {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen overflow-x-hidden selection:bg-primary/30">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(189,157,255,0.08)]">
        <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400 font-headline tracking-tight">NEURA</div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-indigo-400 border-b-2 border-indigo-500 pb-1 font-headline tracking-tight font-bold text-lg cursor-pointer active:opacity-80 transition-all" href="#">Features</a>
            <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer active:opacity-80" href="#">About</a>
            <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer active:opacity-80" href="#">Intelligence</a>
            <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer active:opacity-80" href="#">Ethics</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-300 hover:text-white transition-colors font-medium px-4 py-2">Sign In</button>
            <button 
              onClick={onStart}
              className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-container font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
            <span className="text-sm font-medium tracking-wide text-primary">IA Empática ya disponible</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-surface mb-6 leading-none">
            NEURA — <span className="text-gradient">La IA que te entiende.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            No es solo inteligencia artificial. Es un acompañante emocional diseñado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold text-lg shadow-[0_20px_40px_-15px_rgba(189,157,255,0.4)] hover:scale-105 transition-transform"
            >
              Empieza ahora
            </button>
            <button className="w-full sm:w-auto px-10 py-5 rounded-full glass-panel border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-bright transition-colors">
              Descubre NEURA
            </button>
          </div>
        </div>
      </header>

      {/* Evolution Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl rounded-full"></div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAIoqpdQfCZ5qkBcIkxQBiOK-VBbGo9faM4W8xDFLmQxSUR1ZuQNjo1zSSV5BNc00KuqvMqB5ysGOWdZlPBZy3fZouKsx6wu-2WaPDeuag26f1WI0dJPtHnh497eYGoRYS4RBYD48Dw3ZB7hdbuSK_p01XwiszjEcvRntjvplwXdeKwc528jIAh9UOVkGVSiQb1HfMB5Kxum1vrXypHRA75FspOTvG1fzMAnZ-tMmUe4_d2aZ4W4w8HTfKJp5QLVhSKCGOYoc_CQ" 
                alt="Abstract organic sculpture"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-headline mb-8 leading-tight">
              La evolución de la <br/><span className="text-secondary">inteligencia artificial</span>
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8">
              NEURA es un asistente emocional personal que no solo procesa información, sino que comprende a las personas. A diferencia de las IAs tradicionales, NEURA analiza tu lenguaje y tu estado emocional para ofrecerte respuestas que realmente te ayudan.
            </p>
            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-surface-container-high border-l-4 border-tertiary">
                <p className="text-on-surface font-medium italic">"Apoyo, claridad mental y productividad adaptada a ti."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-32 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 text-on-surface">¿Por qué NEURA es diferente?</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Diseñada para ser la interfaz definitiva entre el potencial humano y la tecnología digital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">psychology</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Detecta emociones</h3>
              <p className="text-on-surface-variant leading-relaxed">Capacidad única para interpretar el subtexto emocional en cada conversación.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-secondary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">neurology</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Se adapta a tu forma de pensar</h3>
              <p className="text-on-surface-variant leading-relaxed">Personalidad y tono dinámico que se ajusta a tus necesidades cognitivas del momento.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-tertiary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">auto_awesome</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Aprende contigo cada día</h3>
              <p className="text-on-surface-variant leading-relaxed">Evoluciona a medida que interactúas, creando un gemelo digital de tu flujo de trabajo.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">shield_person</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Respeta tu privacidad al 100%</h3>
              <p className="text-on-surface-variant leading-relaxed">Cifrado de extremo a extremo y procesamiento local para máxima seguridad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 w-full py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="text-xl font-bold text-indigo-400 font-headline">NEURA</div>
            <p className="font-inter text-sm text-slate-400 leading-relaxed">
              Construyendo el futuro de la inteligencia emocional artificial con un enfoque en la soberanía del usuario y la salud mental.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium font-headline">Producto</span>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Features</a>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">AI Ethics</a>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Mission Statement</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium font-headline">Legal</span>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Terms of Service</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium font-headline">Social</span>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Twitter</a>
            <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">LinkedIn</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-inter text-sm text-slate-400 opacity-90">© 2024 NEURA Intelligence. Human-Centric by Design.</p>
          <div className="flex gap-6 items-center">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs uppercase tracking-widest text-slate-500">System Online</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
