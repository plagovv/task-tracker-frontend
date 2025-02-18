import { ref } from "vue";
import { type NuxtApp, useNuxtApp } from "#app";
import type {
  SignInRequest,
  SignInResponse,
} from "~/types/api/signIn.interface";
import type { ErrorRequest, RequestError } from "~/types/api/error.interface";
import { AxiosError as AxiosErrorFromImport } from "axios";

export const useSighIn = () => {
  const nuxtApp: NuxtApp = useNuxtApp();
  const data = ref<SignInRequest | null>(null);
  const error = ref<RequestError | null>(null);
  const loading = ref<boolean>(false);

  const signIn = async (args: SignInResponse) => {
    loading.value = true;
    try {
      const response = await nuxtApp.$axios.post<SignInRequest>(
        "/auth/login",
        args,
        {
          fetchOptions: { withoutRefresh: true },
        },
      );
      data.value = response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosErrorFromImport) {
        const e: AxiosErrorFromImport<ErrorRequest, SignInResponse> = err;
        error.value = {
          message: e.response?.data?.message || "Failed to login",
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
    signIn,
  };
};
