import type { tasksType, taskType } from '@/utils/supaQueries'
import { tasksQuery } from '@/utils/supaQueries'

export const useTaskStore = defineStore('task-store', () => {
  const tasks = ref<tasksType | null>(null)
  const singleTasks = ref<taskType | null>(null)

  const fetchTasks = async () => {
    const { data, error, status } = await tasksQuery

    if (error) useErrorStore().setError({ error, customeCode: status })

    tasks.value = data
  }

  return {
    tasks,
    fetchTasks
  }
})
