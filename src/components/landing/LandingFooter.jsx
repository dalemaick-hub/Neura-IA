export default function LandingFooter() {
  return (
    <footer className="bg-slate-950 w-full py-20 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="text-xl font-bold text-indigo-400 font-headline">NEURA</div>
          <p className="font-inter text-sm text-slate-400 leading-relaxed">
            Construyendo el futuro de la inteligencia emocional artificial con un enfoque en la soberania del usuario y la salud mental.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white font-medium font-headline">Producto</span>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Features</a>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">AI Ethics</a>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Mission Statement</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white font-medium font-headline">Legal</span>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Privacy Policy</a>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Terms of Service</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white font-medium font-headline">Social</span>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">Twitter</a>
          <a className="text-slate-500 hover:text-indigo-300 transition-colors font-inter text-sm" href="#">LinkedIn</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-inter text-sm text-slate-400 opacity-90">© 2024 NEURA Intelligence. Human-Centric by Design.</p>
        <div className="flex gap-6 items-center">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="text-xs uppercase tracking-widest text-slate-500">System Online</span>
        </div>
      </div>
    </footer>
  );
}
