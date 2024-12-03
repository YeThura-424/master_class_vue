import type { Login } from '@/types/Auth'
import type { AuthError } from '@supabase/supabase-js'

export const useFormError = () => {
  const serverError = ref('')
  const realTimeError = ref()

  const handelServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Incorrect Email or Password' : error.message
  }

  const handelLoginForm = async (formData: Login) => {
    realTimeError.value = {
      email: [],
      password: []
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors) realTimeError.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors) realTimeError.value.password = passwordErrors
  }

  return {
    serverError,
    handelServerError,
    realTimeError,
    handelLoginForm
  }
}
