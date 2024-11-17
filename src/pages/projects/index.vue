<script setup lang="ts">
import { supabase } from '@/lib/superbaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'
const projects = ref<Tables<'projects'>[] | null>(null)
// const getProjects = async () => {}
// IIFE => immediately invoked function expression
;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
  console.log('Projects', projects)
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <pre>{{ projects }}</pre>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
