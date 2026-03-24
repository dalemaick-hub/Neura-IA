import { createClient } from "@supabase/supabase-js" 

export const supabase = createClient( 
  "https://TU-PROYECTO.supabase.co", 
  "TU_ANON_KEY" 
)
