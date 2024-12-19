<script setup lang="ts">
const sheetOpen = defineModel()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create New Task</SheetTitle>
        <FormKit type="form" @submit="console.log('here')" submit-label="Create">
          <FormKit type="text" name="name" id="name" label="Name" placeholder="My new task" />
          <FormKit
            type="select"
            name="for"
            id="for"
            label="For"
            placeholder="Select a user"
            :options="[{ label: 'Item name', value: 1 }]"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
          />
          <FormKit
            type="select"
            name="project"
            id="project"
            label="Porject"
            placeholder="Select a project"
            :options="[{ label: 'Item name', value: 1 }]"
          />
        </FormKit>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
