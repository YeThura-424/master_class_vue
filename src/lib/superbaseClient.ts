import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://bhmkxppanyetkvgzvdta.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobWt4cHBhbnlldGt2Z3p2ZHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4OTU1NjgsImV4cCI6MjAzNDQ3MTU2OH0.1FzvkAprgWhA5QrY4-6I8tNYuBpK4xZiq_Ody9FTRLM'
)
