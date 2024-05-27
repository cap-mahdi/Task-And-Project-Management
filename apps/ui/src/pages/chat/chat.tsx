import { Box } from '@mui/material';
import { FC } from 'react';
import { ChatList } from './components/ChatList';
import { Conversation } from './components/Conversation';
import useProjectContext from '../../context/useProjectContext';

export const Chat: FC = () => {
  const [projectState, setProjectState] = useProjectContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <ChatList />

      <Conversation />
    </Box>
  );
};
