import { useGetTaskList } from "~/composables/api/useGetTaskList.api";
import type {
  Task,
  TaskItem,
  UpdateTaskResponse,
} from "~/types/api/tasksFactory.interface";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<TaskItem[] | null>(null);

  const { data, getTaskList, error, loading } = useGetTaskList();

  async function fetchTaskList() {
    await getTaskList();
    tasks.value = data.value;
  }

  /**
   * Создание задачи
   * @param task
   */
  function createTask(task: Task) {
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
