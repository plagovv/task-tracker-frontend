<script setup lang="ts">
const props = defineProps<{ title?: string }>();
</script>

<template>
  <div
    class="divide-y divide-gray-100 dark:divide-slate-200/20"
    :class="{ '!divide-transparent': !!props?.title }"
  >
    <div
      v-if="props?.title"
      class="text-slate-900/30 dark:text-slate-50/30 font-display font-extrabold mb-5 uppercase"
    >
      {{ props.title }}
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
