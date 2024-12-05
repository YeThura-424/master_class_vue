import { type projectsType } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
export const useProjectStore = defineStore('projects-store', () => {
  const projects = ref<projectsType | null>(null)
  const loadedProjects = useMemoize(async (key: string) => await projectsQuery)
  const fetchProject = async () => {
    // if (projects.value?.length) return

    const { data, error, status } = await loadedProjects('projects')

    if (error) useErrorStore().setError({ error, customeCode: status })

    projects.value = data
  }

  return {
    projects,
    fetchProject
  }
})
