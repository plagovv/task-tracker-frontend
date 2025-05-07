<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useProjectsStore } from "~/stores/projects.store";

const projectsStore = useProjectsStore();
const { open: openCreateProjectModal, close: closeProjectModal } =
  useModal("createProjectModal");
defineExpose({ openCreateProjectModal });

const { values, defineField, resetForm, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
    }),
  ),
});
const [name, nameAttrs] = defineField("name");

function onOpenModal() {
  resetForm();
}

function onCloseModal() {
  resetForm();
}

function createProject() {
  handleSubmit(async (values) => {
    try {
      await projectsStore.createProject({
        ...values,
        color: "#fff",
        icon: "mdi-icon",
      });
    } finally {
      closeProjectModal();
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
    ref="createProjectModal"
    :close-outside="!haveValues"
    title="Создать проект"
    :loading="projectsStore.createProjectApiLoading"
    modal-class="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full"
    @close="onCloseModal"
    @open="onOpenModal"
  >
    <div class="mb-4">
      <t-input
        v-model="name"
        label="Наименование проекта"
        name="name"
        v-bind="nameAttrs"
      />
    </div>
    <template #actions="{ close, loading }">
      <div class="flex items-center justify-end w-full mx-4 my-3">
        <t-button pain :disabled="loading" @click="close">Отмена</t-button>
        <t-button :disabled="loading" @click="createProject">Создать</t-button>
      </div>
    </template>
  </t-modal>
</template>

<style scoped></style>
