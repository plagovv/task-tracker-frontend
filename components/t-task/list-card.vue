<script setup lang="ts">
import type { TaskItem } from "~/types/api/tasksFactory.interface";

const { task } = defineProps<{ task: TaskItem }>();
</script>

<template>
  <t-card class="mb-3 hover:bg-slate-800/20 cursor-default">
    <t-list-item>
      <template #pre>
        <t-task-priority-plate :value="task.priority" />
      </template>
      {{ task.title }}
      <template #actions>
        <div class="flex items-center">
          <t-task-status-plate :status="task.status" class="my-auto" />
        </div>
      </template>
    </t-list-item>
  </t-card>
</template>

<style scoped></style>
