import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    navigate('/')
  }

  const initials = user?.user_metadata?.username
    ? user.user_metadata.username.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || 'NR'

  const navLinks = [
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About' },
    { to: '/intelligence', label: 'Intelligence' },
    { to: '/ethics', label: 'Ethics' },
    { to: '/discover', label: 'Discover' },
  ]

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </span>
          <span className="text-2xl font-headline font-bold text-primary">NEURA</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-on-surface">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-white/70 hover:text-white transition"
            >
              {label}
            </Link>
          ))}

          {user ? (
            /* Usuario logueado */
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition"
              >
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">
                  {initials}
                </span>
                <span className="text-white/80 text-sm max-w-[120px] truncate">
                  {user.user_metadata?.username || user.email?.split('@')[0]}
                </span>
                <svg className={`w-3 h-3 text-white/50 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 12 12">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-white/10 bg-[#0f0c14]/95 backdrop-blur-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/chat"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-white/80 hover:bg-white/10 transition"
                  >
                    💬 Ir al chat
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
                  >
                    🚪 Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Usuario sin sesión */
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Iniciar sesión
              </Link>
              <Link to="/signin">
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition"
                >
                  Empezar gratis
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center text-white/80"
          onClick={() => setOpen(!open)}
          type="button"
          aria-label="Menú"
        >
          <span className={`block h-0.5 w-5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-outline-variant px-6 py-4 space-y-3 text-on-surface">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-white/70 hover:text-white transition"
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 border-t border-white/10 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className="text-sm text-white/60 truncate">{user.email}</span>
                </div>
                <Link to="/chat" onClick={() => setOpen(false)}>
                  <button type="button" className="w-full px-5 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm">
                    💬 Ir al chat
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => { handleSignOut(); setOpen(false) }}
                  className="w-full px-5 py-2 rounded-full border border-red-400/30 text-red-400 text-sm"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setOpen(false)}>
                  <button type="button" className="w-full px-5 py-2 rounded-full border border-white/15 text-white/80 text-sm">
                    Iniciar sesión
                  </button>
                </Link>
                <Link to="/signin" onClick={() => setOpen(false)}>
                  <button type="button" className="w-full px-5 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm">
                    Empezar gratis
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
