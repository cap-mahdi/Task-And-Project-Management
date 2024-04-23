import { Box } from '@mui/material';
import React from 'react';

export function Tag({ children, sx }) {
  return (
    <Box
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        fontSize: '80%',
        borderRadius: '2rem',
        py: 0.5,
        px: 2,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
