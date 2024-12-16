import type { tasksType, taskType } from '@/utils/supaQueries'
import { taskQuery, tasksQuery } from '@/utils/supaQueries'

export const useTaskStore = defineStore('task-store', () => {
  const tasks = ref<tasksType | null>(null)
  const singleTask = ref<taskType | null>(null)

  const fetchTasks = async () => {
    const { data, error, status } = await tasksQuery

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) tasks.value = data
  }

  const fetchSingleTask = async (id: string) => {
    const { data, error, status } = await taskQuery(id)

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) singleTask.value = data
  }

  return {
    tasks,
    fetchTasks,
    singleTask,
    fetchSingleTask
  }
})
