import type { NuxtApp } from "#app";
import { useNuxtApp } from "#app";
import { ref } from "vue";
import type { ErrorRequest, RequestError } from "~/types/api/error.interface";
import type { TaskItem } from "~/types/api/tasksFactory.interface";
import { AxiosError as AxiosErrorFromImport } from "axios";

export const useGetTaskList = () => {
  const nuxtApp: NuxtApp = useNuxtApp();
  const data = ref<TaskItem[] | null>(null);
  const error = ref<RequestError | null>(null);
  const loading = ref<boolean>(false);

  async function getTaskList() {
    loading.value = true;
    try {
      const response = await nuxtApp.$axios.get<TaskItem[]>("/tasks");
      data.value = response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosErrorFromImport) {
        const e: AxiosErrorFromImport<ErrorRequest, unknown> = err;
        error.value = {
          message: e.response?.data?.message || "Failed get tasks list",
          code: e.response?.status || 0,
        };
        data.value = null;
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    error,
    loading,
    getTaskList,
  };
};
