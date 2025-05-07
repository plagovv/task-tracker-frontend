<script setup lang="ts">
const props = withDefaults(
  defineProps<{ minimise: boolean; hide: boolean }>(),
  { minimise: false, hide: false },
);
</script>

<template>
  <div
    class="fixed left-0 bottom-0 max-w-52 overflow-auto"
    :class="{
      'w-full': !props.minimise && !props.hide,
      'w-20': props.minimise && !props.hide,
      'w-0 overflow-hidden': props.hide,
    }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
