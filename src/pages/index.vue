<script setup lang="ts">
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>
