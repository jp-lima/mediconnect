import {createClient}  from '@supabase/supabase-js'

const supabaseUrl = "https://vkrunkaasequqrakmkme.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcnVua2Fhc2VxdXFyYWtta21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzQ4MTUsImV4cCI6MjA3MTU1MDgxNX0.wicLKV2vhxi56w4SQ4XTI5cMVZcMxAN8Ddk-GokVSts"



export  const supabase = createClient(supabaseUrl, supabaseAnonKey);