/*eslint-env node */
import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.VITE_SUPERBASE_URL, process.env.SERVICE_ROLE_KEY)

console.log(supabase)
