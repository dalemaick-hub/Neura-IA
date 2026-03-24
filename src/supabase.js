import { createClient } from '@supabase/supabase-js'

// Sustituye por tu URL real que ya encontramos
const supabaseUrl = 'https://iboteqiyqqljpbkflkew.supabase.co'
// Usa la llave 'anon' de tu panel de Supabase
const supabaseKey = 'sb_publishable_Er-1Gbhua2RowD08tc5TNw_2REHRW68...' // Pega aquí el código completo

export const supabase = createClient(supabaseUrl, supabaseKey)