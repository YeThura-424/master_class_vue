<script setup lang="ts">
import { supabase } from './lib/superbaseClient'

console.log(supabase)
</script>

<template>
  <main>
    <RouterView></RouterView>
  </main>
</template>
