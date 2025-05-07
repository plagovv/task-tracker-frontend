<script setup lang="ts">
import type { ComponentExposed } from "vue-component-type-helpers";
import {
  TModalsAddProjectModal,
  type TModalsAddTaskModal,
  TModalsShowEditTaskModal,
} from "#components";
import {
  ADD_PROJECT_MODAL_KEY,
  ADD_TASK_MODAL_KEY,
  SHOW_TASK_MODAL_KEY,
} from "~/components/t-modals/modal-keys";

const addTaskModalRef =
  useTemplateRef<ComponentExposed<typeof TModalsAddTaskModal>>("addTaskModal");
const showEditTaskModalRef =
  useTemplateRef<ComponentExposed<typeof TModalsShowEditTaskModal>>(
    "showTaskModal",
  );
const addProjectModalRef =
  useTemplateRef<ComponentExposed<typeof TModalsAddProjectModal>>(
    "addProjectModal",
  );

provide(ADD_TASK_MODAL_KEY, () =>
  addTaskModalRef?.value?.openCreateTaskModal(),
);
provide(SHOW_TASK_MODAL_KEY, (taskId: string) =>
  showEditTaskModalRef?.value?.openTaskShowEditModal(taskId),
);
provide(ADD_PROJECT_MODAL_KEY, () =>
  addProjectModalRef?.value?.openCreateProjectModal(),
);
</script>

<template>
  <client-only>
    <t-modals-add-task-modal ref="addTaskModal" />
    <t-modals-show-edit-task-modal ref="showTaskModal" />
    <t-modals-add-project-modal ref="addProjectModal" />
  </client-only>
  <slot />
</template>

<style scoped></style>
