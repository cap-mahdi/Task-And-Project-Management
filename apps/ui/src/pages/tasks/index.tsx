import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { Column } from './components/Column';
import { data } from './mock';
import { onDragEndHandler } from './utils';
import { TasksDataType } from './types';

export function Tasks() {
  const [state, setState] = useState<TasksDataType>(data);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      onDragEndHandler(result, state, setState);
    },
    [state]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        flexDirection="row"
        sx={{
          justifyContent: 'center',
          // padding: '4rem',

          gap: '2rem',
        }}
      >
        {state.columnOrder.map((columnId: string) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: number) => state.tasks[taskId]
          );

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Stack>
    </DragDropContext>
  );
}
