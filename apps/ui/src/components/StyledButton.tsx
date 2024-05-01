import { Button, SxProps } from '@mui/material';
import React from 'react';

interface StytledButtonProps {
  sx?: SxProps;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function StyledButton({ sx, onClick, children }: StytledButtonProps) {
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
