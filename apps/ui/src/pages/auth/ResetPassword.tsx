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

const ResetPasswordCard = () => {
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

      <Button
        variant="contained"
        sx={{
          padding: '10px 0',
          borderRadius: 2,
        }}
      >
        Send Reset Link
      </Button>
    </Card>
  );
};
const ResetPasswordBottomCaption = () => {
  return (
    <LinkableCaption
      caption="Remebered the password?"
      linkText="Sign in now"
      linkPath="/auth/login"
    />
  );
};

export const ResetPassword: FC = () => {
  return (
    <AuthLayout
      title="Reset Password"
      upperCaption="Enter your email to get a reset link"
      bottomCaption={<ResetPasswordBottomCaption />}
    >
      <ResetPasswordCard />
    </AuthLayout>
  );
};
