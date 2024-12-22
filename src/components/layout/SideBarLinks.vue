<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      exactActiveClass="text-primary bg-muted"
      :to="link.to"
      :class="['nav-link', menuOpen ? 'justify-normal' : 'justify-center']"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span :class="['text-nowrap', menuOpen ? 'block' : 'hidden']">{{ link.title }}</span>
    </RouterLink>
    <div
      v-else
      :class="['nav-link cursor-pointer', menuOpen ? 'justify-normal' : 'justify-center']"
      @click="forwardAction(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span :class="['text-nowrap', menuOpen ? 'block' : 'hidden']">{{ link.title }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import { menuKey } from '@/utils/injectionKeys'
import type { MenuInjectionOptions } from '@/utils/injectionKeys'

interface LinkProp {
  title: string
  to: string
  icon: string
}

const { menuOpen } = inject(menuKey) as MenuInjectionOptions

defineProps<{
  links: LinkProp[]
}>()

const emits = defineEmits<{
  clickAction: [string]
}>()

const forwardAction = (payload: string) => {
  emits('clickAction', payload)
}
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>
