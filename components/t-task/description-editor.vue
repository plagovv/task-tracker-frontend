<script setup lang="ts">
import type { UpdateTaskResponse } from "~/apiServices/TaskService";

const props = defineProps<{
  loading: boolean;
  error: boolean;
  value: string;
  updateHeight: () => void;
}>();

const emits = defineEmits<{
  (e: "updateTask", data: UpdateTaskResponse): void;
  (e: "reset"): void;
}>();

const active = ref<boolean>(false);

const save = (description?: string) => {
  if (description?.trim() === props.value) {
    cancel();
  } else if (description) emits("updateTask", { description });
};

const cancel = () => {
  active.value = false;
  emits("reset");
};

watch(
  () => props.loading,
  (loading) => {
    if (!loading && !props.error) {
      active.value = false;
    }
  },
);
</script>

<template>
  <t-tiptap-editor
    :value="props.value"
    :active="active"
    :loading="loading"
    :error="error"
    @dblclick="active = true"
    @cancel="cancel"
    @save="save"
    @update-height="updateHeight"
  />
</template>

<style scoped></style>
