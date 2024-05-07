import { gql, useLazyQuery, useQuery } from '@apollo/client';
import useAppContext from '../../context/useAppContext';

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
  const [getUser, { data, error, loading }] = useLazyQuery(
    getConnectedUserRequest
  );
  const [globalState, setGlobalState] = useAppContext();

  if (globalState.token && !globalState.user && !loading && !data) {
    console.log('fetching user');

    getUser();
  }
  return { user: data, error, isLoading: loading, getUser };
};
