<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateForm'
import { profilesQuery, projectsQuery } from '@/utils/supaQueries'

const sheetOpen = defineModel()

const createTask = async (formData: CreateNewTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formData))
    }, 2000)
  })
}

type SelectOptions = { label: string; value: number | string }

const selectOptions = reactive({
  projects: [] as SelectOptions[],
  profiles: [] as SelectOptions[]
})

const getProjects = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.map((project) => {
    selectOptions.projects.push({
      label: project.name,
      value: project.id
    })
  })
}

const getProfiles = async () => {
  const { data: allProfile } = await profilesQuery

  if (!allProfile) return

  allProfile.map((profile) => {
    selectOptions.profiles.push({
      label: profile.full_name,
      value: profile.id
    })
  })
}

const getSelectOptions = async () => {
  await Promise.all([getProjects(), getProfiles()])
}

getSelectOptions()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create New Task</SheetTitle>
        <FormKit type="form" @submit="createTask" submit-label="Create">
          <FormKit type="text" name="name" id="name" label="Name" placeholder="My new task" />
          <FormKit
            type="select"
            name="for"
            id="for"
            label="For"
            placeholder="Select a user"
            :options="selectOptions.profiles"
          />
          <FormKit
            type="select"
            name="project"
            id="project"
            label="Porject"
            placeholder="Select a project"
            :options="selectOptions.projects"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
          />
        </FormKit>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
