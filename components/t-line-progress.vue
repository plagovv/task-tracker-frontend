<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    indeterminate?: boolean;
    value?: number;
    disabled?: boolean;
    min?: number;
    max?: number;
  }>(),
  {
    indeterminate: false,
    value: 0,
    disabled: false,
    min: 0,
    max: 100,
  },
);

const protectedValue = computed(() => {
  if (props.value >= props.min && props.value <= props.max) {
    return props.value;
  }
  if (props.value < props.min) return props.min;
  if (props.value > props.max) return props.max;
});
</script>

<template>
  <div class="progress-bar">
    <div class="w-full h-1 bg-slate-700 rounded-full overflow-hidden relative">
      <div
        class="value transition-all ease-in-out h-full bg-purple-600"
        :class="{ indeterminate: indeterminate }"
        :style="{ width: protectedValue + '%' }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.indeterminate {
  width: 0 !important;
  &:before {
    content: "";
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
    border-radius: calc(infinity * 1px);
  }

  &:after {
    content: "";
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
    animation-delay: 1.15s;
    border-radius: calc(infinity * 1px);
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
</style>
