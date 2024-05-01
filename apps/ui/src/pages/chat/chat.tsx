import { Box } from '@mui/material';
import { FC } from 'react';
import { ChatList } from './components/ChatList';
import { Conversation } from './components/Conversation';

export const Chat: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '70dvh',
        // backgroundColor: 'red',
      }}
    >
      <ChatList />
      <Conversation />
    </Box>
  );
};
