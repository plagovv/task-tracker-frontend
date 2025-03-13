<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, string, number } from "yup";
import { toTypedSchema } from "@vee-validate/yup";

const tasksStore = useTasksStore();
const { open: openCreateModal, close: closeCreateModal } =
  useModal("tasksModal");
defineExpose({ openCreateModal });

const { values, defineField, resetForm, handleSubmit } = useForm({
  initialValues: {
    priority: 1,
  },
  validationSchema: toTypedSchema(
    object({
      title: string().required(),
      description: string(),
      priority: number().default(1),
    }),
  ),
});
const [title, emailAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
const [priority, priorityAttrs] = defineField("priority");

function onOpenModal() {
  resetForm();
}

function onCloseModal() {
  resetForm();
}

function createTask() {
  handleSubmit(async (values) => {
    try {
      await tasksStore.createTask(values);
    } finally {
      closeCreateModal();
    }
  })();
}

const haveValues = computed(() =>
  Object.entries(values).some(([, v]) => {
    return typeof v === "number" ? false : !!v;
  }),
);
</script>

<template>
  <t-modal
    ref="tasksModal"
    :close-outside="!haveValues"
    title="Создать задачу"
    :loading="tasksStore.createTaskApiLoading"
    @close="onCloseModal"
    @open="onOpenModal"
  >
    <div class="mb-4">
      <t-input v-model="title" label="Титул" name="title" v-bind="emailAttrs" />
      <t-input
        v-model="description"
        label="Описание"
        name="description"
        text-area
        v-bind="descriptionAttrs"
      />
      <t-select-priority v-model="priority" v-bind="priorityAttrs" />
    </div>
    <template #actions="{ close, loading }">
      <div class="flex items-center justify-end w-full mx-4 my-3">
        <t-button pain :disabled="loading" @click="close">Отмена</t-button>
        <t-button :disabled="loading" @click="createTask">Создать</t-button>
      </div>
    </template>
  </t-modal>
</template>

<style scoped></style>
