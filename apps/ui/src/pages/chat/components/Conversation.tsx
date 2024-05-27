import { Box } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import { MenuBar } from './MenuBar';
import { MessageList } from './MessageList';
import { InputChat } from './InputChat';
import { SocketContext } from '../../../context/useSocketContext';
import useProjectContext from '../../../context/useProjectContext';
import { log } from 'console';

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
