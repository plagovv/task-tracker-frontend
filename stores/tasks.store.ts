import { useAsync } from "~/composables/useAsync";
import type {
  TaskItem,
  CreateTaskResponse,
  UpdateTaskResponse,
} from "~/apiServices/TaskService";

export const useTasksStore = defineStore("tasks", () => {
  const { $services } = useNuxtApp();
  const mainState = useMainStore();
  const tasks = ref<TaskItem[] | null>(null);

  const {
    data: getTaskListData,
    error: getTaskListError,
    loading: getTaskListLoading,
    execute: getTaskList,
  } = useAsync($services.tasks.getAll, {
    context: $services.tasks,
  });

  const {
    data: createTaskApiData,
    execute: createTaskApi,
    error: createTaskApiError,
    loading: createTaskApiLoading,
  } = useAsync($services.tasks.createTask, { context: $services.tasks });

  async function fetchTaskList() {
    try {
      mainState.syncLoader = true;
      await getTaskList();
      tasks.value = getTaskListData.value;
    } finally {
      mainState.syncLoader = false;
    }
  }

  /**
   * Создание задачи
   * @param task
   */
  async function createTask(task: CreateTaskResponse) {
    try {
      await createTaskApi(task);
      fetchTaskList();
    } catch {
      // TODO: Notif error
      console.log(createTaskApiError);
    }
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
    getTaskListError,
    getTaskListLoading,
    createTaskApiLoading,
  };
});
