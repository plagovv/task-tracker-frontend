<script setup lang="ts">
const { value = 0 } = defineProps<{ value?: number }>();

const valueIcon = [
  "mdi:chevron-down",
  "mdi:chevron-up",
  "mdi:chevron-double-up",
  "mdi:chevron-triple-up",
];

const iconName = computed(() => valueIcon[value] || "mdi:hot");
const iconColor = computed(() => {
  if (value < 1) {
    return "text-purple-500/50";
  }
  if (value > 2) {
    return "text-red-600";
  }
  return "text-purple-500";
});
</script>

<template>
  <icon :icon="iconName" :class="[iconColor]" />
</template>

<style scoped></style>
