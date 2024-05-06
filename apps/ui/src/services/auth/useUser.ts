import { gql, useQuery } from '@apollo/client';

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
