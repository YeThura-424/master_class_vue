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

// profile query
export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

// collaborator query from each projects
export const projectCollabQuery = (projIds: string[]) => {
  return supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', projIds)
}

export type Collabs = QueryData<ReturnType<typeof projectCollabQuery>>
