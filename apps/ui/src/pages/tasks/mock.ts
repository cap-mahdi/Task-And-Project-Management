import { Status } from '../../__generated__/graphql';
import { TasksDataType } from './types';

export const data: TasksDataType = {
  tasks: {
    '1': {
      id: '1',
      name: 'Task 1',
      description: 'Task 1 description',
      assignees: ['M', 'H'],
      tags: ['tag1', 'tag2'],
    },
    '2': {
      id: '2',
      name: 'Task 2',
      description: 'Task 2 description',
      assignees: ['M', 'M', 'H'],
      tags: ['tag1', 'tag2'],
    },
    '3': {
      id: '3',
      name: 'Task 3',
      description: 'Task 3 description',
      assignees: ['M', 'M', 'H', 'G', 'A'],
      tags: ['tag1', 'tag2'],
    },
    '4': {
      id: '4',
      name: 'Task 4',
      description: 'Task 4 description',
      assignees: ['G', 'M', 'H'],
      tags: ['tag1', 'tag2'],
    },
    '5': {
      id: '5',
      name: 'Task 5',
      description: 'Task 5 description',
      assignees: ['M'],
      tags: ['tag1', 'tag2'],
    },
    '6': {
      id: '6',
      name: 'Task 6',
      description: 'Task 6 description',
      assignees: ['H'],
      tags: ['tag1', 'tag2'],
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['1', '2', '3', '4', '5'],
      status: Status.OPEN,
    },
    'column-2': {
      id: 'column-2',
      title: 'Progress',
      taskIds: ['6'],
      status: Status.IN_PROGRESS,
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
      status: Status.DONE,
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
