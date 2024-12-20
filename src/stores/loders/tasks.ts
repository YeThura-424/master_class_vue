import type { tasksType, taskType } from '@/utils/supaQueries'
import { deleteTaskQuery, taskQuery, tasksQuery, taskUpdateQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTaskStore = defineStore('task-store', () => {
  const tasks = ref<tasksType | null>(null)
  const singleTask = ref<taskType | null>(null)

  const loadedTasks = useMemoize(async (key: string) => await tasksQuery)
  const loadedSingleTask = useMemoize(async (slug: string) => await taskQuery(slug))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof singleTask
    query: typeof tasksQuery | typeof taskQuery
    key: string
    loader: typeof loadedTasks | typeof loadedSingleTask
  }

  const validateCache = ({ ref, query, key, loader }: ValidateCacheParams) => {
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

  const fetchTasks = async () => {
    validateCache({
      ref: tasks,
      query: tasksQuery,
      key: 'tasks',
      loader: loadedTasks
    })
    const { data, error, status } = await loadedTasks('tasks')

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) tasks.value = data
  }

  const fetchSingleTask = async (id: string) => {
    validateCache({
      ref: singleTask,
      query: taskQuery,
      key: id,
      loader: loadedSingleTask
    })

    const { data, error, status } = await loadedSingleTask(id)

    if (error) useErrorStore().setError({ error, customeCode: status })

    if (data) singleTask.value = data
  }

  const updateTask = async () => {
    if (!singleTask.value) return

    const { projects, id, ...taskProperties } = singleTask.value

    await taskUpdateQuery(taskProperties, singleTask.value.id)
  }

  const deleteTask = async () => {
    if (!singleTask.value) return

    await deleteTaskQuery(singleTask.value.id)
  }

  return {
    tasks,
    fetchTasks,
    singleTask,
    fetchSingleTask,
    updateTask,
    deleteTask
  }
})
