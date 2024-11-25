<script setup lang="ts">
defineProps<{
  message: string
  customeCode: number
  statusCode: number
  code: string
  hint: string | null
  detail: string
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customeCode || code }}</h1>
    <p class="error__code">Status Code:{{ statusCode }}</p>
    <p class="error__msg">{{ message }}</p>
    <p v-if="hint">{{ hint }}</p>
    <p v-if="detail">{{ detail }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
