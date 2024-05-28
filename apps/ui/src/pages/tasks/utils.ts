import { DropResult } from 'react-beautiful-dnd';
import { TaskColumn, TasksDataType } from './types';

export const reorderColumnList = (
  sourceCol: TaskColumn,
  startIndex: number,
  endIndex: number
) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export const onDragEndHandler = (
  result: DropResult,
  state: TasksDataType,
  setState: (newState: TasksDataType) => void,
  updateTask: (obj: any) => void
) => {
  const { destination, source } = result;
  // If user tries to drop in an unknown destination
  if (!destination) return;
  // if the user drags and drops back in the same position
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  // If the user drops within the same column but in a different positoin
  const sourceCol = state.columns[source.droppableId];
  const destinationCol = state.columns[destination.droppableId];
  if (sourceCol.id === destinationCol.id) {
    const newColumn = reorderColumnList(
      sourceCol,
      source.index,
      destination.index
    );

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };
    setState(newState);
    return;
  }
  // If the user moves from one column to another
  const startTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = startTaskIds.splice(source.index, 1);
  const newStartCol = {
    ...sourceCol,
    taskIds: startTaskIds,
  };

  const endTaskIds = Array.from(destinationCol.taskIds);
  endTaskIds.splice(destination.index, 0, removed);
  const newEndCol = {
    ...destinationCol,
    taskIds: endTaskIds,
  };

  updateTask({
    variables: {
      id: removed,
      status: newEndCol.status,
    },
  });

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [newStartCol.id]: newStartCol,
      [newEndCol.id]: newEndCol,
    },
  };

  setState(newState);
};
