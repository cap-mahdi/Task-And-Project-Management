import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  upperCaption: string;
  bottomCaption: ReactNode;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  title,
  upperCaption,
  bottomCaption,
  children,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#F4E9CD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#595a5d',
          }}
        >
          {upperCaption}
        </Typography>
        {children}
        {bottomCaption}
      </Stack>
    </Box>
  );
};
