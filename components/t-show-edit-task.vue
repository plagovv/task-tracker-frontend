<script setup lang="ts">
import { useAsync } from "~/composables/useAsync";
import type { TaskItem, UpdateTaskResponse } from "~/apiServices/TaskService";
const { $services } = useNuxtApp();
const props = withDefaults(
  defineProps<{ taskId?: string; fillWide?: boolean }>(),
  {
    fillWide: false,
    taskId: undefined,
  },
);

const {
  data: getTaskData,
  execute: getTask,
  error: getTaskError,
  loading: getTaskLoading,
  abort: getTaskAbort,
} = useAsync($services.tasks.getTaskById, {
  context: $services.tasks,
  abortable: true,
});

const {
  data: saveTaskData,
  execute: saveTask,
  error: saveTaskError,
  loading: saveTaskLoading,
  reset: saveTaskReset,
} = useAsync($services.tasks.updateTaskById, {
  context: $services.tasks,
});

const started = ref<boolean>(false);

onMounted(() => {
  loadTask();
});
onUnmounted(() => {
  unloadTask();
});

const loadTask = () => {
  console.log(`~{t-show-edit-task.vue} Loading (${props.taskId}) task...`);
  if (props?.taskId) {
    started.value = true;
    getTask(props.taskId);
  }
};

const unloadTask = () => {
  console.log(`~{t-show-edit-task.vue} Unload task...`);
  started.value = false;
  getTaskAbort();
};

const updateTask = async (data: UpdateTaskResponse) => {
  try {
    if (props?.taskId) {
      await saveTask(props.taskId, data);
      if (Object.keys(data).length === 1) {
        getTaskData.value = {
          ...getTaskData.value,
          ...data,
        } as TaskItem;
      }
    } else {
      throw new Error("~{t-show-edit-task.vue} taskId must be provided");
    }
  } catch {
    console.log("~{t-show-edit-task.vue} Error updating task...");
  }
  console.log(`~{t-show-edit-task.vue} Update task...`, data);
};

defineExpose({ loadTask });
</script>

<template>
  <t-loading-container v-if="started" :loading="getTaskLoading">
    <t-container>
      <t-splitted-container>
        <template v-if="getTaskData && !getTaskError" #left>
          <t-task-title-editor
            :value="getTaskData.title"
            :loading="saveTaskLoading"
            :error="!!saveTaskError"
            @update-task="updateTask"
            @reset="saveTaskReset"
          />
          <t-dropdown-container title="Описание">
            <t-task-description-editor
              v-model="getTaskData.description"
              :loading="saveTaskLoading"
              :error="!!saveTaskError"
              @update-task="updateTask"
              @reset="saveTaskReset"
            />
          </t-dropdown-container>
        </template>
        <!-- TODO: CREATE LOADING SKELETONS && ERROR -->
        <template #right>
          <t-dropdown-container title="Основные поля" bordered>
            <div>придумать</div>
          </t-dropdown-container>
          <t-dropdown-container title="Дополнительные поля" bordered>
            <div>Здесь пока нет полей (в разработке)</div>
          </t-dropdown-container>
        </template>
      </t-splitted-container>
    </t-container>
  </t-loading-container>
</template>

<style scoped></style>
