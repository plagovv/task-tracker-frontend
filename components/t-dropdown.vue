<script setup lang="ts">
import useClickOutside from "~/composables/useClickOutside";
const props = withDefaults(
  defineProps<{
    hideOnClick?: boolean;
  }>(),
  { hideOnClick: false },
);
const show = ref<boolean>(false);

const triggerElement = useTemplateRef("trigger");
const contentElement = useTemplateRef("content");

function getExcludeComponents(hideOnClick: boolean) {
  if (hideOnClick) return [triggerElement, contentElement];
  else return [triggerElement];
}

const reinitClickOutside = useClickOutside(() => {
  show.value = false;
}, getExcludeComponents(props.hideOnClick));

watch(
  () => props.hideOnClick,
  () => reinitClickOutside(getExcludeComponents(props.hideOnClick)),
);
</script>

<template>
  <div class="relative">
    <div ref="trigger" class="cursor-pointer" @click="show = !show">
      <slot />
    </div>
    <div
      v-if="show"
      ref="content"
      class="absolute right-0 z-10 mt-2 w-max max-w-96 origin-top-right focus:outline-none"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped></style>
