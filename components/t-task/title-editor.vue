<script setup lang="ts">
import useClickOutside from "~/composables/useClickOutside";
import type { UpdateTaskResponse } from "~/apiServices/TaskService";

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

const titleEditorRef = useTemplateRef("titleEditor");
const titleEditorInputRef = useTemplateRef("titleEditorInput");
useClickOutside(() => {
  if (props.value !== tempValue.value && !props.error) {
    save();
  } else {
    active.value = false;
  }
}, [titleEditorRef]);

onMounted(() => {
  tempValue.value = props.value;
});

const activate = () => {
  if (active.value) return;
  active.value = true;
  nextTick(() => {
    titleEditorInputRef.value?.focus();
  });
};

const deactivate = (escBtnPressed = false) => {
  if (escBtnPressed && props.error) {
    emit("reset");
  }
  if (props.loading) return;
  active.value = false;
  tempValue.value = props.value;
};

const save = () => {
  if (props.loading) return;
  else if (tempValue.value?.trim() === props.value) {
    deactivate();
  } else emit("updateTask", { title: tempValue.value });
};

watch(
  () => props.loading,
  (newValue) => {
    if (!newValue && !props.error) {
      active.value = false;
    }
  },
);
</script>

<template>
  <h1
    ref="titleEditor"
    class="text-xl font-semibold leading-tight border border-transparent rounded-lg p-1 relative group overflow-hidden"
    :class="{
      'cursor-pointer': !active,
      'hover:border-slate-600': !active && !props.error,
      'border-purple-600/75': active,
      'border-red-600/75': error,
    }"
    @click="activate"
  >
    <template v-if="!active">
      {{ tempValue }}
    </template>
    <input
      v-else
      ref="titleEditorInput"
      v-model="tempValue"
      class="bg-transparent w-full"
      :readonly="props.loading"
      @keydown.esc="deactivate(true)"
      @keydown.enter="save"
    />
    <span
      class="absolute px-1 right-0 top-0 h-full bg-slate-600 flex items-center opacity-0 group-hover:opacity-100"
      :class="{ hidden: props.error || active || props.loading }"
    >
      <Icon icon="mdi:edit" size="18" class="" />
    </span>
    <span
      class="absolute px-1 right-0 top-0 h-full flex items-center"
      :class="{ hidden: !props.error }"
    >
      <Icon icon="mdi:error-outline" size="18" class="text-red-600" />
    </span>
    <span
      class="absolute px-1 right-0 top-0 h-full flex items-center"
      :class="{ hidden: !props.loading }"
    >
      <t-progress :width="15" :height="15" :stroke-width="7" />
    </span>
  </h1>
</template>

<style scoped></style>
