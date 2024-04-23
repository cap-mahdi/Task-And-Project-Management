import { ListItemButton, useTheme } from '@mui/material';
import { FC } from 'react';

interface ListItemMenuButtonProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  sx?: object;
}

export const ListItemMenuButton: FC<ListItemMenuButtonProps> = ({
  children,
  selected,
  onClick,
  sx,
  key,
}) => {
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
};
