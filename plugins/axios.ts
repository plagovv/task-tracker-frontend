import axios, { type AxiosError, type AxiosInstance } from "axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { ssl, appDomain } = useAppConfig();

  const apiClient: AxiosInstance = axios.create({
    baseURL: `http${ssl === "true" ? "s" : ""}://${appDomain}`,
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
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
