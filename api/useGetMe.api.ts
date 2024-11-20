import { ref } from "vue";
import { type NuxtApp, useNuxtApp } from "#app";
import type { ErrorRequest, RequestError } from "~/api/types/error.interface";
import { AxiosError as AxiosErrorFromImport } from "axios";
import type { GetMeRequest } from "~/api/types/getMe.interface";

export const useGetMeApi = () => {
  const nuxtApp: NuxtApp = useNuxtApp();
  const data = ref<GetMeRequest | null>(null);
  const error = ref<RequestError | null>(null);
  const loading = ref<boolean>(false);

  const getMe = async () => {
    loading.value = true;
    try {
      const response = await nuxtApp.$axios.get<GetMeRequest>("/auth/me");
      data.value = response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosErrorFromImport) {
        const e: AxiosErrorFromImport<ErrorRequest, unknown> = err;
        error.value = {
          message: e.response?.data?.message || "Failed get user info",
          code: e.response?.status || 0,
        };
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    getMe,
  };
};
