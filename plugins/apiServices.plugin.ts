import { defineNuxtPlugin } from "#app";
import { TaskService } from "~/apiServices/TaskService";
import { AuthService } from "~/apiServices/AuthService";
import type { AxiosInstance } from "axios";
import { ProjectService } from "~/apiServices/ProjectService";

declare module "#app" {
  interface NuxtApp {
    $services: {
      auth: AuthService;
      tasks: TaskService;
      projects: ProjectService;
    };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const services = {
    auth: new AuthService(nuxtApp.$axios as AxiosInstance),
    tasks: new TaskService(nuxtApp.$axios as AxiosInstance),
    projects: new ProjectService(nuxtApp.$axios as AxiosInstance),
  };

  //nuxtApp.provide("services", services);
  return {
    provide: {
      services,
    },
  };
});
