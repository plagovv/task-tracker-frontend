<script setup lang="ts">
import type { VariantType } from "~/types/components/colorVariants";
import type {
  TaskStatus,
  StatusBasicType,
} from "~/types/api/statusFactory.interface";

const { status } = defineProps<{
  status: TaskStatus;
}>();

const basicTypeBadgeType: Record<StatusBasicType, VariantType> = {
  todo: "default",
  process: "info",
  done: "success",
};

const badgeType = computed(() => basicTypeBadgeType[status.type]);
</script>

<template>
  <t-badge :type="badgeType">{{ status.name }}</t-badge>
</template>

<style scoped></style>
