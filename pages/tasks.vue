<script setup lang="ts">
definePageMeta({
  title: "Задачи",
  layout: "default",
  middleware: ["auth-protect"],
});
const route = useRoute();
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl font-bold">{{ route.meta.title }}</h1>

      <t-dropdown hide-on-click>
        <t-button pain rounded icon="material-symbols:more-horiz"></t-button>
        <template #content>
          <t-card class="w-72">
            <t-list>
              <t-list-item :to="{ name: 'tasks' }">
                <template #pre>
                  <icon name="material-symbols:view-kanban" />
                </template>
                Канбан
                <template #actions="data">
                  <icon
                    v-if="data?.isExactActive"
                    name="material-symbols:check"
                  />
                </template>
              </t-list-item>
              <t-list-item :to="{ name: 'tasks-list' }">
                <template #pre>
                  <icon name="material-symbols:view-list-rounded" />
                </template>
                Список
                <template #actions="data">
                  <icon
                    v-if="data?.isExactActive"
                    name="material-symbols:check"
                  />
                </template>
              </t-list-item>
            </t-list>
          </t-card>
        </template>
      </t-dropdown>
    </div>
    <NuxtPage />
  </div>
</template>
<style scoped></style>
