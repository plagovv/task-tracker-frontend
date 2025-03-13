<script setup lang="ts">
import type { ComponentExposed } from "vue-component-type-helpers";
import {
  type TModalsAddTaskModal,
  TModalsShowEditTaskModal,
} from "#components";
import {
  ADD_MODAL_KEY,
  SHOW_TASK_MODAL_KEY,
} from "~/components/t-modals/modal-keys";

const addTaskModalRef =
  useTemplateRef<ComponentExposed<typeof TModalsAddTaskModal>>("addTaskModal");
const showEditTaskModalRef =
  useTemplateRef<ComponentExposed<typeof TModalsShowEditTaskModal>>(
    "showTaskModal",
  );

provide(ADD_MODAL_KEY, () => addTaskModalRef?.value?.openCreateTaskModal());
provide(SHOW_TASK_MODAL_KEY, (taskId: string) =>
  showEditTaskModalRef?.value?.openTaskShowEditModal(taskId),
);
</script>

<template>
  <client-only>
    <t-modals-add-task-modal ref="addTaskModal" />
    <t-modals-show-edit-task-modal ref="showTaskModal" />
  </client-only>
  <slot />
</template>

<style scoped></style>
