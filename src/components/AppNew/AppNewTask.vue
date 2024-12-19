<script setup lang="ts">
const sheetOpen = defineModel()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <p>Contents</p>

        <FormKit type="text" />
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
