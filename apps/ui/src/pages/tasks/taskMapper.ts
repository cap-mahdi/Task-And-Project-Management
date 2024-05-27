import { stat } from 'fs';
import { Status, Task } from '../../__generated__/graphql';
import { TaskType, TasksDataType } from './types';

export const taksMapper = (intialTasks: Task[]): TasksDataType => {
  console.log('intialTasks', intialTasks);
  const tasks = intialTasks.reduce((acc, task) => {
    acc[task.id] = {
      id: task.id,
      name: task.name,
      description: task.description,
      assignees: task.userTasks.map((userTask) => userTask.user),
      tags: task.tags,
      creator: task.creator,
      status: task.status,
      createdAt: task.createdAt,
    };
    return acc;
  }, {} as Record<string, TaskType>);

  const columns = {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: intialTasks
        .filter((task) => task.status === Status.OPEN)
        .map((task) => task.id),
      status: Status.OPEN,
    },
    'column-2': {
      id: 'column-2',
      title: 'Progress',
      taskIds: intialTasks
        .filter((task) => task.status === Status.IN_PROGRESS)
        .map((task) => task.id),
      status: Status.IN_PROGRESS,
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: intialTasks
        .filter((task) => task.status === Status.DONE)
        .map((task) => task.id),
      status: Status.DONE,
    },
  };

  return {
    tasks,
    columns,
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };
};
