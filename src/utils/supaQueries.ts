import { supabase } from '@/lib/superbaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksQuery = supabase.from('tasks').select(`
      *,
      projects (
      id, name, slug
      )
  `)
export type tasksType = QueryData<typeof tasksQuery>

export const projectsQuery = supabase.from('projects').select()
export type projectsType = QueryData<typeof projectsQuery>
