import { supabase } from "./supabase"

export async function saveKnowledge(text) {
  await supabase.from("documents").insert({
    content: text,
    type: "knowledge"
  })
}