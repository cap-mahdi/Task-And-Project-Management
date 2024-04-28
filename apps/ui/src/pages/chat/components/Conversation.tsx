import { Box } from '@mui/material';
import { FC } from 'react';
import { MenuBar } from './MenuBar';
import { MessageList } from './MessageList';

export const Conversation: FC = () => {
  return (
    <Box
      sx={{
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MenuBar />
      <MessageList />
    </Box>
  );
};
