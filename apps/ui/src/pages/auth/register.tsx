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
import { FC, useCallback, useState } from 'react';
import { AuthLayout } from '../../layout';
import { LinkableCaption } from './common';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { SignupRequest } from '../../services/auth';
import Client from '../../services/api';
import { useMutation } from '@apollo/client';
import { useCustomMutation } from '../../hooks/useCustomMutation';

const RegisterCard = () => {
  const navigate = useNavigate();
  const [globalState, setGlobalState] = useAppContext();
  const onStorageChange = useCallback(
    (newValue) => {
      setGlobalState((prevState) => ({
        ...prevState,
        token: newValue,
      }));
      if (newValue) navigate('/app');
    },

    [setGlobalState]
  );

  const [token, setToken] = useLocalStorageState({
    key: 'token',
    // initialState: '',
    onStorageChange,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createLoginRequest] = useCustomMutation(SignupRequest);

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
        <TextField
          id="name"
          placeholder="i.e john doe"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          id="password"
          type="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <TextField
          id="confirmPassword"
          type="password"
          size="small"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
        disabled={
          email === '' ||
          password === '' ||
          name === '' ||
          confirmPassword === ''
        }
        onClick={() => {
          setEmail('');
          setName('');
          setPassword('');
          setConfirmPassword('');

          Client.post({
            request: createLoginRequest,
            data: { email, password, name, confirmPassword },
          }).then((res) => {
            console.log('from Signup', res);
            setToken(res.data.createPost.accessToken);
          });
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
