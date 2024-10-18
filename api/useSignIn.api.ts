import { ref } from "vue";
import { useNuxtApp } from "#app";
import type {
  SignInRequest,
  SignInResponse,
} from "~/api/types/signIn.interface";
import type RequestError from "~/api/types/error.interface";

export const useSighIn = () => {
  const nuxtApp = useNuxtApp();
  const data = ref<SignInRequest | null>(null);
  const error = ref<RequestError | null>(null);
  const loading = ref<boolean>(false);

  const signIn = async (args: SignInResponse) => {
    loading.value = true;
    try {
      const response = await nuxtApp.$axios.post<SignInRequest>(
        "/auth/login",
        args,
      );
      data.value = response.data;
    } catch (err: import("axios").AxiosError) {
      error.value = {
        message: err.response?.data?.message || "Failed to login",
        code: err.response.status | 0,
      };
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
