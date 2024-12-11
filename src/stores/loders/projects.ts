import { projectQuery } from '@/utils/supaQueries'
import type { projectsType, projectType } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectStore = defineStore('projects-store', () => {
  const projects = ref<projectsType>([])
  const singleProject = ref<projectType>()

  const loadedProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadedSingleProject = useMemoize(async (slug: string) => await projectQuery(slug))

  const validateCache = () => {
    // logic for deleting cached data if something in database has changed
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return
        } else {
          loadedProjects.delete('projects')
          if (!error && data) {
            projects.value = data
          }
        }
      })
    }
  }

  const fetchProject = async () => {
    // if (projects.value?.length) return
    validateCache()

    const { data, error, status } = await loadedProjects('projects')

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) projects.value = data
  }

  const fetchSingleProject = async (slug: string) => {
    const { data, error, status } = await loadedSingleProject(slug)
    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) singleProject.value = data
  }

  return {
    projects,
    fetchProject,
    fetchSingleProject
  }
})
