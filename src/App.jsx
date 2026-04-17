import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
import IntelligencePage from './pages/IntelligencePage'
import EthicsPage from './pages/EthicsPage'
import DiscoverPage from './pages/DiscoverPage'
import ChatPage from './pages/ChatPage'
import SignInPage from './pages/SignInPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/ethics" element={<EthicsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Ruta protegida — requiere sesión activa */}
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
