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
import { LoginRequest } from '../../services/auth';
import { useMutation } from '@apollo/client';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import Client from '../../services/api';
import useAppContext from '../../context/useAppContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EMAIL_REGEX } from '../../utils';

const schema = yup.object().shape({
  email: yup.string().email().matches(EMAIL_REGEX, 'Invalid email').required(),
  password: yup.string().min(8).required(),
});

const LoginCard = () => {
  const navigate = useNavigate();
  const [globalState, setGlobalState] = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = (data: any) => {
    // const { email, password } = data;
    console.log('from login', email, ' ', password);

    Client.post({
      request: createLoginRequest,
      data: { email, password },
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
        <TextField
          {...register('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="i.e john@mail.com"
          size="small"
          error={errors.email ? true : false}
        />
      </Stack>

      {errors.email && (
        <Typography
          sx={{
            color: 'red',
            fontSize: 12,
          }}
        >
          {errors.email.message}
        </Typography>
      )}

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
        <TextField
          {...register('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          size="small"
          error={errors.password ? true : false}
          // component={'input'}
        />
      </Stack>

      {errors.password && (
        <Typography
          sx={{
            color: 'red',
            fontSize: 12,
          }}
        >
          {errors.password.message}
        </Typography>
      )}

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
        // disabled={email === '' || password === ''}
        // onClick={() => {
        //   setEmail('');
        //   setPassword('');

        //   Client.post({
        //     request: createLoginRequest,
        //     data: { email, password },
        //   }).then((res) => {
        //     console.log('from login', res);
        //     setToken(res.data.createPost.accessToken);
        //   });
        // }}

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
