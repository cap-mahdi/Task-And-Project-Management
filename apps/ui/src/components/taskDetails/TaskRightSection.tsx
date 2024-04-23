import { Box } from '@mui/material';
import React from 'react';
import { Comment } from '../Comment';
import { AddComment } from '../AddComment';

export function TaskRightSection(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        width: '50%',
        px: 1,
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',

          gap: 1.5,
          overflow: 'hidden',
          overflowY: 'auto', // Enable vertical scrolling
          //   bgcolor: (theme) => theme.palette.acapulco.main,
        }}
      >
        <Comment src="https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg" />
        <Comment src="https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg" />
        <Comment />
        <Comment />
      </Box>

      <AddComment />
    </Box>
  );
}
