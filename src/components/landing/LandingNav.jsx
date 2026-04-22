import { Link } from "react-router-dom";

export default function LandingNav({ onStart, open, onToggleMenu, onCloseMenu, onOpenChat }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(189,157,255,0.08)]">
      <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400 font-headline tracking-tight">NEURA</div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer" href="#caracteristicas">Características</a>
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer" href="#sobre-neura">Sobre NEURA</a>
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer" href="#pilares">Inteligencia</a>
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer" href="#mision">Misión</a>
          <button onClick={onOpenChat} className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg cursor-pointer">Chat</button>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="text-slate-300 hover:text-white transition-colors font-medium px-4 py-2" to="/signin">Sign In</Link>
          <button
            onClick={onStart}
            className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-container font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20"
          >
            Get Started
          </button>
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors font-semibold px-3 py-2 rounded-lg border border-white/10"
            onClick={onToggleMenu}
            type="button"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-slate-950/80 border-t border-white/10 px-8 py-6 space-y-4">
          <a className="block text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#caracteristicas" onClick={onCloseMenu}>
            Características
          </a>
          <a className="block text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#sobre-neura" onClick={onCloseMenu}>
            Sobre NEURA
          </a>
          <a className="block text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#pilares" onClick={onCloseMenu}>
            Inteligencia
          </a>
          <a className="block text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#mision" onClick={onCloseMenu}>
            Misión
          </a>
          <Link className="block text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" to="/discover" onClick={onCloseMenu}>
            Descubrir
          </Link>
          <Link to="/chat" onClick={onCloseMenu}>
            <button
              type="button"
              className="w-full bg-gradient-to-br from-primary-dim to-primary text-on-primary-container font-bold px-6 py-2.5 rounded-full shadow-lg shadow-primary/20"
            >
              Get Started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
