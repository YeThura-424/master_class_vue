import type { PostgrestError } from '@supabase/supabase-js'

export interface CustomeError extends Error {
  customeCode?: number
}

export interface ExtendPostgrestError extends PostgrestError {
  statusCode?: number
}
