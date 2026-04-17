import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NeuraLayout from '../components/NeuraLayout'

export default function SignInPage() {
  const { signIn, signUp, signInWithGoogle, signInAsGuest } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/chat'

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password)
        if (error) throw error
        navigate(from, { replace: true })
      } else {
        if (password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.')
        }
        const { error } = await signUp(email, password, username)
        if (error) throw error
        setMessage('¡Cuenta creada! Revisa tu email para confirmar tu cuenta y luego inicia sesión.')
        setMode('login')
      }
    } catch (err) {
      setError(translateError(err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    const { error } = await signInWithGoogle()
    if (error) setError(translateError(error.message))
  }

  const handleGuest = () => {
    signInAsGuest()
    navigate(from, { replace: true })
  }

  return (
    <NeuraLayout>
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-headline font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {mode === 'login' ? 'Bienvenid@ de vuelta' : 'Crea tu cuenta'}
            </h1>
            <p className="text-white/60 text-sm">
              {mode === 'login'
                ? 'Inicia sesión para continuar con NEURA'
                : 'Únete a NEURA y empieza tu viaje emocional'}
            </p>
          </div>

          {/* Card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">

            {/* Guest Access */}
            <button
              type="button"
              onClick={handleGuest}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-purple-400/30 bg-purple-400/10 px-5 py-3 text-sm text-purple-300 transition hover:bg-purple-400/20 mb-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Acceder como Invitado
            </button>

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white/90 transition hover:bg-white/15 mb-6"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/40">o con email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-widest block mb-1">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="tu_nombre"
                    required={mode === 'register'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-purple-400/60 transition"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-white/50 uppercase tracking-widest block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-purple-400/60 transition"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase tracking-widest block mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-purple-400/60 transition"
                />
              </div>

              {/* Feedback messages */}
              {error && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}
              {message && (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50 mt-2"
              >
                {loading
                  ? 'Un momento...'
                  : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-xs text-white/50 mt-6">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setMessage('') }}
                className="text-purple-400 hover:text-purple-300 transition font-medium"
              >
                {mode === 'login' ? 'Regístrate gratis' : 'Inicia sesión'}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-white/30 mt-6">
            Privado y seguro · NEURA nunca comparte tus datos
          </p>
        </div>
      </section>
    </NeuraLayout>
  )
}

function translateError(msg) {
  const errors = {
    'Invalid login credentials': 'Email o contraseña incorrectos.',
    'Email not confirmed': 'Confirma tu email antes de iniciar sesión.',
    'User already registered': 'Ya existe una cuenta con ese email.',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    'Unable to validate email address: invalid format': 'El formato del email no es válido.',
    'signup is disabled': 'El registro está desactivado temporalmente.',
  }
  for (const [key, translation] of Object.entries(errors)) {
    if (msg.includes(key)) return translation
  }
  return msg
}
