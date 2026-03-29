const HISTORY_KEY = "neura_history";
const PROFILE_KEY = "neura_profile";
const SESSION_KEY = "neura_session_id";

function readJson(key, fallbackValue) {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    console.warn(`No se pudo leer ${key} desde localStorage.`, error);
    return fallbackValue;
  }
}

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `neura-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function loadHistory() {
  return readJson(HISTORY_KEY, []);
}

export function saveHistory(messages) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function loadUserProfile() {
  return readJson(PROFILE_KEY, { name: "", moods: [] });
}

export function saveUserProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getOrCreateSessionId() {
  const existingSessionId = localStorage.getItem(SESSION_KEY);

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = createSessionId();
  localStorage.setItem(SESSION_KEY, newSessionId);
  return newSessionId;
}

export function resetSessionId() {
  const newSessionId = createSessionId();
  localStorage.setItem(SESSION_KEY, newSessionId);
  return newSessionId;
}
