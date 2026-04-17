// Las claves ahora incluyen el userId para que cada usuario tenga su propio historial
function key(base, userId) {
  return userId ? `neura_${base}_${userId}` : `neura_${base}_anonymous`
}

function readJson(storageKey, fallback) {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : fallback
  } catch (err) {
    console.warn(`No se pudo leer ${storageKey} desde localStorage.`, err)
    return fallback
  }
}

export function loadHistory(userId) {
  return readJson(key('history', userId), [])
}

export function saveHistory(messages, userId) {
  localStorage.setItem(key('history', userId), JSON.stringify(messages))
}

export function clearHistory(userId) {
  localStorage.removeItem(key('history', userId))
}

export function loadUserProfile(userId) {
  return readJson(key('profile', userId), { name: '', moods: [] })
}

export function saveUserProfile(profile, userId) {
  localStorage.setItem(key('profile', userId), JSON.stringify(profile))
}
