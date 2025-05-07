<script setup lang="ts">
import { ADD_PROJECT_MODAL_KEY } from "~/components/t-modals/modal-keys";

const props = withDefaults(defineProps<{ minimise?: boolean }>(), {
  minimise: false,
});
const addProjectModalOpenInjected = inject<() => void>(ADD_PROJECT_MODAL_KEY);
</script>

<template>
  <div class="p-2">
    <t-card
      class="flex items-center p-2 hover:bg-slate-800/20 cursor-pointer m-1 group text-sm"
      :class="{
        'flex-col !text-min-side leading-[0.8rem] text-center': minimise,
      }"
      @click="addProjectModalOpenInjected"
    >
      <t-button
        outline
        rounded
        icon="material-symbols:add-rounded"
        class="group-hover:opacity-100"
        size="sm"
        :class="{ 'mr-2': !minimise, 'mx-auto mb-2': minimise }"
      />
      Добавить проект
    </t-card>
  </div>
</template>

<style scoped></style>
