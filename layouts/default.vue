<script setup lang="ts">
const route = useRoute();

watch(
  () => route.meta.title,
  (title) => useSeoMeta({ title: title as string }),
);

useSeoMeta({
  title: route.meta.title as string,
});

// const mainState = useMainStore();
</script>

<template>
  <div class="layout-default">
    <NuxtLoadingIndicator style="height: 10px" />
    <t-header />
    <NuxtPage />
  </div>
</template>

<style scoped></style>
