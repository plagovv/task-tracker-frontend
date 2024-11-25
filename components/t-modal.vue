<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    closeOutside?: boolean;
    hideTitle?: boolean;
    title?: string;
  }>(),
  {
    closeOutside: true,
    hideTitle: false,
    title: "Модальное окно",
  },
);

const emit = defineEmits<{
  (e: "close"): void;
  (e: "open", show: boolean): void;
}>();

const slots = useSlots();

const isShow = ref<boolean>(false);

function open(): void {
  isShow.value = true;
  emit("open", isShow.value);
}

function close(): void {
  isShow.value = false;
  emit("open", isShow.value);
  emit("close");
}

defineExpose({
  open,
  close,
});
</script>

<template>
  <div
    v-show="isShow"
    class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
  >
    <div
      class="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/50 transition-opacity"
      @click="props.closeOutside ? close : () => 0"
    ></div>
    <t-card class="relative w-1/3">
      <div class="divide-y divide-slate-700">
        <div v-if="!hideTitle" class="mx-4 my-3 divide-y divide-slate-700">
          <slot v-if="typeof slots?.title === 'function'" name="title" />
          <span v-else class="font-bold text-xl"> {{ props.title }} </span>
        </div>
        <div class="px-4 py-3">
          <slot />
        </div>
        <div class="flex items-center">
          <slot v-if="slots?.actions" name="actions" />
          <div v-else class="flex items-center justify-end w-full mx-4 my-3">
            <t-button @click="close">Закрыть</t-button>
            <t-button pain @click="close">Отмена</t-button>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>

<style scoped></style>
