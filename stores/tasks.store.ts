import { useGetTaskList } from "~/api/useGetTaskList.api";
import type { Task } from "~/api/types/tasksFactory.interface";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[] | null>(null);

  const { data, getTaskList, error, loading } = useGetTaskList();

  async function fetchTaskList() {
    await getTaskList();
    tasks.value = data.value;
  }
  function updateTask(task: Task) {
    // TODO: updateTask
  }

  return {
    fetchTaskList,
    updateTask,
    tasks,
    error,
    loading,
  };
});
