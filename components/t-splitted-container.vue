<script setup lang="ts">
import useResize from "~/composables/useResize";

const props = withDefaults(
  defineProps<{
    leftMinPercent?: number | string;
    rightMinPercent?: number | string;
    leftDefaultPercent?: number | string;
    rightDefaultPercent?: number | string;
    saveTag?: string;
  }>(),
  {
    leftMinPercent: 10,
    rightMinPercent: 10,
    leftDefaultPercent: 50,
    rightDefaultPercent: 50,
    saveTag: "",
  },
);

const active = ref<boolean>(false);
const containerRef = useTemplateRef("target");
const clientRect = ref<null | DOMRect>(null);
const leftWidth = ref<number | null>(null);
const rightWidth = ref<number | null>(null);

function protectPercentValue(value: number) {
  if (value > 90) return 90;
  else if (value < 10) return 10;
  else return value;
}

function getPercentageRatio(value: number, fullValue: number) {
  return (value / fullValue) * 100;
}

async function getLocalValues(
  tag: string,
): Promise<{ left: number; right: number } | null> {
  try {
    const localData = localStorage.getItem(tag);
    if (localData) {
      return await JSON.parse(localData);
    }
    return null;
  } catch {
    return null;
  }
}

async function initLocalValues() {
  const localStoreData = await getLocalValues(props.saveTag);
  if (localStoreData !== null) {
    const { left, right } = localStoreData;
    leftWidth.value = left;
    rightWidth.value = right;
  }
}

function saveLocalValues() {
  localStorage.setItem(
    props.saveTag,
    JSON.stringify({ left: leftWidth.value, right: rightWidth.value }),
  );
}
function setBoundingClientRect() {
  const rect = containerRef.value?.getBoundingClientRect();
  if (rect) {
    clientRect.value = rect;
  }
}

function mousemove(e: MouseEvent) {
  if (active.value && clientRect.value) {
    leftWidth.value = getPercentageRatio(
      e.clientX - clientRect.value.x,
      clientRect.value.width,
    );
    rightWidth.value = 100 - leftWidth.value;
  }
}

const leftMinPerc = computed(() =>
  protectPercentValue(Number(props.leftMinPercent)),
);
const rightMinPerc = computed(() =>
  protectPercentValue(Number(props.rightMinPercent)),
);

const leftRightRatio = computed(() => {
  const right = protectPercentValue(Number(props.rightDefaultPercent));
  const left = protectPercentValue(Number(props.leftDefaultPercent));
  const leftRight = left + right;
  if (
    (props.rightDefaultPercent !== 50 || props.leftDefaultPercent !== 50) &&
    (leftRight > 100 || leftRight < 100)
  ) {
    return {
      left: getPercentageRatio(left, leftRight),
      right: getPercentageRatio(right, leftRight),
    };
  }
  return { left: props.leftDefaultPercent, right: props.rightDefaultPercent };
});

onMounted(() => {
  if (props.saveTag) {
    initLocalValues();
  }
  setBoundingClientRect();
});

useResize(setBoundingClientRect);

onBeforeUnmount(() => {
  if (props.saveTag) {
    saveLocalValues();
  }
});
</script>

<template>
  <div
    ref="target"
    v-touch:drag="mousemove"
    class="flex align-center w-full relative"
    :class="{ 'select-none': active }"
  >
    <div
      class="left"
      :style="{
        width: `${leftWidth ? leftWidth : leftRightRatio.left}% !important`,
        minWidth: `${leftMinPerc}%`,
        maxWidth: `${100 - rightMinPerc}%`,
      }"
    >
      <slot name="left" />
    </div>
    <div
      v-touch:press="() => (active = true)"
      v-touch:release="() => (active = false)"
      class="relative resize-before mx-2 bg-slate-200/20 hover:bg-purple-600 w-[1px] min-h-full transition-all ease-in-out duration-150 cursor-ew-resize after:block after:min-h-full after:-translate-x-[5px] after:border-green-400 after:w-3"
      :class="{ '!bg-purple-600': active }"
    ></div>
    <div
      class="right"
      :style="{
        width: `${rightWidth ? rightWidth : leftRightRatio.right}% !important`,
        minWidth: `${rightMinPerc}%`,
        maxWidth: `${100 - leftMinPerc}%`,
      }"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.resize-before::before {
  @apply bg-slate-200/20;
  position: absolute;
  top: calc(50% - 0.5rem);
  left: -0.2rem;
  content: "";
  width: 1rem;
  height: 1rem;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2'/%3E%3C/svg%3E");
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
