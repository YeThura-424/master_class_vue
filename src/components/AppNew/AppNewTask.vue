<script setup lang="ts">
const sheetOpen = defineModel()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <p>Contents</p>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
