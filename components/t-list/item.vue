<script setup lang="ts">
const slots = useSlots();
const attrs = useAttrs();

const isClickable = computed(() => typeof attrs.onClick === "function");
</script>

<template>
  <div
    class="px-4 py-2 flex"
    :class="{ 'cursor-pointer hover:bg-slate-400/10': isClickable }"
  >
    <div v-if="slots.pre" class="flex-none mr-2">
      <slot name="pre" />
    </div>
    <div class="grow">
      <slot />
    </div>
    <div v-if="slots.actions" class="flex-none w-14">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped></style>
