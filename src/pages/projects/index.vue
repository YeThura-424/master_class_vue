<script setup lang="ts">
import { projectsQuery } from '@/utils/supaQueries'
import type { projectsType } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

const projects = ref<projectsType | null>(null)

usePageStore().pageData.title = 'Projects'

const fetchProject = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)

  projects.value = data
  console.log('Projects', projects)
}

await fetchProject()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
