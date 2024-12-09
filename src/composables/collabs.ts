import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { projectCollabQuery } from '@/utils/supaQueries'
import type { projectsType, tasksType } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfileByIds = async (projIds: string[]) => {
    const { data, error } = await projectCollabQuery(projIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: projectsType | tasksType) => {
    const filteredItems = items.filter((item) => item.collaborators.length)
    const promises = filteredItems.map((item) => getProfileByIds(item.collaborators))

    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return {
    getProfileByIds,
    getGroupedCollabs,
    groupedCollabs
  }
}
