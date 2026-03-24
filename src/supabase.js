import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iboteqiyqqljpbkflkew.supabase.co'
// Usa tu llave anon real aquí
const supabaseKey = 'sb_publishable_Er-1Gbhua2RowD08tc5TNw_2REHRW68' 

export const supabase = createClient(supabaseUrl, supabaseKey)