import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .then(() => caches.keys())
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('neura-'))
          .map((cacheName) => caches.delete(cacheName)),
      ))
      .catch((error) => {
        console.warn('Service worker cleanup failed:', error)
      })
  })
}
