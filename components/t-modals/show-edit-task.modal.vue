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
  <t-modal ref="taskShowEditModal" hide-title>
    <t-show-edit-task ref="taskShowEdit" :task-id="taskId" full-wide />
    <template #actions="{ close }">
      <div class="flex items-center justify-end w-full mx-4 my-3">
        <t-button pain @click="close">Закрыть</t-button>
      </div>
    </template>
  </t-modal>
</template>

<style scoped></style>
