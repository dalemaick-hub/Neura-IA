export default function LandingHighlights() {
  return (
    <>
      <section id="sobre-neura" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl rounded-full"></div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700"
                src="/images/Gemini_Generated_Image_ls4dpnls4dpnls4d.png"
                alt="Visual abstracto de NEURA"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-headline mb-8 leading-tight">
              La evolución de la <br />
              <span className="text-secondary">inteligencia artificial</span>
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

      <section id="caracteristicas" className="py-32 bg-surface-container-low/50">
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

      <section id="pilares" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black font-headline mb-16 text-center tracking-widest uppercase opacity-40">Los 3 pilares de NEURA</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="relative p-1 bg-gradient-to-b from-primary/30 to-transparent rounded-xl">
              <div className="h-full bg-surface-container p-12 rounded-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-6">Inteligencia Empática</h4>
                <p className="text-on-surface-variant leading-relaxed">NEURA detecta estrés, motivación o agotamiento y responde como un apoyo emocional real, adaptando su lenguaje para ser el soporte que necesitas.</p>
              </div>
            </div>
            <div className="relative p-1 bg-gradient-to-b from-secondary/30 to-transparent rounded-xl">
              <div className="h-full bg-surface-container p-12 rounded-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-secondary text-3xl">hub</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-6">Aprendizaje Autónomo</h4>
                <p className="text-on-surface-variant leading-relaxed">Cuanto más interactúas, mejor te entiende. Cada usuario tiene una experiencia única, construyendo una relación digital coherente y profunda.</p>
              </div>
            </div>
            <div className="relative p-1 bg-gradient-to-b from-tertiary/30 to-transparent rounded-xl">
              <div className="h-full bg-surface-container p-12 rounded-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-tertiary text-3xl">verified_user</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-6">Privacidad Radical</h4>
                <p className="text-on-surface-variant leading-relaxed">Tus conversaciones son tuyas. No las vendemos, no las compartimos. Tu experiencia con NEURA es completamente privada y segura.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mision" className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-tertiary font-headline font-bold uppercase tracking-[0.3em] mb-6 block">Nuestra Misión</span>
          <h2 className="text-4xl md:text-6xl font-black font-headline mb-10 leading-tight">
            Humanizar la tecnología para que la IA se convierta en un aliado que cuide tu <span className="text-gradient">bienestar diario.</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto rounded-xl bg-gradient-to-br from-surface-container-high to-background p-12 md:p-24 text-center relative overflow-hidden border border-outline-variant/20 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary blur-[120px]"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-headline mb-8 text-on-surface relative z-10">
            Empieza a construir una mejor versión de ti con NEURA.
          </h2>
          <a href="#inicio" className="relative z-10 inline-flex bg-on-surface text-surface px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-xl">
            Probar NEURA gratis
          </a>
        </div>
      </section>
    </>
  );
}
