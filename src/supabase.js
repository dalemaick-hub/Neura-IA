import { createClient } from '@supabase/supabase-js'

// Tu URL del proyecto (Ya la tienes bien)
const supabaseUrl = 'https://iboteqiyqqljpbkflkew.supabase.co'

// Tu llave pública (La que me acabas de pasar)
const supabaseKey = 'sb_publishable_Er-1Gbhua2RowD08tc5TNw_2REHRW68' 

export const supabase = createClient(supabaseUrl, supabaseKey)  