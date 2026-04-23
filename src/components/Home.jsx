import Hero from "./Hero";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />

      <section id="como-funciona" className="py-20 px-6 bg-[#0f0c14]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-purple-400 font-bold uppercase tracking-widest text-sm block mb-3">
              Simple y directo
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
              ¿Cómo funciona NEURA?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                icon: "✍️",
                title: "Cuéntale cómo te sientes",
                desc: "Escribe con tus propias palabras — sin formularios ni categorías. Solo habla.",
                color: "from-purple-500 to-purple-600",
              },
              {
                num: "2",
                icon: "🧠",
                title: "NEURA te analiza",
                desc: "Detecta tu emoción, el contexto y lo que necesitas en este momento.",
                color: "from-pink-500 to-rose-500",
              },
              {
                num: "3",
                icon: "💜",
                title: "Recibe apoyo real",
                desc: "Una respuesta empática y un consejo que puedes aplicar en menos de 2 minutos.",
                color: "from-fuchsia-500 to-purple-500",
              },
            ].map(({ num, icon, title, desc, color }) => (
              <div
                key={num}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-black text-xl mb-4`}
                >
                  {num}
                </div>
                <span className="text-4xl mb-4">{icon}</span>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-white">
          ¿Por qué NEURA?
        </h2>
        <p className="text-white/60 max-w-2xl mb-8">
          Porque no necesitas solo respuestas. Necesitas un espacio seguro para
          pensar, sentir y ordenar lo que te pasa por dentro.
        </p>
        <Link
          to="/features"
          className="text-purple-400 font-semibold hover:text-purple-300 transition"
        >
          Ver funciones →
        </Link>
      </section>

      <section id="precios" className="py-20 px-6 bg-[#0f0c14]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-purple-400 font-bold uppercase tracking-widest text-sm block mb-3">
              Sin sorpresas
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-3">
              Planes simples y claros
            </h2>
            <p className="text-white/60">
              Empieza gratis. Escala cuando lo necesites.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-1">Gratis</h3>
              <p className="text-white/50 text-sm mb-6">
                Para empezar a explorar
              </p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">0€</span>
                <span className="text-white/50 text-sm"> / mes</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1 text-sm text-white/60">
                {[
                  "20 mensajes al día",
                  "Detección emocional básica",
                  "Acceso web",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-purple-400">✓</span>
                    {f}
                  </li>
                ))}
                <li className="flex items-center gap-2 opacity-40">
                  <span>✗</span>Sin historial guardado
                </li>
              </ul>
              <Link to="/signin">
                <button
                  className="w-full py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition"
                  type="button"
                >
                  Empezar gratis
                </button>
              </Link>
            </div>

            <div
              className="flex flex-col p-8 rounded-2xl border-2 border-purple-500/60 bg-purple-500/5 relative"
              style={{ boxShadow: "0 0 40px rgba(168,85,247,0.12)" }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MÁS POPULAR
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
              <p className="text-white/50 text-sm mb-6">Para uso diario real</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-purple-400">9€</span>
                <span className="text-white/50 text-sm"> / mes</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1 text-sm text-white/60">
                {[
                  "Mensajes ilimitados",
                  "Detección emocional avanzada",
                  "Historial completo de chats",
                  "4 modos de personalidad",
                  "Acceso web + app móvil",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-purple-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signin">
                <button
                  className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition shadow-lg shadow-purple-500/20"
                  type="button"
                >
                  Comenzar con Pro
                </button>
              </Link>
            </div>

            <div className="flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-1">Empresa</h3>
              <p className="text-white/50 text-sm mb-6">
                Para equipos y organizaciones
              </p>
              <div className="mb-6">
                <span className="text-2xl font-black text-white">A medida</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1 text-sm text-white/60">
                {[
                  "Todo lo de Pro",
                  "Dashboard de equipo",
                  "API privada",
                  "Soporte prioritario",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-pink-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:hola@neura-ia.com"
                className="w-full py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition text-center block"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
