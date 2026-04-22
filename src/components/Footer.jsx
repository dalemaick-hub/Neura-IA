export default function Footer() {
  return (
    <footer className="border-t border-pink-300/40 bg-white/60 backdrop-blur-xl mt-16 animate-heartbeat">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#6b3a7c] text-sm font-medium">© {new Date().getFullYear()} NEURA Intelligence. Hecho con propósito.</p>
        <p className="text-[#6b3a7c] text-sm font-medium">
          Creada con amor por <span className="text-pink-600 font-semibold">Gustavo D. Quintero</span>.
        </p>
      </div>
    </footer>
  );
}
