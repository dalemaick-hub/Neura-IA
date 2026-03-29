export default function LandingHighlights() {
  return (
    <>
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
              La evolucion de la <br />
              <span className="text-secondary">inteligencia artificial</span>
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8">
              NEURA es un asistente emocional personal que no solo procesa informacion, sino que comprende a las personas. A diferencia de las IAs tradicionales, NEURA analiza tu lenguaje y tu estado emocional para ofrecerte respuestas que realmente te ayudan.
            </p>
            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-surface-container-high border-l-4 border-tertiary">
                <p className="text-on-surface font-medium italic">"Apoyo, claridad mental y productividad adaptada a ti."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 text-on-surface">Por que NEURA es diferente?</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Disenada para ser la interfaz definitiva entre el potencial humano y la tecnologia digital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">psychology</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Detecta emociones</h3>
              <p className="text-on-surface-variant leading-relaxed">Capacidad unica para interpretar el subtexto emocional en cada conversacion.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-secondary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">neurology</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Se adapta a tu forma de pensar</h3>
              <p className="text-on-surface-variant leading-relaxed">Personalidad y tono dinamico que se ajusta a tus necesidades cognitivas del momento.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-tertiary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">auto_awesome</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Aprende contigo cada dia</h3>
              <p className="text-on-surface-variant leading-relaxed">Evoluciona a medida que interactuas, creando un gemelo digital de tu flujo de trabajo.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-xl bg-surface-container-highest flex flex-col justify-end min-h-[300px] border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-7xl">shield_person</span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Respeta tu privacidad al 100%</h3>
              <p className="text-on-surface-variant leading-relaxed">Cifrado de extremo a extremo y procesamiento local para maxima seguridad.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
