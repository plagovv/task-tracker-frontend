<script setup lang="ts">
const route = useRoute();
const taskId = route.params.id.toString();
</script>

<template>
  <t-show-edit-task :task-id="taskId" />
</template>

<style scoped></style>
