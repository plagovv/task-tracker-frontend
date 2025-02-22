import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export abstract class BaseApiService {
  constructor(protected readonly http: AxiosInstance) {}

  protected async handleRequest<T>(
    promise: Promise<AxiosResponse<T>>,
  ): Promise<T> {
    try {
      const response = await promise;
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    // Добавьте кастомную логику обработки ошибок
  }
}
