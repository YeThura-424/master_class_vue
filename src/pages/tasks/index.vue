<script setup lang="ts">
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'My Tasks'

const taskLoader = useTaskStore()

const { tasks } = storeToRefs(taskLoader)

const { fetchTasks } = taskLoader

await fetchTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)

useMeta({
  title: 'Tasks | Pulse',
  description: {
    name: 'description',
    content: 'Pulse is a project management app which is web based!!'
  }
})
</script>

<template>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>
