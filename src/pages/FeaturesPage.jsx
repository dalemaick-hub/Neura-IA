import NeuraLayout from "../components/NeuraLayout";

export default function FeaturesPage() {
  return (
    <NeuraLayout>
      <main className="pt-24 px-6 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-8">Funciones de NEURA</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-2">🧠 Comprensión emocional</h2>
            <p className="text-white/70">
              NEURA detecta matices emocionales en tus mensajes y adapta su tono y respuestas.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-2">💬 Conversación natural</h2>
            <p className="text-white/70">
              Respuestas fluidas, humanas y coherentes, diseñadas para acompañarte.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-2">📘 Memoria inteligente</h2>
            <p className="text-white/70">
              Resume y conserva lo importante de tus conversaciones para entenderte mejor con el tiempo.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-2">⚡ Ultra velocidad</h2>
            <p className="text-white/70">Impulsada por Groq, NEURA responde casi en tiempo real.</p>
          </div>
        </div>
      </main>
    </NeuraLayout>
  );
}
