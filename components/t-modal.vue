<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    closeOutside?: boolean;
    hideTitle?: boolean;
    title?: string;
    loading?: boolean;
  }>(),
  {
    closeOutside: false,
    hideTitle: false,
    title: "Модальное окно",
    loading: false,
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
  <transition name="fade">
    <div
      v-if="isShow"
      class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
    >
      <div
        class="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/50 transition-opacity"
        @click="props.closeOutside ? close() : () => 0"
      ></div>
      <t-card class="modal-body z-10 w-1/3 max-h-[80%] overflow-auto relative">
        <t-line-progress
          v-if="loading"
          indeterminate
          class="absolute left-0 right-0"
        />
        <div class="divide-y divide-slate-700">
          <div v-if="!hideTitle" class="mx-4 my-3 divide-y divide-slate-700">
            <slot v-if="typeof slots?.title === 'function'" name="title" />
            <span v-else class="font-bold text-xl"> {{ props.title }} </span>
          </div>
          <div class="px-4 py-3 relative">
            <div
              v-if="loading"
              class="absolute left-0 right-0 bottom-0 top-0 z-10"
            ></div>
            <slot />
          </div>
          <div class="flex items-center">
            <slot
              v-if="slots?.actions"
              name="actions"
              :close="close"
              :loading="loading"
            />
            <div v-else class="flex items-center justify-end w-full mx-4 my-3">
              <t-button :disabled="loading" @click="close">Закрыть</t-button>
              <t-button pain :disabled="loading" @click="close"
                >Отмена</t-button
              >
            </div>
          </div>
        </div>
      </t-card>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-enter-active .modal-body {
  transition: 0.3s all ease-in-out;
}

.fade-leave-active,
.fade-leave-active .modal-body {
  transition: 0.2s all ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.fade-enter-from .modal-body {
  filter: blur(2px);
}

.fade-enter-to .modal-body {
  filter: blur(0px);
}
</style>
