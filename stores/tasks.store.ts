import { useAsync } from "~/composables/useAsync";
import type {
  TaskItem,
  CreateTaskResponse,
  UpdateTaskResponse,
} from "~/apiServices/TaskService";

export const useTasksStore = defineStore("tasks", () => {
  const { $services } = useNuxtApp();
  const tasks = ref<TaskItem[] | null>(null);

  const {
    data,
    execute: getTaskList,
    error,
    loading,
  } = useAsync($services.tasks.getAll, { context: $services.tasks });

  async function fetchTaskList() {
    await getTaskList();
    tasks.value = data.value;
  }

  /**
   * Создание задачи
   * @param task
   */
  function createTask(task: CreateTaskResponse) {
    // TODO: createTask
  }

  /**
   * Обновление задачи
   * @param taskId
   * @param task
   */
  function updateTask(taskId: string, task: UpdateTaskResponse) {
    // TODO: updateTask
  }

  /**
   * Удаление задачи
   * @param taskId
   */
  function deleteTask(taskId: string) {
    // TODO: deleteTask
  }

  return {
    fetchTaskList,
    createTask,
    updateTask,
    deleteTask,
    tasks,
    error,
    loading,
  };
});
