import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Column } from './components/Column';
import { onDragEndHandler } from './utils';
import { TasksDataType } from './types';
import { useCustomMutation } from '../../hooks/useCustomMutation';
import { UPDATE_TASK_STATUS } from '../../services/task/taskMutations';

export interface TasksProps {
  intialData: TasksDataType;
}
export const Tasks = ({ intialData }: TasksProps) => {
  const [updateTask] = useCustomMutation(UPDATE_TASK_STATUS, false);
  const [state, setState] = useState<TasksDataType>(intialData);
  const onDragEnd = useCallback(
    (result: DropResult) => {
      onDragEndHandler(result, state, setState, updateTask);
    },
    [state]
  );

  useEffect(() => {
    setState(intialData);
  }, [intialData]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        flexDirection="row"
        sx={{
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {state.columnOrder.map((columnId: string) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: string) => state.tasks[taskId]
          );

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Stack>
    </DragDropContext>
  );
};
