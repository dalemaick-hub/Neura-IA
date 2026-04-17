import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    // Verificar si hay una sesión de invitado guardada
    const guestData = localStorage.getItem('neura_guest')
    if (guestData) {
      const guest = JSON.parse(guestData)
      setUser(guest)
      setIsGuest(true)
      setLoading(false)
      return
    }

    // Carga la sesión inicial de Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        setUser(session.user)
        setIsGuest(false)
      }
      setLoading(false)
    })

    // Escucha cambios de sesión (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        if (session?.user) {
          setUser(session.user)
          setIsGuest(false)
        } else if (!localStorage.getItem('neura_guest')) {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInAsGuest = () => {
    const guestUser = {
      id: 'guest_' + Math.random().toString(36).substr(2, 9),
      email: 'invitado@neura.ia',
      user_metadata: { username: 'Invitado' },
      is_guest: true
    }
    localStorage.setItem('neura_guest', JSON.stringify(guestUser))
    setUser(guestUser)
    setIsGuest(true)
    return { data: guestUser, error: null }
  }

  const signIn = async (email, password) => {
    localStorage.removeItem('neura_guest')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signUp = async (email, password, username) => {
    localStorage.removeItem('neura_guest')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })
    return { data, error }
  }

  const signInWithGoogle = async () => {
    localStorage.removeItem('neura_guest')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/chat`
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    localStorage.removeItem('neura_guest')
    setIsGuest(false)
    const { error } = await supabase.auth.signOut()
    setUser(null)
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    isGuest,
    signIn,
    signUp,
    signInWithGoogle,
    signInAsGuest,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
