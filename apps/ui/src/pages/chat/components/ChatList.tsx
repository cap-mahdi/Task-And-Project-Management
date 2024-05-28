import { Box, InputAdornment, TextField } from '@mui/material';
import { FC } from 'react';
import { ChatHeader } from './ChatHeader';
import { ContactList } from './ContactList';

export const ChatList: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        gap: 2,
      }}
    >
      <ChatHeader />
      <ContactList />
    </Box>
  );
};
