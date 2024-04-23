export type Task = {
  id: number;
  title: string;
  image?: string;
  assignees: string[];
  tags: string[];
};

export type TaskColumn = {
  id: string;
  title: string;
  taskIds: number[];
};

export type TasksDataType = {
  tasks: Record<number, Task>;
  columns: Record<string, TaskColumn>;
  columnOrder: string[];
};
