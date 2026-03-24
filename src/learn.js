import { supabase } from "./supabase"

export async function saveKnowledge(text) {
  await supabase.from("neura_memory").insert({
    content: text,
    user: "knowledge"
  })
}