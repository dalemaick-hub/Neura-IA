const HISTORY_KEY = "neura_history";
const PROFILE_KEY = "neura_profile";

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
