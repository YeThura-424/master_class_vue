import { type projectsType } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'

export const useProjectStore = defineStore('projects-store', () => {
  const projects = ref<projectsType | null>(null)

  const fetchProject = async () => {
    if (projects.value?.length) return

    const { data, error, status } = await projectsQuery

    if (error) useErrorStore().setError({ error, customeCode: status })

    projects.value = data
  }

  return {
    projects,
    fetchProject
  }
})
