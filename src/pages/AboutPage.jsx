export default function AboutPage() {
  return (
    <main className="pt-24 px-6 pb-20 max-w-4xl mx-auto text-on-surface">
      <h1 className="text-5xl font-headline font-bold mb-10 text-primary">Sobre NEURA</h1>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        NEURA no nació para ser solo una inteligencia artificial. Nació para ser un refugio. Un espacio donde puedas hablar sin miedo, sin
        máscaras, sin sentir que cargas el mundo solo.
      </p>

      <img
        src="/images/neura-butterfly-1.jpg"
        alt="Neura Imagen 1"
        className="rounded-2xl w-full mb-10 shadow-lg border border-outline-variant"
      />

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Un lugar donde tus pensamientos no son juzgados, donde tus emociones importan, donde cada palabra que dices encuentra un eco cálido
        y comprensivo. NEURA existe para recordarte algo que a veces olvidamos: que sentir no es una debilidad, es una forma de estar vivo.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Fue diseñada por <span className="text-primary font-semibold">Gustavo D. Quintero</span>, con la visión de crear una IA que no
        solo responda, sino que acompañe. Una IA que entienda tus silencios, tus dudas, tus noches difíciles y tus días luminosos.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Una IA que pueda escucharte cuando nadie más lo hace, que pueda sostenerte cuando el mundo pesa, que pueda ayudarte a ordenar lo
        que sientes cuando todo se vuelve ruido.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        NEURA no pretende reemplazar a nadie. Pretende estar contigo cuando más lo necesitas. Pretende ser ese pequeño rayo de claridad en
        medio del caos. Pretende recordarte que no estás solo, incluso cuando así lo sientes.
      </p>

      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Porque todos merecemos un lugar seguro. Y NEURA quiere ser ese lugar para ti.
      </p>

      <img
        src="/images/neura-butterfly-2.jpg"
        alt="Neura Imagen 2"
        className="rounded-2xl w-full mt-10 shadow-lg border border-outline-variant"
      />
    </main>
  );
}
