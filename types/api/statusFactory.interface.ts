export type StatusBasicType = "todo" | "process" | "done";

export interface TaskStatus {
  _id: string;
  name: string;
  type: StatusBasicType;
}
