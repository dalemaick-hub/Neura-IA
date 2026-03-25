import NeuraLayout from "../components/NeuraLayout";

export default function DiscoverPage() {
  return (
    <NeuraLayout>
      <main className="pt-24 px-6 pb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white drop-shadow-xl">Descubre NEURA</h1>
        <p className="text-lg text-white/80 leading-relaxed mb-4">
        Imagina una IA que no solo responde, sino que te acompaña. NEURA está pensada para ser un espacio donde puedas pensar en voz alta
        sin sentirte juzgado.
      </p>
        <p className="text-lg text-white/80 leading-relaxed">
        Cada conversación es una oportunidad para conocerte mejor y construir una relación más sana contigo mismo.
      </p>
      </main>
    </NeuraLayout>
  );
}
