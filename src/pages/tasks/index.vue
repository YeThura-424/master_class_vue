<script setup lang="ts">
import type { tasksType } from '@/utils/supaQueries'
import { tasksQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<tasksType | null>(null)

const fetchTasks = async () => {
  const { data, error, status } = await tasksQuery
  if (error) useErrorStore().setError({ error, customeCode: status })

  tasks.value = data
}

await fetchTasks()
helloo
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
