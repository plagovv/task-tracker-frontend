<script setup lang="ts">
const props = defineProps<{ title?: string }>();
</script>

<template>
  <div class="divide-y divide-gray-100 dark:divide-slate-200/20">
    <div v-if="props?.title" class="dark:text-white font-display mb-5">
      {{ props.title }}
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
