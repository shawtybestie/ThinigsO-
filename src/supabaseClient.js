import { createClient } from '@supabase/supabase-js'

// Вставьте сюда ваши реальные данные из вкладки Settings -> API
const supabaseUrl = 'https://fqqzgfonplndhdodfjaq.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcXpnZm9ucGxuZGhkb2RmamFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDgyMDMsImV4cCI6MjA5NTIyNDIwM30.TM9bsrmCZNwkYIkexLnODAcJmrn0Z433MhqY5p8mK4Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)




