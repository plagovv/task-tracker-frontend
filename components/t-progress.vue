<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number | string;
    width?: number | string;
    height?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }>(),
  {
    size: 25,
    width: 25,
    height: 25,
    strokeWidth: 4,
    color: "#a855f7",
  },
);

const computedWith = computed(() => {
  if (props.size) {
    return props.size;
  } else {
    return props.width;
  }
});

const computedHeigth = computed(() => {
  if (props.size) {
    return props.size;
  } else {
    return props.height;
  }
});
</script>

<template>
  <svg
    class="spinner"
    :width="computedWith + 'px'"
    :height="computedHeigth + 'px'"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      :stroke="props.color"
      fill="none"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
    ></circle>
  </svg>
</template>

<style scoped lang="scss">
$offset: 187;
$duration: 1.6s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: calc($offset / 4);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
