<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'
const projectsLoder = useProjectStore()
const { projects } = storeToRefs(projectsLoder)
const { fetchProject } = projectsLoder

await fetchProject()

// const { getProfileByIds } = useCollabs()

// const test = getProfileByIds(projects.value[0].collaborators)
const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getGroupedCollabs(projects.value)

console.log(groupedCollabs, 'test data')
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
