import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const butterflies = Array.from(document.querySelectorAll(".butterfly-follow"));
    if (butterflies.length === 0) return;

    const state = butterflies.map((b, i) => {
      const speed = 0.06 + i * 0.03;
      const offsetX = (i - 1) * 70;
      const offsetY = (i - 1) * 40;
      return {
        el: b,
        speed,
        offsetX,
        offsetY,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        tx: window.innerWidth / 2,
        ty: window.innerHeight / 2,
      };
    });

    let rafId = 0;

    const onMove = (e) => {
      const cx = e.clientX;
      const cy = e.clientY;
      for (const s of state) {
        s.tx = cx + s.offsetX;
        s.ty = cy + s.offsetY;
      }
    };

    const tick = () => {
      for (const s of state) {
        s.x += (s.tx - s.x) * s.speed;
        s.y += (s.ty - s.y) * s.speed;
        s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f3d] via-[#3b2752] to-[#4a2c6d] opacity-90"></div>
      <div className="absolute w-[700px] h-[700px] bg-pink-300/20 blur-[120px] rounded-full animate-pulse-slow"></div>

      <img src="/images/Recorte%20de%20mariposa.png" alt="Mariposa 1" className="butterfly-follow" />
      <img src="/images/Recorte%20de%20mariposa%20-%20copia.png" alt="Mariposa 2" className="butterfly-follow" />
      <img src="/images/Recorte%20de%20mariposa%20-%20copia%20(2).png" alt="Mariposa 3" className="butterfly-follow" />

      <h1 className="text-6xl md:text-7xl font-headline font-bold text-white mb-6 relative z-10">
        NEURA — La IA que te entiende
      </h1>

      <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 relative z-10">
        Un acompañante emocional diseñado para ayudarte a pensar mejor, sentirte mejor y vivir mejor.
      </p>

      <div className="flex gap-4 relative z-10">
        <Link to="/chat">
          <button className="px-8 py-3 rounded-full bg-primary text-white font-semibold text-lg shadow-lg hover:scale-105 transition" type="button">
            Empieza ahora
          </button>
        </Link>

        <Link to="/discover">
          <button className="px-8 py-3 rounded-full bg-white/20 text-white font-semibold text-lg border border-white/30 shadow-md hover:scale-105 transition" type="button">
            Descubre NEURA
          </button>
        </Link>
      </div>

      <div className="absolute w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full"></div>
    </section>
  );
}
