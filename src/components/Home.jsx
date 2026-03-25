import Hero from "./Hero";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">¿Por qué NEURA?</h2>
        <p className="text-on-surface-variant max-w-2xl mb-8">
          Porque no necesitas solo respuestas. Necesitas un espacio seguro para pensar, sentir y ordenar lo que te pasa por dentro.
        </p>
        <Link to="/features" className="text-primary font-semibold">
          Ver funciones →
        </Link>
      </section>
    </main>
  );
}

