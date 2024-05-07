import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

export const ChatHeader: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: 1,
        px: 2,
        marginTop: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 'medium',
        }}
      >
        Chats
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          borderRadius: 3,
        }}
        startIcon={<AddIcon />}
      >
        Group
      </Button>
    </Box>
  );
};
