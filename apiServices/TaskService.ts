import { BaseApiService } from "~/apiServices/BaseApiService";
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type StatusBasicType = "todo" | "process" | "done";

export interface TaskStatus {
  _id: string;
  name: string;
  type: StatusBasicType;
}

export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: number;
  user: string;
};

export type CreateTaskResponse = PartialBy<
  Omit<Task, "_id" | "user">,
  "description"
>;

export type UpdateTaskResponse = Partial<
  Omit<Task, "_id" | "user"> & { status: string; collection: string }
>;

export interface TaskItem extends Task {
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Task Service
 */
export class TaskService extends BaseApiService {
  /**
   * Get all tasks list
   */
  async getAll(): Promise<TaskItem[]> {
    return this.handleRequest(this.http.get("/tasks"));
  }

  /**
   * Get task by id
   * @param id
   */
  async getTaskById(id: string): Promise<TaskItem> {
    return this.handleRequest(this.http.get(`/tasks/${id}`));
  }

  /**
   * Create task
   * @param data
   */
  async createTask(data: CreateTaskResponse): Promise<TaskItem> {
    return this.handleRequest(this.http.post(`/tasks`, data));
  }

  /**
   * Update task by id
   * @param id
   * @param data
   */
  async updateTaskById(
    id: string,
    data: UpdateTaskResponse,
  ): Promise<TaskItem> {
    return this.handleRequest(this.http.put(`/tasks/${id}`, data));
  }

  /**
   * Delete task
   * @param id
   */
  async deleteTaskById(id: string): Promise<string> {
    return this.handleRequest(this.http.delete(`/tasks/${id}`));
  }
}
