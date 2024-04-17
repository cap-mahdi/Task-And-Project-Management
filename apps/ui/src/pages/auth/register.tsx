import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { AuthLayout } from '../../layout';
import { LinkableCaption } from './common';

const RegisterCard = () => {
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
          htmlFor="name"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 12,
          }}
        >
          First & Last Name
        </InputLabel>
        <TextField id="name" placeholder="i.e john doe" size="small" />
      </Stack>
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
        <TextField id="password" type="password" size="small" />
      </Stack>
      <Stack spacing={1}>
        <InputLabel
          htmlFor="confirmPassword"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 12,
          }}
        >
          Confirm Password
        </InputLabel>
        <TextField id="confirmPassword" type="password" size="small" />
      </Stack>
      <Stack spacing={1} direction={'row'} alignItems={'center'}>
        <Checkbox />
        <Typography
          sx={{
            fontSize: 12,
          }}
        >
          I agree to the terms and conditions
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{
          padding: '10px 0',
          borderRadius: 2,
        }}
      >
        Create an account
      </Button>
    </Card>
  );
};
const RegisterBottomCaption = () => {
  return (
    <LinkableCaption
      caption="Already have an account?"
      linkText="Sign in now"
      linkPath="/auth/login"
    />
  );
};

export const Register: FC = () => {
  return (
    <AuthLayout
      title="Sign up  "
      upperCaption="To get started you need to sign up here"
      bottomCaption={<RegisterBottomCaption />}
    >
      <RegisterCard />
    </AuthLayout>
  );
};
