<script setup lang="ts">
const props = withDefaults(defineProps<{ loading: boolean }>(), {
  loading: false,
});
</script>

<template>
  <div class="w-full">
    <div v-if="props.loading" class="flex items-center justify-center h-28">
      <t-progress />
    </div>
    <slot v-else />
  </div>
</template>

<style scoped></style>
