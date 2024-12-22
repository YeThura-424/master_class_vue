<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { menuKey } from '@/utils/injectionKeys'
import { storeToRefs } from 'pinia'

const { pageData } = storeToRefs(usePageStore())

const taskSheetOpen = ref(false)

// const { menuOpen } = useMenu()

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)

provide(menuKey, {
  menuOpen,
  toggleMenu
})
</script>

<template>
  <div>
    <SideBar @taskClicked="taskSheetOpen = true" />
    <AppNewTask v-model="taskSheetOpen" />
    <div :class="['flex flex-col transition-[margin]', menuOpen ? 'ml-52' : 'ml-24']">
      <TopNavBar />
      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
