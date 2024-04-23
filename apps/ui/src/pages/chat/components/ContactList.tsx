import { Box } from '@mui/material';
import { FC } from 'react';
import { Contact } from './Contact';

export const ContactList: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '70vh',
        overflowY: 'auto',
      }}
    >
      {[...Array(10)].map((_, index) => (
        <Contact key={index} />
      ))}
    </Box>
  );
};
