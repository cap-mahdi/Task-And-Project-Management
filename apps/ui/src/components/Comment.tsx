import { Avatar, Box, Card, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../theme';

export function Comment({ name, content, userAvatar }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        // width: '50%',

        gap: 1,
      }}
    >
      <Avatar
        sx={{
          bgcolor: (theme) => theme.palette.acapulco.main,
          width: '2.5rem',
          height: '2.5rem',
          fontSize: '140%',
        }}
        src={userAvatar}
        // src={
        //   content.
        // }
        // src={src}
      >
        {name[0].toUpperCase()}
      </Avatar>
      <Box
        sx={{
          py: 1,
          px: 1.5,
          width: '100%',
          height: 'fit-content',
          bgcolor: (theme) => theme.palette.gray.main,
          borderRadius: '0.5rem',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'medium',
            fontSize: '80%',
            mb: 1,
          }}
        >
          {' '}
          {name}
        </Typography>
        <Typography
          sx={{
            // fontWeight: 'medium',
            fontSize: '80%',

            mb: 1,
          }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
}
