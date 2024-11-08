<script setup lang="ts">
const cardElement = useTemplateRef("card");
defineExpose({ cardElement });
</script>

<template>
  <div
    ref="card"
    class="dark:bg-slate-900 rounded-md bg-white shadow-lg ring-1 dark:ring-slate-200/20 ring-black ring-opacity-5"
  >
    <slot />
  </div>
</template>

<style scoped></style>
