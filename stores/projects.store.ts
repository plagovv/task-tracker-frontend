import type {
  ProjectItem,
  ProjectItemUserData,
} from "~/apiServices/ProjectService";
import { useAsync } from "~/composables/useAsync";

export const useProjectsStore = defineStore("projects", () => {
  const { $services } = useNuxtApp();
  const mainState = useMainStore();
  const projects = ref<ProjectItem[] | null>(null);

  const {
    data: getProjectListData,
    execute: getProjectsList,
    loading: getProjectsListLoading,
    error: getProjectsListError,
  } = useAsync($services.projects.getAll, {
    context: $services.projects,
  });

  const {
    data: createProjectApiData,
    execute: createProjectApi,
    error: createProjectApiError,
    loading: createProjectApiLoading,
  } = useAsync($services.projects.createProject, {
    context: $services.projects,
  });

  async function fetchProjects() {
    try {
      mainState.syncLoader = true;
      await getProjectsList();
      projects.value = getProjectListData.value;
    } finally {
      mainState.syncLoader = false;
    }
  }

  /**
   * Создание проекта
   * @param project
   */
  async function createProject(project: ProjectItemUserData) {
    try {
      await createProjectApi(project);
      fetchProjects();
    } catch {
      // TODO: Notif error
      console.log(createProjectApiError);
    }
  }

  return {
    createProject,
    createProjectApiLoading,
  };
});
