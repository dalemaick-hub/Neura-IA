import NeuraLayout from "../components/NeuraLayout";

export default function EthicsPage() {
  return (
    <NeuraLayout>
      <main className="pt-24 px-6 pb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white drop-shadow-xl">Ética y seguridad</h1>
        <p className="text-lg text-white/80 leading-relaxed mb-4">
        NEURA está diseñada con un enfoque ético: prioriza tu bienestar, evita respuestas dañinas y respeta tus límites emocionales.
      </p>
        <ul className="space-y-3 text-white/80">
        <li>• No incentiva daño propio ni hacia otros.</li>
        <li>• Evita manipulación emocional.</li>
        <li>• Busca siempre respuestas responsables y cuidadosas.</li>
      </ul>
      </main>
    </NeuraLayout>
  );
}
