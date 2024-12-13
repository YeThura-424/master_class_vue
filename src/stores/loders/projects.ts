import type { projectsType, projectType } from '@/utils/supaQueries'
import { projectsQuery, projectQuery, projectUpdateQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectStore = defineStore('projects-store', () => {
  const projects = ref<projectsType | null>(null)
  const singleProject = ref<projectType | null>(null)

  const loadedProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadedSingleProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface ValidateCacheParams {
    ref: typeof projects | typeof singleProject
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loader: typeof loadedProjects | typeof loadedSingleProject
  }

  const validateCache = ({ ref, query, key, loader }: ValidateCacheParams) => {
    // logic for deleting cached data if something in database has changed

    const finalQuery = typeof query === 'function' ? query(key) : query

    if (ref.value) {
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loader.delete(key)
          if (!error && data) {
            ref.value = data
          }
        }
      })
    }
  }

  const fetchProject = async () => {
    projects.value = null

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loader: loadedProjects
    })

    const { data, error, status } = await loadedProjects('projects')

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) projects.value = data
  }

  const fetchSingleProject = async (slug: string) => {
    singleProject.value = null

    const { data, error, status } = await loadedSingleProject(slug)

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) singleProject.value = data

    validateCache({
      ref: singleProject,
      query: projectQuery,
      key: slug,
      loader: loadedSingleProject
    })
  }

  const updateProject = async () => {
    if (!singleProject.value) return

    //destructuring tasks and id from the projects value (tasks and id will not be updated along with project)
    const { tasks, id, ...projectProperties } = singleProject.value

    await projectUpdateQuery(projectProperties, singleProject.value.id)
  }

  return {
    projects,
    fetchProject,
    singleProject,
    fetchSingleProject,
    updateProject
  }
})
