import { Avatar, Box, Card, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../theme';

export function Comment({ src = '', data }) {
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
        src={src}
      >
        N
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
          My name is here
        </Typography>
        <Typography
          sx={{
            // fontWeight: 'medium',
            fontSize: '80%',

            mb: 1,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          necessitatibus, mollitia expedita necessitatibus, mollitia expedita
          necessitatibus, mollitia expedita necessitatibus, mollitia expedita
          necessitatibus, mollitia expedita ne
        </Typography>
      </Box>
    </Box>
  );
}
