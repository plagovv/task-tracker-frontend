<script setup lang="ts">
const { open: openCreateModal } = useModal("tasksModal");
defineExpose({ openCreateModal });
</script>

<template>
  <t-modal ref="tasksModal" close-outside>
    <div>Что-то тестовое</div>
  </t-modal>
</template>

<style scoped></style>
