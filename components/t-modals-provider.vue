<script setup lang="ts">
import type { ComponentExposed } from "vue-component-type-helpers";
import type { TModalsAddTaskModal } from "#components";
import { ADD_MODAL_KEY } from "~/components/t-modals/modal-keys";

const addTaskModalRef =
  useTemplateRef<ComponentExposed<typeof TModalsAddTaskModal>>("addModal");

provide(ADD_MODAL_KEY, () => addTaskModalRef?.value?.openCreateModal());
</script>

<template>
  <client-only>
    <t-modals-add-task-modal ref="addModal" />
  </client-only>
  <slot />
</template>

<style scoped></style>
