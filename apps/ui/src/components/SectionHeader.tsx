import React from 'react';
import { Sections } from './Sections';
import { Box, Divider, Typography } from '@mui/material';

export function SectionHeader(props) {
  return (
    <Box
      sx={{
        pt: 2,
        pb: '1px',
        position: 'fixed',
        backgroundColor: 'white',
        width: '100%',
        zIndex: 1000,
        boxShadow: 'none',
        px: 2,
        border: 'none',
        borderRadius: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        {' '}
        Projet PPP
      </Typography>
      <Sections />
      <Divider />
    </Box>
  );
}
