export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0810] border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="text-xl font-bold text-purple-400 mb-3">NEURA</div>
          <p className="text-white/40 text-sm leading-relaxed">
            Construyendo el futuro de la inteligencia emocional. Tu bienestar,
            nuestra misión.
          </p>
        </div>
        <div>
          <span className="text-white font-semibold text-sm block mb-4">
            Producto
          </span>
          <div className="flex flex-col gap-2 text-sm text-white/40">
            <a href="/#como-funciona" className="hover:text-purple-300 transition">
              Cómo funciona
            </a>
            <a href="/features" className="hover:text-purple-300 transition">
              Características
            </a>
            <a href="/#precios" className="hover:text-purple-300 transition">
              Precios
            </a>
            <a href="/discover" className="hover:text-purple-300 transition">
              Descubre NEURA
            </a>
          </div>
        </div>
        <div>
          <span className="text-white font-semibold text-sm block mb-4">
            Compañía
          </span>
          <div className="flex flex-col gap-2 text-sm text-white/40">
            <a href="/about" className="hover:text-purple-300 transition">
              Sobre NEURA
            </a>
            <a href="/intelligence" className="hover:text-purple-300 transition">
              Inteligencia
            </a>
            <a href="/ethics" className="hover:text-purple-300 transition">
              Ética
            </a>
          </div>
        </div>
        <div>
          <span className="text-white font-semibold text-sm block mb-4">
            Legal & Redes
          </span>
          <div className="flex flex-col gap-2 text-sm text-white/40">
            <a href="#" className="hover:text-purple-300 transition">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-purple-300 transition">
              Términos de servicio
            </a>
            <a
              href="https://github.com/dalemaick-hub/Neura-IA"
              target="_blank"
              rel="noopener"
              className="hover:text-purple-300 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-sm">
          © {year} NEURA Intelligence. Hecho con propósito.
        </p>
        <p className="text-white/30 text-sm">
          Creada por <span className="text-purple-400">Gustavo D. Quintero</span>
        </p>
      </div>
    </footer>
  );
}
