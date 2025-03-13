<script setup lang="ts">
const tasksStore = useTasksStore();
const props = withDefaults(
  defineProps<{ taskId?: string; fillWide?: boolean }>(),
  {
    fillWide: false,
    taskId: undefined,
  },
);

onMounted(() => {
  if (props?.taskId) {
    loadTask();
  }
});

const loadTask = () => {
  console.log(`~{t-show-edit-task.vue} Loading (${props.taskId}) task...`);
};

defineExpose({ loadTask });
</script>

<template>
  <t-container>
    <h1>Hello! {{ props.taskId }}</h1>
  </t-container>
</template>

<style scoped></style>
