import { createClient } from '@supabase/supabase-js' 
 
const supabaseUrl = 'https://iboteqiyqqljpbkflkew.supabase.co' 
// Usa la 'anon key' que aparece en tu captura de Supabase 
const supabaseKey = 'TU_LLAVE_ANON_REAL_AQUÍ' 
 
export const supabase = createClient(supabaseUrl, supabaseKey)