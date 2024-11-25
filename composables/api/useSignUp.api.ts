import { ref } from "vue";
import { useNuxtApp } from "#app";
import type {
  SignUpRequest,
  SignUpResponse,
} from "~/types/api/signUp.interface";
import type { ErrorRequest, RequestError } from "~/types/api/error.interface";
import { AxiosError as AxiosErrorFromImport } from "axios";
import type { SignInResponse } from "~/types/api/signIn.interface";

export const useSignUp = () => {
  const nuxtApp = useNuxtApp();
  const data = ref<SignUpRequest | null>(null);
  const error = ref<RequestError | null>(null);
  const loading = ref<boolean>(false);

  const signUp = async (args: SignUpResponse) => {
    loading.value = true;
    try {
      const response = await nuxtApp.$axios.post<SignUpRequest>(
        "/auth/register",
        args,
      );
      data.value = response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosErrorFromImport) {
        const e: AxiosErrorFromImport<ErrorRequest, SignInResponse> = err;
        error.value = {
          message: e.response?.data?.message || "Failed to register",
          code: e.response?.status || 0,
        };
      }
    } finally {
      loading.value = true;
    }
  };

  return {
    data,
    error,
    loading,
    signUp,
  };
};
