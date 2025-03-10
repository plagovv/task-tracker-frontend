<script setup lang="ts">
const mainState = useMainStore();
</script>

<template>
  <div class="absolute bottom-0 right-10 overflow-hidden">
    <transition name="syncFade">
      <div
        v-if="mainState.syncLoader"
        class="w-60 flex items-center justify-center rounded-t-md border border-b-0 border-gray-100/10 px-5 py-3 backdrop-blur-sm"
      >
        <t-loader class="mr-2" />
        <span>Синхронизация...</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.syncFade-enter-active,
.syncFade-leave-active {
  transition: all 0.4s;
}
.syncFade-enter-from,
.syncFade-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(55px);
}
</style>
