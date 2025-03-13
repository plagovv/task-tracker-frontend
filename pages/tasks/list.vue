<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks.store";
import {
  ADD_MODAL_KEY,
  SHOW_TASK_MODAL_KEY,
} from "~/components/t-modals/modal-keys";

definePageMeta({
  title: "Задачи - Список",
  layout: "default",
  middleware: ["auth-protect"],
});

const addModalOpenInjected = inject<() => void>(ADD_MODAL_KEY);
const showTaskModalOpenInjected =
  inject<(id: string) => void>(SHOW_TASK_MODAL_KEY);

const tasksStore = useTasksStore();
</script>

<template>
  <div class="w-full mt-20">
    <div></div>
    <t-card
      class="flex items-center p-2 hover:bg-slate-800/20 cursor-pointer"
      @click="addModalOpenInjected"
    >
      <t-button
        outline
        rounded
        icon="material-symbols:add-rounded"
        class="mr-2"
      />
      Добавить задачу
    </t-card>

    <t-list
      :title="`Задачи &#183; ${tasksStore.tasks?.length || 0}`"
      class="mt-10"
    >
      <t-task-list-card
        v-for="task in tasksStore.tasks"
        :key="task._id"
        :task="task"
        class="mb-3"
        @click="
          showTaskModalOpenInjected
            ? showTaskModalOpenInjected(task._id)
            : () => 0
        "
      />
    </t-list>
  </div>
</template>

<style scoped></style>
