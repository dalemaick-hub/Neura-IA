import NeuraLayout from "../components/NeuraLayout";

const capabilities = [
  {
    icon: "⚡",
    title: "Procesamiento de lenguaje natural",
    description: "NEURA interpreta contexto, intención y matices emocionales para responder con mayor sensibilidad y precisión.",
  },
  {
    icon: "🛡️",
    title: "Memoria inteligente",
    description: "Resume y conserva lo importante de tus conversaciones para entenderte mejor con el paso del tiempo.",
  },
  {
    icon: "💬",
    title: "Conversación natural",
    description: "Genera respuestas fluidas, humanas y coherentes, diseñadas para acompañarte sin perder claridad.",
  },
  {
    icon: "🫀",
    title: "Adaptación progresiva",
    description: "Ajusta el tono, el ritmo y la profundidad de sus respuestas según cómo te expresas en cada momento.",
  },
];

export default function FeaturesPage() {
  return (
    <NeuraLayout>
      <main className="pt-24 px-6 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white">Funciones de NEURA</h1>

        <section className="capabilities-card">
          <p className="neura-eyebrow mb-5">Capacidades principales</p>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">Una presencia más humana, una respuesta más útil.</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-3xl">
            Transformamos las funciones de NEURA en una experiencia visual más viva: panel translúcido, brillo suave y una lista con iconos
            luminosos para reforzar cada capacidad.
          </p>

          <ul className="neon-list">
            {capabilities.map((capability) => (
              <li key={capability.title}>
                <span className="neon-icon" aria-hidden="true">
                  {capability.icon}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{capability.title}</h3>
                  <p className="text-white/70 leading-relaxed">{capability.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </NeuraLayout>
  );
}
