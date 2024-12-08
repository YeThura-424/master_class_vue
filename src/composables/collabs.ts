import { projectCollabQuery } from '@/utils/supaQueries'

export const useCollabs = () => {
  const getProfileByIds = async (projIds: string[]) => {
    const { data, error } = await projectCollabQuery(projIds)

    if (error || !data) return []

    return data
  }

  return {
    getProfileByIds
  }
}
