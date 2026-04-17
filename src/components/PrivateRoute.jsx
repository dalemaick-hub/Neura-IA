import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Mientras comprueba la sesión muestra un spinner mínimo
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0c14]">
        <div className="w-8 h-8 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin" />
      </div>
    )
  }

  // Si no hay sesión, redirige a signin guardando el destino original
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}
