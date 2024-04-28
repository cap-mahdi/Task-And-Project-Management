import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import { Task } from './Task';
import { Task as TaskType, TaskColumn } from '../types';
import { TaskDetails } from '../../../components/taskDetails/TaskDetails';
import BasicModal from '../../../components/BasicModal';
import { createPortal } from 'react-dom';

interface ColumnProps {
  column: TaskColumn;
  tasks: TaskType[];
}
export const Column: FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <Card
      sx={{
        boxShadow: 'unset',
      }}
    >
      <Stack
        sx={{
          backgroundColor: 'white',
          padding: '0.5rem 1.5rem',
          mb: '1rem',
        }}
      >
        <Stack flexDirection="row" justifyContent={'space-between'}>
          <Stack>
            <Typography>{column.title}</Typography>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={1}
          >
            <Avatar
              sx={{
                width: 20,
                height: 20,
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
              }}
            >
              <Typography
                sx={{
                  color: 'black',
                }}
              >
                {tasks.length}
              </Typography>
            </Avatar>
            <MoreHorizIcon
              sx={{
                cursor: 'pointer',
                color: '#727984',
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <CardContent
        sx={{
          borderRadius: '20px',
          backgroundColor: '#f3f4f6',
          width: '23rem',
          //maxHeight: '1000px',
          padding: '1.2rem',
        }}
      >
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <Box
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task: TaskType, index: number) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => {
                    return (
                      <Box
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Task
                          task={task}
                          draggableSnapshot={draggableSnapshot}
                        />
                      </Box>
                    );
                  }}
                </Draggable>
              ))}
              <Draggable
                draggableId={`last-${column.id}`}
                index={tasks.length}
                isDragDisabled
              >
                {(draggableProvided, draggableSnapshot) => (
                  <Card
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                      padding: '1rem',
                      backgroundColor: 'white',
                      borderRadius: '20px',
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: '#898e89',
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#898e89',
                      }}
                    >
                      Add Task
                    </Typography>
                  </Card>
                )}
              </Draggable>
            </Box>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};
