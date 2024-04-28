import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Footer } from '../components';
import { AuthNavBar } from '../pages/auth/common/AuthNavBar';

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
    <>
      <AuthNavBar />
      <Box
        sx={{
          backgroundColor: '#F4E9CD',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            paddingTop: '5dvh',
            minHeight: '87dvh',
            width: '100%',
          }}
        >
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
        <Footer />
      </Box>
    </>
  );
};
