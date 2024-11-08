<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    rounded?: boolean;
    size?: "sm" | "md" | "lg" | number;
  }>(),
  {
    src: undefined,
    alt: "Avatar",
    size: "md",
    rounded: false,
  },
);

const imageReady = ref<boolean>(false);

const getIconSize = () => {
  if (typeof props.size === "number") {
    return `${props.size}px`;
  }

  let size = 1.5;

  if (props.size === "sm") {
    size = 1;
  }

  if (props.size === "lg") {
    size = 2;
  }

  return `${size}rem`;
};

const setReady = (value: boolean) => {
  imageReady.value = value;
};
</script>

<template>
  <div
    style=""
    class="icon-box border border-transparent text-slate-400 p-2 flex-none items-center justify-center leading-none rounded-md relative overflow-clip"
    :class="{ '!rounded-full': rounded }"
  >
    <client-only>
      <img
        v-if="props.src"
        v-show="imageReady"
        :src="props.src"
        class="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none"
        alt=""
        @load="setReady(true)"
        @error="setReady(false)"
      />
    </client-only>
    <Icon
      icon="material-symbols:account-circle-outline"
      :size="getIconSize()"
    />
  </div>
</template>

<style scoped></style>
