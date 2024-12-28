<script setup lang="ts">
const priorityItemsData = [
  {
    label: "Низкий",
    value: 0,
  },
  {
    label: "Средний",
    value: 1,
  },
  {
    label: "Высокий",
    value: 2,
  },
  {
    label: "Высочайший",
    value: 3,
  },
];
const model = defineModel<unknown>({ default: 1 });
</script>

<template>
  <t-select
    v-model="model"
    label="Приоритет"
    name="priority"
    :items="priorityItemsData"
  >
    <template #item="{ item }">
      <div class="flex items-center">
        <t-task-priority-plate :value="Number(item?.value || 0)" class="mr-2" />
        {{ item.label }}
      </div>
    </template>
  </t-select>
</template>

<style scoped></style>
