import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-headline font-bold text-primary">
          NEURA
        </Link>

        <div className="hidden md:flex items-center gap-8 text-on-surface">
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/intelligence">Intelligence</Link>
          <Link to="/ethics">Ethics</Link>
          <Link to="/discover">Discover</Link>

          <Link to="/chat">
            <button className="px-5 py-2 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-dim transition">
              Get Started
            </button>
          </Link>
        </div>

        <button className="md:hidden text-on-surface" onClick={() => setOpen(!open)} type="button">
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-t border-outline-variant px-6 py-4 space-y-4 text-on-surface">
          <Link to="/features" onClick={() => setOpen(false)} className="block">
            Features
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>
          <Link to="/intelligence" onClick={() => setOpen(false)} className="block">
            Intelligence
          </Link>
          <Link to="/ethics" onClick={() => setOpen(false)} className="block">
            Ethics
          </Link>
          <Link to="/discover" onClick={() => setOpen(false)} className="block">
            Discover
          </Link>

          <Link to="/chat" onClick={() => setOpen(false)}>
            <button className="w-full px-5 py-2 rounded-full bg-primary text-on-primary font-semibold" type="button">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

