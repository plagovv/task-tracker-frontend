<script setup lang="ts">
import useClickOutside from "~/composables/useClickOutside";
import type { UpdateTaskResponse } from "~/apiServices/TaskService";
import TTiptapEditor from "~/components/t-tiptap-editor.vue";

const props = defineProps<{
  loading: boolean;
  error: boolean;
  value: string;
}>();
const emit = defineEmits<{
  (e: "updateTask", data: UpdateTaskResponse): void;
  (e: "reset"): void;
}>();

const active = ref<boolean>(false);
const tempValue = ref<string>();
</script>

<template>
  <t-tiptapEditor />
</template>

<style scoped></style>
