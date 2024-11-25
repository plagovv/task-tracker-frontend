<script setup lang="ts">
import type {
  ColorVariants,
  VariantType,
} from "~/types/components/colorVariants";

const iconColorVariants: ColorVariants = {
  success: "text-green-400",
  warning: "text-yellow-400",
  danger: "text-red-400",
  info: "text-purple-400",
  default: "",
};
const textColorVariants: ColorVariants = {
  success: "text-green-500",
  warning: "text-yellow-500",
  danger: "text-red-500",
  info: "text-purple-500",
  default: "",
};
const bgColorVariants: ColorVariants = {
  success: "before:from-green-500/45",
  warning: "before:from-yellow-500/45",
  danger: "before:from-red-500/45",
  info: "before:from-purple-500/45",
  default: "before:from-slate-800/30",
};
const iconVariants: ColorVariants = {
  success: "material-symbols:check-circle-rounded",
  warning: "material-symbols:error-rounded",
  danger: "material-symbols:cancel-rounded",
  info: "material-symbols:info-rounded",
  default: "material-symbols:info-outline-rounded",
};

const props = withDefaults(
  defineProps<{ type?: VariantType; title?: string; text: string }>(),
  {
    title: "Внимание!",
    type: "default",
  },
);

const textColorClasses = computed(
  () => textColorVariants[props.type] || textColorVariants.default,
);
const bgColorClasses = computed(
  () => bgColorVariants[props.type] || bgColorVariants.default,
);
const iconName = computed(
  () => iconVariants[props.type] || iconVariants.default,
);
const iconColorClasses = computed(
  () => iconColorVariants[props.type] || iconVariants.default,
);
</script>

<template>
  <div
    class="relative flex items-center pr-4 py-2 justify-center border rounded-2xl border-transparent before before:absolute before:inset-0 before:rounded-2xl shadow-2xl icon-box before:bg-gradient-to-r before:to-40% before:to-slate-800/30"
    :class="[bgColorClasses]"
  >
    <div class="basis-1/6 text-center" :class="[iconColorClasses]">
      <Icon :icon="iconName" size="24px" />
    </div>
    <div class="basis-5/6">
      <h3 class="font-semibold" :class="[textColorClasses]">
        {{ props.title }}
      </h3>
      <p v-if="props?.text" class="text-sm">{{ props.text }}</p>
    </div>
  </div>
</template>

<style scoped></style>
