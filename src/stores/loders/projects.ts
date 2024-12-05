import { type projectsType } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
export const useProjectStore = defineStore('projects-store', () => {
  const projects = ref<projectsType | null>(null)

  const loadedProjects = useMemoize(async (key: string) => await projectsQuery)

  const validateCache = () => {
    // logic for deleting cached data if something in database has changed
    if (projects.value?.length) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log('Cached and fresh data matched!')
          return
        } else {
          console.log('Something has changed!!')
          loadedProjects.delete('projects')
        }
      })
    }
  }

  const fetchProject = async () => {
    // if (projects.value?.length) return
    validateCache()

    const { data, error, status } = await loadedProjects('projects')

    if (error) useErrorStore().setError({ error, customeCode: status })

    projects.value = data
  }

  return {
    projects,
    fetchProject
  }
})
