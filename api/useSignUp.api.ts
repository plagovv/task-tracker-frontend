import { ref } from "vue";
import { useNuxtApp } from "#app";
import type { SignUpRequest } from "~/api/types/signUp.interface";
import type RequestError from "~/api/types/error.interface";

export const useSignUp = () => {
  const nuxtApp = useNuxtApp();
  const data = ref<SignUpRequest | null>(null);
  const error = ref<RequestError | null>(null);
  const loading = ref<boolean>(false);

  const signUp = async (args: SignUpRequest) => {
    loading.value = true;
    try {
      const response = await nuxtApp.$axios.post<SignUpRequest>(
        "/auth/register",
        args,
      );
      data.value = response.data;
    } catch (err: import("axios").AxiosError) {
      error.value.message = err.response.data.message || "Failed to register";
      error.value.code = err.response.status | 0;
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
