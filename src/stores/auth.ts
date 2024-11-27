import type { User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  return {
    user,
    profile
  }
})
