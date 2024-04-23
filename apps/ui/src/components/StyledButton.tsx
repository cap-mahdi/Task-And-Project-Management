import { Button } from '@mui/material';
import React from 'react';

export function StyledButton({ sx, onClick, children }) {
  return (
    <Button
      onClick={onClick}
      on
      sx={{
        bgcolor: (theme) => theme.palette.steelTeal.main,
        color: (theme) => theme.palette.gray.main,
        borderRadius: '0.8rem',
        width: 'fit-content',
        textTransform: 'none',

        '&:hover': {
          bgcolor: (theme) => theme.palette.acapulco.main,
          color: (theme) => theme.palette.gray.main,
        },

        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
