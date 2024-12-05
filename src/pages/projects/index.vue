<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'
const projectsLoder = useProjectStore()
const { projects } = storeToRefs(projectsLoder)
const { fetchProject } = projectsLoder

await fetchProject()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
