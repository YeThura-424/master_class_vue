<script setup lang="ts">
import { login } from '@/utils/supaAuth'
import { watchDebounced } from '@vueuse/core'

const formData = reactive({
  email: '',
  password: ''
})

const router = useRouter()
const { serverError, handelServerError, realTimeError, handelLoginForm } = useFormError()
const signin = async () => {
  const { error } = await login(formData)

  if (!error) return router.push('/')

  handelServerError(error)
}

watchDebounced(
  formData,
  () => {
    handelLoginForm(formData)
  },
  { debounce: 1000, deep: true }
)
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              v-model="formData.email"
              type="email"
              placeholder="johndoe19@example.com"
              required
              :class="{ 'border-red-500': serverError }"
            />
            <ul class="text-sm text-left text-red-500" v-if="realTimeError?.email.length">
              <li v-for="error in realTimeError.email" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              v-model="formData.password"
              id="password"
              type="password"
              autocomplete
              required
              :class="{ 'border-red-500': serverError }"
            />
            <ul class="text-sm text-left text-red-500" v-if="realTimeError?.password.length">
              <li v-for="error in realTimeError.password" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
          <ul class="text-sm text-left text-red-500" v-if="serverError">
            <li class="list-disc">{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
