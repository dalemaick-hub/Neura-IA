export default function LandingNav({ open, onToggleMenu, onCloseMenu, onOpenChat }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(189,157,255,0.08)]">
      <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <a href="#inicio" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400 font-headline tracking-tight">
          NEURA
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-indigo-400 border-b-2 border-indigo-500 pb-1 font-headline tracking-tight font-bold text-lg hover:text-white transition-all" href="#caracteristicas">Características</a>
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#sobre-neura">Sobre NEURA</a>
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#pilares">Inteligencia</a>
          <a className="text-slate-300 hover:text-white transition-colors font-headline tracking-tight font-bold text-lg" href="#mision">Misión</a>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onOpenChat} className="hidden md:block text-slate-300 hover:text-white transition-colors font-medium px-4 py-2">
            Iniciar sesión
          </button>
          <button
            onClick={onOpenChat}
            className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-container font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20"
          >
            Comenzar
          </button>
          <button
            className="md:hidden text-slate-300 hover:text-white ml-2"
            onClick={onToggleMenu}
            type="button"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-[rgba(7,9,14,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <button onClick={onCloseMenu} className="absolute top-6 right-8 text-slate-400 hover:text-white" type="button">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
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
          <button
            type="button"
            onClick={() => {
              onOpenChat()
              onCloseMenu()
            }}
            className="mt-4 bg-gradient-to-br from-primary-dim to-primary text-on-primary-container font-bold px-8 py-3 rounded-full text-lg"
          >
            Comenzar gratis
          </button>
        </div>
      )}
    </nav>
  );
}
