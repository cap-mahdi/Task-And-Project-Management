import { TasksDataType } from './types';

export const data: TasksDataType = {
  tasks: {
    1: {
      id: 1,
      title: 'Task 1',
      image: 'public/test/task.jpg',
      assignees: ['M', 'H'],
      tags: ['tag1', 'tag2'],
    },
    2: {
      id: 2,
      title: 'Task 2',
      assignees: ['M', 'M', 'H'],
      tags: ['tag1', 'tag2'],
    },
    3: {
      id: 3,
      title: 'Task 3',
      assignees: ['M', 'M', 'H', 'G', 'A'],
      tags: ['tag1', 'tag2'],
    },
    4: {
      id: 4,
      title: 'Task 4',
      image: 'public/test/task.jpg',
      assignees: ['G', 'M', 'H'],
      tags: ['tag1', 'tag2'],
    },
    5: {
      id: 5,
      title: 'Task 5',
      image: 'public/test/task.jpg',
      assignees: ['M'],
      tags: ['tag1', 'tag2'],
    },
    6: {
      id: 6,
      title: 'Task 6',
      image: 'public/test/task.jpg',
      assignees: ['H'],
      tags: ['tag1', 'tag2'],
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: [1, 2, 3, 4, 5],
    },
    'column-2': {
      id: 'column-2',
      title: 'Progress',
      taskIds: [6],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
