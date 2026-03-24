import { createClient } from '@supabase/supabase-js'

// Sustituye por tu URL real que ya encontramos
const supabaseUrl = 'https://iboteqiyqqljpbkflkew.supabase.co'
// Usa la llave 'anon' de tu panel de Supabase
const supabaseKey = 'PEGA_AQUÍ_TU_LLAVE_ANON_PÚBLICA' 

export const supabase = createClient(supabaseUrl, supabaseKey)