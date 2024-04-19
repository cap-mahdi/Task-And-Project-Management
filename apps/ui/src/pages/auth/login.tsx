import {
  Button,
  Card,
  Checkbox,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { AuthLayout } from '../../layout';
import { LinkableCaption } from './common';

const LoginCard = () => {
  return (
    <Card
      sx={{
        padding: 3,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: ' 0px 4px 8px rgba(0, 0, 0, 0.25)',
        width: 300,
      }}
    >
      <Stack spacing={1}>
        <InputLabel
          htmlFor="email"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 12,
          }}
        >
          Email
        </InputLabel>
        <TextField
          id="email"
          type="email"
          placeholder="i.e john@mail.com"
          size="small"
        />
      </Stack>
      <Stack spacing={1}>
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems={'center'}
        >
          <InputLabel
            htmlFor="password"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 12,
            }}
          >
            Password
          </InputLabel>
          <Typography
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
            }}
          >
            Forgot password?
          </Typography>
        </Stack>
        <TextField id="password" type="password" size="small" />
      </Stack>
      <Stack spacing={1} direction={'row'} alignItems={'center'}>
        <Checkbox />
        <Typography
          sx={{
            fontSize: 12,
          }}
        >
          Remember me
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{
          padding: '10px 0',
          borderRadius: 2,
        }}
      >
        Sign in
      </Button>
    </Card>
  );
};
const LoginBottomCaption = () => {
  return (
    <LinkableCaption
      caption="Don't have an account?"
      linkText="Create an Account"
      linkPath="/auth/register"
    />
  );
};

export const Login: FC = () => {
  return (
    <AuthLayout
      title="Login"
      upperCaption="To get started you need to sign in here"
      bottomCaption={<LoginBottomCaption />}
    >
      <LoginCard />
    </AuthLayout>
  );
};
