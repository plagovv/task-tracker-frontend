<script setup lang="ts">
import type {
  ColorVariants,
  VariantType,
} from "~/types/components/colorVariants";

const textColorVariants: ColorVariants = {
  success:
    "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-400/10 dark:ring-green-600/10",
  warning:
    "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-400/10 dark:ring-yellow-600/10",
  danger:
    "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 dark:ring-red-600/10",
  info: "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-400/10 dark:ring-purple-700/10",
  default:
    "text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-400/10 dark:ring-gray-500/10",
};

const textColorClasses = computed(
  () => textColorVariants[props.type] || textColorVariants.default,
);

const props = withDefaults(defineProps<{ type?: VariantType }>(), {
  type: "default",
});
</script>

<template>
  <span
    class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
    :class="[textColorClasses]"
  >
    <slot />
  </span>
</template>

<style scoped></style>
