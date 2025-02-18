import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { defineNuxtPlugin } from "#app";
import type { SignInRequest } from "~/types/api/signIn.interface";

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export default defineNuxtPlugin((nuxtApp) => {
  const { ssl, appDomain } = useAppConfig();
  const mainStore = useMainStore();

  const createNewInstance: () => AxiosInstance = () =>
    axios.create({
      baseURL: `http${ssl ? "s" : ""}://${appDomain}`,
    });

  const apiClient: AxiosInstance = createNewInstance();

  apiClient.interceptors.request.use(
    (response) => {
      if (mainStore.token) {
        response.headers["Authorization"] = `Bearer ${mainStore.token}`;
      }

      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest!.fetchOptions!.withoutRefresh
      ) {
        originalRequest._retry = true;
        try {
          const refreshInstance = createNewInstance();
          const { data } = await refreshInstance.post<SignInRequest>(
            "/auth/refresh-token",
            { refreshToken: mainStore.refreshToken },
          );
          mainStore.setAuthData(data);
          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${mainStore.token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.log("logout from axios err");
          mainStore.logout();
          return Promise.reject(refreshError);
        }
      }
      // Обработка общей ошибки
      if (error.response) {
        console.error(`Error: ${error.response.status}`);
      }
      return Promise.reject(error);
    },
  );

  // Регистрация как глобального
  nuxtApp.provide("axios", apiClient);
});
