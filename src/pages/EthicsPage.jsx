import NeuraLayout from "../components/NeuraLayout";

const principles = [
  {
    title: "Bienestar primero",
    description: "NEURA prioriza respuestas cuidadosas, sin empujar al usuario hacia daño, culpa o dependencia emocional.",
  },
  {
    title: "Límites claros",
    description: "No busca reemplazar vínculos humanos ni ocupar espacios que deben ser acompañados por personas reales o ayuda profesional.",
  },
  {
    title: "Lenguaje responsable",
    description: "Cada respuesta intenta ser útil sin manipular, sin exagerar certezas y sin usar la vulnerabilidad emocional como palanca.",
  },
  {
    title: "Privacidad emocional",
    description: "La experiencia está pensada para tratar cada conversación con respeto, sensibilidad y el menor nivel posible de fricción.",
  },
];

export default function EthicsPage() {
  return (
    <NeuraLayout>
      <main className="pt-24 px-6 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white drop-shadow-xl">Ética y seguridad</h1>

        <section className="about-story-panel mb-8">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            NEURA está diseñada con un enfoque ético: prioriza tu bienestar, evita respuestas dañinas y respeta tus límites emocionales.
            No se trata solo de responder bien, sino de responder con cuidado.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-10">
          {principles.map((principle) => (
            <article key={principle.title} className="ethics-card">
              <span className="ethics-badge">Principio</span>
              <h2 className="text-2xl font-headline font-bold text-white mb-3">{principle.title}</h2>
              <p className="text-white/75 leading-relaxed">{principle.description}</p>
            </article>
          ))}
        </section>

        <section className="capabilities-card">
          <p className="neura-eyebrow mb-5">Compromisos de seguridad</p>
          <ul className="neon-list">
            <li>
              <span className="neon-icon" aria-hidden="true">
                🛡️
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">No incentiva daño</h3>
                <p className="text-white/70 leading-relaxed">Evita respuestas que normalicen autolesión, violencia o conductas que puedan empeorar una crisis.</p>
              </div>
            </li>
            <li>
              <span className="neon-icon" aria-hidden="true">
                ⚖️
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Evita manipulación emocional</h3>
                <p className="text-white/70 leading-relaxed">Busca sostener una conversación sana, sin inducir apego artificial ni dependencia afectiva.</p>
              </div>
            </li>
            <li>
              <span className="neon-icon" aria-hidden="true">
                ✨
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Respuestas responsables</h3>
                <p className="text-white/70 leading-relaxed">La prioridad no es sonar brillante, sino ofrecer claridad, contención y sentido de responsabilidad.</p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </NeuraLayout>
  );
}
