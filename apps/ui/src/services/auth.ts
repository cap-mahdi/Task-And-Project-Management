import { Login } from '@mui/icons-material';
import { useRestApi } from './api';
import RestClient from './api';
import { gql, useMutation, useQuery } from '@apollo/client';
import useAppContext from '../context/useAppContext';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const LoginRequest = gql`
  mutation LoginRequest($input: LoginInput!) {
    createPost(input: $input)
      @rest(
        type: "Post"
        path: "/auth/login"
        method: "POST"
        bodyKey: "input"
      ) {
      accessToken
    }
  }
`;
export const SignupRequest = gql`
  mutation SignupRequest($input: SignupInput!) {
    createPost(input: $input)
      @rest(
        type: "Post"
        path: "/auth/signup"
        method: "POST"
        bodyKey: "input"
      ) {
      user
      accessToken
    }
  }
`;

interface LoginProps {
  email: string;
  password: string;
}
const getConnectedUserRequest = gql`
  query getConnectedUser {
    getConnectedUser {
      id
      name
      email
      role
    }
  }
`;

export const useUser = () => {
  console.log('HEEEEREE');
  const { data, error, loading } = useQuery(getConnectedUserRequest);
  console.log('data', data);
  console.log('data', data?.getConnectedUser);

  return { user: data?.getConnectedUser, error, isLoading: loading };
};
