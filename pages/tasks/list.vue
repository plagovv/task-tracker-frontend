<script setup lang="ts">
definePageMeta({
  title: "Задачи - Список",
  layout: "default",
  middleware: ["auth-protect"],
});

const tasks = reactive([
  { id: 1, title: "Задача 1" },
  { id: 2, title: "Задача 2" },
  { id: 3, title: "Задача 3" },
  { id: 4, title: "Задача 4" },
]);
</script>

<template>
  <div class="w-full mt-20">
    <t-card class="flex items-center p-2 hover:bg-slate-800/20">
      <t-avatar icon="material-symbols:add-rounded" rounded class="mr-2" />
      Добавить задачу
    </t-card>

    <t-list title="Задачи &#183; 4">
      <t-card v-for="{ title, id } in tasks" :key="id" class="mb-3">
        <t-list-item>
          {{ title }}
          <template #pre>
            <t-button pain icon="material-symbols:check-box-outline-blank" />
          </template>
        </t-list-item>
      </t-card>
    </t-list>
    <t-list title="Завершенные &#183; 4" class="mt-10">
      <t-card v-for="{ title, id } in tasks" :key="id + 'comp'" class="mb-3">
        <t-list-item>
          {{ title }}
          <template #pre>
            <t-button pain icon="material-symbols:check-box-outline-blank" />
          </template>
        </t-list-item>
      </t-card>
    </t-list>
  </div>
</template>

<style scoped></style>
