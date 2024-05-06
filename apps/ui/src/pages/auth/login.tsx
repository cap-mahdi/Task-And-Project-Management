import {
  Button,
  Card,
  Checkbox,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useCallback } from 'react';
import { AuthLayout } from '../../layout';
import { LinkableCaption } from './common';
import { useMutation } from '@apollo/client';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import Client from '../../services/api';
import useAppContext from '../../context/useAppContext';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest } from '../../services';
import { LoginSchema, LoginType } from '../../services/auth/login';

const LoginCard = () => {
  const navigate = useNavigate();
  const [globalState, setGlobalState] = useAppContext();
  const { handleSubmit, control } = useForm<LoginType>({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
  });

  const onStorageChange = useCallback(
    (newValue: any) => {
      setGlobalState((prevState: any) => ({
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

  const [createLoginRequest] = useMutation(LoginRequest);
  const onSubmitForm = (data: LoginType) => {
    console.log('data login ', data);
    // return;
    Client.post({
      request: createLoginRequest,
      data,
    }).then((res) => {
      console.log('from login', res);
      setToken(res.data.createPost.accessToken);
    });
  };

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
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="password"
            type="password"
            size="small"
            placeholder="********"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

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
        type="submit"
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
      linkPath="/register"
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
