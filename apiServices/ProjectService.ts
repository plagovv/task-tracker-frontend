import { BaseApiService } from "~/apiServices/BaseApiService";

export type ProjectItemUserData = {
  name: string;
  color: string;
  icon: string;
};

export interface ProjectItem extends ProjectItemUserData {
  _id: string;
  createdAt: string;
}

/**
 * Projects Service
 */
export class ProjectService extends BaseApiService {
  /**
   * Get all projects list
   */
  async getAll(): Promise<ProjectItem[]> {
    return this.handleRequest(this.http.get("/collections"));
  }

  /**
   * Create project
   * @param data
   */
  async createProject(data: ProjectItemUserData): Promise<ProjectItem> {
    return this.handleRequest(this.http.post(`/collections`, data));
  }

  /**
   * Update project by id
   * @param id
   * @param data
   */
  async updateProjectById(
    id: string,
    data: Partial<ProjectItemUserData>,
  ): Promise<ProjectItem> {
    return this.handleRequest(this.http.put(`/collections/${id}`, data));
  }

  /**
   * Delete project
   * @param id
   */
  async deleteProjectById(id: string): Promise<string> {
    return this.handleRequest(this.http.delete(`/collections/${id}`));
  }
}
