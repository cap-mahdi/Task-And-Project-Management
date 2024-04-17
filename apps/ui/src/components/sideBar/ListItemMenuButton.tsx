import { ListItemButton, useTheme } from '@mui/material';
import React, { Children } from 'react';

export function ListItemMenuButton({ children, selected, onClick, sx }) {
  const theme = useTheme();
  const { palette } = theme;
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        px: 1,
        borderRadius: 2,
        '&.Mui-selected': {
          backgroundColor: (theme) => palette.gray.main,
          ':hover': {
            backgroundColor: (theme) => palette.gray.main,
          },
        },
        '&:hover': {
          backgroundColor: (theme) => palette.gray.main,
        },
        ...sx,
      }}
      selected={selected}
      alignItems={'center'}
    >
      {children}
    </ListItemButton>
  );
}
