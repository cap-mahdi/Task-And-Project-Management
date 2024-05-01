import { Box } from '@mui/material';
import { FC } from 'react';
import { ChatHeader } from './ChatHeader';
import { ContactList } from './ContactList';
import { Search } from './Search';

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
      <Search />
      <ContactList />
    </Box>
  );
};
