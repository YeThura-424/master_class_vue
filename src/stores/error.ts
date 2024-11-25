import type { CustomeError, ExtendPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomeError | ExtendPostgrestError>(null)

  const setError = ({
    error,
    customeCode
  }: {
    error: string | PostgrestError
    customeCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customeCode = customeCode
      return
    }

    activeError.value = error
    activeError.value.statusCode = customeCode
  }

  return {
    activeError,
    setError
  }
})
