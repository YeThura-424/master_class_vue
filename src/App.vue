<script setup lang="ts">
import TopNavBar from '@/components/layout/TopNavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
</script>

<template>
  <SideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
