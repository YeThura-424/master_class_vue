import type { AuthError } from '@supabase/supabase-js'

export const useFormError = () => {
  const serverError = ref('')

  const handelServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Incorrect Email or Password' : error.message
  }

  return {
    serverError,
    handelServerError
  }
}
