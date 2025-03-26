<script setup lang="ts">
defineOptions({
  name: "TButton",
});
defineEmits(["click"]);
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    outline?: boolean;
    rounded?: boolean;
    pain?: boolean;
    icon?: string;
    active?: boolean;
  }>(),
  {
    size: "md",
    disabled: false,
    loading: false,
    outline: false,
    rounded: false,
    pain: false,
    active: false,
  },
);

const baseClass = computed(() => {
  if (props.outline) {
    return "icon-box border border-transparent text-slate-400 opacity-85";
  }

  if (props.pain) {
    return "icon-pain border border-transparent text-slate-400 opacity-85";
  }

  return "bg-purple-500 border-purple-500";
});

const iconSize = computed<string>(() => {
  if (props.size === "sm") {
    return "0.90rem";
  } else if (props.size === "lg") {
    return "2rem";
  } else {
    return "1.5rem";
  }
});

const btnSize = computed(() => {
  if (props.size === "sm") {
    return "px-3 py-1.5 text-sm";
  } else if (props.size === "lg") {
    return "px-5 py-3.5 text-lg";
  } else {
    return "px-4 py-2.5";
  }
});
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="props.disabled"
    :class="[
      {
        '!opacity-50': disabled,
        'cursor-not-allowed': disabled || loading,
        'hover:bg-purple-600 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/15 hover:duration-250':
          !disabled && !loading && !outline && !pain,
        'hover:text-white hover:opacity-100 hover:duration-250':
          !disabled && !loading && outline,
        'hover:text-white active:bg-purple-600/10 hover:opacity-100 hover:duration-150 ':
          !disabled && !loading && pain,
        '!rounded-full': rounded,
        '!p-2': rounded && icon,
        'bg-purple-600/40': active,
      },
      baseClass,
      btnSize,
    ]"
    class="select-none font-semibold text-center border text-white text-sm leading-none rounded-md transition-all ease-in-out duration-150"
    @click="$emit('click')"
  >
    <template v-if="loading">
      <svg
        class="animate-spin -ml-1 mr-3 h-3.5 w-3.5 text-white inline-block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Загрузка...
    </template>
    <template v-else-if="icon">
      <Icon :icon="icon" :size="iconSize" />
    </template>
    <slot v-else />
  </button>
</template>

<style scoped></style>
