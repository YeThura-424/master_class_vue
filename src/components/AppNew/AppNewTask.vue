<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateForm'
import { createNewTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'

const sheetOpen = defineModel()

const { profile } = storeToRefs(useAuthStore())

const createTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
    collaborators: [profile.value!.id]
  }

  const { error } = await createNewTaskQuery(task)

  if (error) {
    console.log(error, 'Task creation error')
  }

  sheetOpen.value = false
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
          <FormKit
            type="text"
            name="name"
            id="name"
            label="Name"
            placeholder="My new task"
            validation="required|len:3,255"
          />
          <FormKit
            type="select"
            name="profile_id"
            id="profile_id"
            label="User"
            placeholder="Select a user"
            :options="selectOptions.profiles"
            validation="required"
          />
          <FormKit
            type="select"
            name="project_id"
            id="project_id"
            label="Porject"
            placeholder="Select a project"
            :options="selectOptions.projects"
            validation="required"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
            validation="len:0,500"
          />
        </FormKit>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
