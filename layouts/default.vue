<script setup lang="ts">
const route = useRoute();

watch(
  () => route.meta.title,
  (title) => useSeoMeta({ title: title as string }),
);

useSeoMeta({
  title: route.meta.title as string,
});
</script>

<template>
  <div class="layout-default">
    <NuxtLoadingIndicator style="height: 1px" color="#a855f7" />
    <t-modals-provider>
      <t-header />
      <NuxtPage />
    </t-modals-provider>
    <client-only>
      <t-sync-loader />
    </client-only>
  </div>
</template>

<style scoped></style>
