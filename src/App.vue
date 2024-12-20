<script setup lang="ts">
const errorStore = useErrorStore()
onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(() => {
  useAuthStore().trackAuthChange()
})

const AuthLayout = defineAsyncComponent(() => import('./components/layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('./components/layout/main/GuestLayout.vue'))

const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
