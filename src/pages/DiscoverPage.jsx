import { Link } from "react-router-dom";
import NeuraLayout from "../components/NeuraLayout";

const pillars = [
  "Conversaciones que se sienten cercanas, no mecánicas.",
  "Un entorno visual sereno para pensar con calma.",
  "Una IA diseñada para acompañar, no para presionar.",
];

export default function DiscoverPage() {
  return (
    <NeuraLayout>
      <main className="pt-24 px-6 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-white drop-shadow-xl">Descubre NEURA</h1>

        <section className="discover-hero mb-10">
          <div className="max-w-3xl">
            <p className="neura-eyebrow mb-5">Experiencia final</p>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">Una IA que no solo responde. Se queda contigo.</h2>
            <p className="text-lg text-white/78 leading-relaxed mb-8">
              Imagina una IA que no solo responde, sino que te acompaña. NEURA está pensada para ser un espacio donde puedas pensar en voz
              alta sin sentirte juzgado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chat" className="neura-button-primary">
                Entrar al chat
              </Link>
              <Link to="/features" className="neura-button-secondary">
                Ver capacidades
              </Link>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div className="capabilities-card">
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Cada conversación es una oportunidad para conocerte mejor y construir una relación más sana contigo mismo. Por eso NEURA une
              calidez, lenguaje natural y una presencia visual que transmite refugio, claridad y profundidad.
            </p>

            <ul className="discover-list">
              {pillars.map((pillar) => (
                <li key={pillar}>
                  <span className="discover-dot" aria-hidden="true" />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glow-frame glow-frame--soft">
            <div className="discover-sidecard">
              <p className="neura-eyebrow mb-4">Lo que hace distinta a NEURA</p>
              <h3 className="text-2xl font-headline font-bold text-white mb-3">Tecnología con intención emocional.</h3>
              <p className="text-white/72 leading-relaxed">
                No busca llenar la pantalla con ruido. Busca crear una presencia útil, estética y humana para que la experiencia completa se
                sienta íntima, moderna y memorable.
              </p>
            </div>
          </div>
        </section>
      </main>
    </NeuraLayout>
  );
}
