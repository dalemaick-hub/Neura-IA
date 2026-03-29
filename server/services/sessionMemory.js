import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const isSupabaseEnabled = Boolean(supabaseUrl && supabaseServiceKey);

const supabase = isSupabaseEnabled ? createClient(supabaseUrl, supabaseServiceKey) : null;

const fallbackSessions = new Map();
const fallbackMessages = new Map();
const fallbackMemory = new Map();

function getFallbackSession(sessionId, userAgent = null, ip = null) {
  const existing = fallbackSessions.get(sessionId);

  if (existing) {
    return existing;
  }

  const session = {
    id: sessionId,
    user_agent: userAgent,
    ip,
    created_at: new Date().toISOString(),
  };

  fallbackSessions.set(sessionId, session);
  return session;
}

function getFallbackHistory(sessionId) {
  return fallbackMessages.get(sessionId) || [];
}

function isMissingRowError(error) {
  return error?.code === "PGRST116";
}

export async function getOrCreateSession(sessionId, userAgent, ip) {
  if (!isSupabaseEnabled) {
    return getFallbackSession(sessionId, userAgent, ip);
  }

  const { data: existing, error: existingError } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      id: sessionId,
      user_agent: userAgent,
      ip,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveMessage(sessionId, role, content, emotion = null) {
  if (!isSupabaseEnabled) {
    const history = getFallbackHistory(sessionId);
    history.push({
      id: `${sessionId}-${history.length + 1}`,
      session_id: sessionId,
      role,
      content,
      emotion,
      created_at: new Date().toISOString(),
    });
    fallbackMessages.set(sessionId, history);
    return;
  }

  const { error } = await supabase.from("messages").insert({
    session_id: sessionId,
    role,
    content,
    emotion,
  });

  if (error) {
    throw error;
  }
}

export async function getHistory(sessionId) {
  if (!isSupabaseEnabled) {
    return getFallbackHistory(sessionId).map(({ role, content }) => ({ role, content }));
  }

  const { data, error } = await supabase
    .from("messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getMemory(sessionId) {
  if (!isSupabaseEnabled) {
    return fallbackMemory.get(sessionId) || "";
  }

  const { data, error } = await supabase
    .from("memory")
    .select("data")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error && !isMissingRowError(error)) {
    throw error;
  }

  return data?.data || "";
}

export async function saveMemory(sessionId, memory) {
  if (!isSupabaseEnabled) {
    fallbackMemory.set(sessionId, memory);
    return;
  }

  const { error } = await supabase.from("memory").upsert({
    session_id: sessionId,
    data: memory,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }
}

async function getMessageRows(sessionId) {
  if (!isSupabaseEnabled) {
    return getFallbackHistory(sessionId);
  }

  const { data, error } = await supabase
    .from("messages")
    .select("id")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function updateMemory(sessionId, summarizeMemory) {
  const history = await getHistory(sessionId);

  if (history.length < 6) {
    return;
  }

  const summary = await summarizeMemory(history);
  await saveMemory(sessionId, summary);

  if (!isSupabaseEnabled) {
    fallbackMessages.set(sessionId, getFallbackHistory(sessionId).slice(-2));
    return;
  }

  const rows = await getMessageRows(sessionId);
  const idsToDelete = rows.slice(0, Math.max(rows.length - 2, 0)).map((message) => message.id);

  if (idsToDelete.length === 0) {
    return;
  }

  const { error } = await supabase.from("messages").delete().in("id", idsToDelete);

  if (error) {
    throw error;
  }
}

export async function clearSessionData(sessionId) {
  if (!isSupabaseEnabled) {
    fallbackSessions.delete(sessionId);
    fallbackMessages.delete(sessionId);
    fallbackMemory.delete(sessionId);
    return;
  }

  const { error: memoryError } = await supabase.from("memory").delete().eq("session_id", sessionId);

  if (memoryError) {
    throw memoryError;
  }

  const { error: messagesError } = await supabase.from("messages").delete().eq("session_id", sessionId);

  if (messagesError) {
    throw messagesError;
  }

  const { error: sessionError } = await supabase.from("sessions").delete().eq("id", sessionId);

  if (sessionError) {
    throw sessionError;
  }
}

export function isSessionPersistenceEnabled() {
  return isSupabaseEnabled;
}
