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
      <t-app>
        <NuxtPage />
      </t-app>
    </t-modals-provider>
  </div>
</template>

<style scoped></style>
