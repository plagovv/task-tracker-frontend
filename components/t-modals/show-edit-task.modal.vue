<script setup lang="ts">
const { open: openTaskShowEditModal } = useModal("taskShowEditModal");
defineExpose({
  openTaskShowEditModal: (id: string) => {
    openTaskShowEditModal();
    taskId.value = id;
  },
});

const taskId = ref<string>("");
</script>

<template>
  <t-modal
    ref="taskShowEditModal"
    hide-title
    modal-class="lg:w-4/6 md:w-4/5 sm:w-5/6 w-full min-h-full sm:min-h-[70vh]"
  >
    <t-show-edit-task
      ref="taskShowEdit"
      :task-id="taskId"
      full-wide
      class="min-h-[90vh] sm:min-h-[60vh]"
    />
    <template #actions="{ close }">
      <div class="flex items-center justify-end w-full mx-4 my-3">
        <t-button pain @click="close">Закрыть</t-button>
      </div>
    </template>
  </t-modal>
</template>

<style scoped></style>
