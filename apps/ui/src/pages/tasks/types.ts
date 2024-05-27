import { Status, Task, User } from '../../__generated__/graphql';

export type TaskColumn = {
  id: string;
  title: string;
  taskIds: string[];
  status: Status;
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: Date;
  creator: {
    id: string;
    name: string;
  };
  assignees: {
    id: string;
    name: string;
  }[];
  tags: string[];
};

export type TasksDataType = {
  tasks: Record<string, TaskType>;
  columns: Record<string, TaskColumn>;
  columnOrder: string[];
};
