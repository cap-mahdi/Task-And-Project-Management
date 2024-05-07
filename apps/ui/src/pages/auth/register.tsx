import {
  Button,
  Card,
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
import { RegisterSchema, RegisterType, SignupRequest } from '../../services/auth/signup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { RegisterSchema, RegisterType, SignupRequest } from '../../services/auth/signup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Client from '../../services/api';
import { useCustomMutation } from '../../hooks/useCustomMutation';

const RegisterCard = () => {
  const navigate = useNavigate();

  const [globalState, setGlobalState] = useAppContext();
  const { register, handleSubmit, control } = useForm<RegisterType>({
    resolver: yupResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const onStorageChange = useCallback(
    (newValue: any) => {
      setGlobalState((prevState: RegisterType) => ({
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
  const onSubmitForm = (data: RegisterType) => {
    // const { email, password, name, confirmPassword } = data;
    console.log('register data ', data);
    Client.post({
      request: createLoginRequest,
      data: data,
    }).then((res) => {
      console.log('from Signup', res);
      setToken(res.data.createPost.accessToken);
    });
  };

  const [createLoginRequest] = useCustomMutation(SignupRequest, true);

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
      component={'form'}
      onSubmit={handleSubmit(onSubmitForm)}
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
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="name"
              placeholder="i.e john doe"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
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
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="email"
              type="email"
              placeholder="gdoura@gmail.com"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
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
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="password"
              type="password"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="confirmPassword"
              type="password"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
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
        type="submit"
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
