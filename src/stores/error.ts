import type { CustomeError } from '@/types/Error'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomeError>(null)

  const setError = ({ error, customeCode }: { error: string; customeCode: number }) => {
    activeError.value = Error(error)
    activeError.value.customeCode = customeCode
  }

  return {
    activeError,
    setError
  }
})
