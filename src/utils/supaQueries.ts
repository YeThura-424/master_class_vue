import { supabase } from '@/lib/superbaseClient'
import type { QueryData } from '@supabase/supabase-js'

// query for all tasks starts here
export const tasksQuery = supabase.from('tasks').select(`
      *,
      projects (
      id, name, slug
      )
  `)
export type tasksType = QueryData<typeof tasksQuery>

// query for all projects start here
export const projectsQuery = supabase.from('projects').select()
export type projectsType = QueryData<typeof projectsQuery>

// query for single project start here
export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
    *,
    tasks(
      id, name, status, due_date
    )
  `
    )
    .eq('slug', slug)
    .single()

export type projectType = QueryData<ReturnType<typeof projectQuery>>

//query for single task start here
export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
  *,
  projects(
  id,name
  )
  `
    )
    .eq('id', id)
    .single()

export type taskType = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = (id: string) => {
  return supabase.from('profiles').select().eq('id', id).single()
}
