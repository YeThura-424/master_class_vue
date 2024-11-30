import { supabase } from '@/lib/superbaseClient'
import type { Login, Register } from '@/types/Auth'

const authStore = useAuthStore()

export const register = async (formData: Register) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstname.concat(' ', formData.lastname)
    })

    if (error) return console.log('Profile err: ', error)
  }

  await authStore.setAuth(data.session)

  return true
}

export const login = async (formData: Login) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  await authStore.setAuth(data.session)

  return true
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.log(error)

  await authStore.setAuth()

  return true
}
