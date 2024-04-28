import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Task as TaskType } from '../types';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import BasicModal from '../../../components/BasicModal';
import { TaskDetails } from '../../../components/taskDetails/TaskDetails';
import { Opacity } from '@mui/icons-material';

interface TaskProps {
  task: TaskType;
  draggableSnapshot: DraggableStateSnapshot;
}
export const Task: FC<TaskProps> = ({ task, draggableSnapshot }) => {
  const [openDetails, setOpenDetails] = useState(false);

  console.log(task);

  return (
    <>
      <Card
        onClick={() => setOpenDetails(true)}
        sx={{
          borderRadius: '20px',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          mb: '1rem',
          outlineColor: draggableSnapshot.isDragging ? 'red' : 'transparent',
          boxShadow: draggableSnapshot.isDragging
            ? '0 5px 10px rgba(0, 0, 0, 0.6)'
            : 'unset',
        }}
        // outlineColor={
        //   draggableSnapshot.isDragging
        //     ? 'card-border'
        //     : 'transparent'
        // }
        // boxShadow={
        //   draggableSnapshot.isDragging
        //     ? '0 5px 10px rgba(0, 0, 0, 0.6)'
        //     : 'unset'
        // }
      >
        {task.image && (
          <Box sx={{ width: '100%', height: '200px' }}>
            <img
              src={task.image}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </Box>
        )}
        <Typography>{task.title}</Typography>
        <Stack
          flexDirection="row"
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={1}
        >
          <Stack
            flexDirection="row"
            justifyContent={'flex-start'}
            gap={1}
            flexWrap={'wrap'}
          >
            {task.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>
          <AvatarGroup max={4}>
            {task.assignees.map((assignee, index) => (
              <Avatar
                key={assignee + index}
                sx={{
                  backgroundColor: `orange`,
                }}
              >
                {assignee}
              </Avatar>
            ))}
          </AvatarGroup>
        </Stack>
      </Card>
      <BasicModal open={openDetails} setOpen={setOpenDetails}>
        <TaskDetails task={task} />
      </BasicModal>
    </>
  );
};
