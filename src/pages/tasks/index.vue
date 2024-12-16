<script setup lang="ts">
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'My Tasks'

const taskLoader = useTaskStore()

const { tasks } = storeToRefs(taskLoader)

const { fetchTasks } = taskLoader

await fetchTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
