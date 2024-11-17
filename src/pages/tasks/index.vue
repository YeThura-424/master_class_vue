<script setup lang="ts">
import { supabase } from '@/lib/superbaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'
const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.log(error)

  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <pre>{{ tasks }}</pre>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
