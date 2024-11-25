import type { CustomeError, ExtendPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomeError | ExtendPostgrestError>(null)
  const isCustomeError = ref(false)
  const setError = ({
    error,
    customeCode
  }: {
    error: string | PostgrestError | Error
    customeCode?: number
  }) => {
    if (typeof error === 'string') isCustomeError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customeCode = customeCode || 500
      return
    }

    activeError.value = error
    activeError.value.statusCode = customeCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomeError.value = false
  }

  return {
    activeError,
    setError,
    isCustomeError,
    clearError
  }
})
