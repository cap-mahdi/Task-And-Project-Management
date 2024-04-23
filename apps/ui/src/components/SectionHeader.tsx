import React from 'react';
import { Sections } from './Sections';
import { Box, Divider, Typography } from '@mui/material';

export function SectionHeader(props) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {' '}
        Projet PPP
      </Typography>
      <Sections />
      <Divider />
    </Box>
  );
}
