<script setup lang="ts">
type AlertType = "success" | "info" | "warning" | "danger" | "default";

const textColorVariants: Record<string, string> = {
  success: "text-green-500",
  warning: "text-yellow-500",
  danger: "text-red-500",
  info: "text-purple-500",
  default: "",
};
const bgColorVariants: Record<string, string> = {
  success: "before:from-green-500/45",
  warning: "before:from-yellow-500/45",
  danger: "before:from-red-500/45",
  info: "before:from-purple-500/45",
  default: "before:from-slate-800/30",
};
const iconVariants: Record<string, string> = {
  success: "material-symbols:check-circle-rounded",
  warning: "material-symbols:error-rounded",
  danger: "material-symbols:cancel-rounded",
  info: "material-symbols:info-rounded",
  default: "material-symbols:info-outline-rounded",
};

const props = withDefaults(
  defineProps<{ type?: AlertType; title?: string; text: string }>(),
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
</script>

<template>
  <div
    class="relative flex items-center px-4 py-2 justify-center border rounded-2xl border-transparent before before:absolute before:inset-0 before:rounded-2xl shadow-2xl icon-box before:bg-gradient-to-r before:to-40% before:to-slate-800/30"
    :class="[bgColorClasses]"
  >
    <Icon :icon="iconName" />
    <div class="w-full">
      <h3 class="font-semibold" :class="[textColorClasses]">
        {{ props.title }}
      </h3>
      <p v-if="props?.text" class="text-sm">{{ props.text }}</p>
    </div>
  </div>
</template>

<style scoped></style>
