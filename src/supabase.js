import { createClient } from '@supabase/supabase-js' 
 
const supabaseUrl = 'https://iboteqiyqqljpbkflkew.supabase.co' 
// Usa la 'anon key' que aparece en tu captura de Supabase 
const supabaseKey = 'sb_publishable_Er-1Gbhua2RowD08tc5TNw_2REHRW68' 
 
export const supabase = createClient(supabaseUrl, supabaseKey)