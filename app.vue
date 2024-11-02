<script setup lang="ts">
const colorMode = useColorMode();
colorMode.preference = "dark";
</script>

<template>
  <NuxtLayout />
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-slate-900 dark:text-gray-200;
}
</style>
