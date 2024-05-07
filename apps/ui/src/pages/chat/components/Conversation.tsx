import { Box } from '@mui/material';
import { FC } from 'react';
import { MenuBar } from './MenuBar';
import { MessageList } from './MessageList';
import { InputChat } from './InputChat';

export const Conversation: FC = () => {
  return (
    <Box
      sx={{
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        height: '660px',
      }}
    >
      <MenuBar />
      <MessageList />
      <InputChat />
    </Box>
  );
};
