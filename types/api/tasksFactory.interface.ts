// Get list
import type { TaskStatus } from "~/types/api/statusFactory.interface";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus | string;
  priority: number;
  user: string;
}

export interface UpdateTaskResponse {
  title?: string;
  description?: string;
  status?: string;
  priority?: number;
  user?: string;
}

export interface TaskItem extends Task {
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
// Get By id
// Update By id
// Delete By id
