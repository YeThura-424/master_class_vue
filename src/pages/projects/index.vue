<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectStore()
const { projects } = storeToRefs(projectsLoader)
const { fetchProject } = projectsLoader

await fetchProject()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)

useMeta({
  title: 'Projects | Pulse',
  description: {
    name: 'description',
    content: 'Pulse is a project management app which is web based!!'
  }
})
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
