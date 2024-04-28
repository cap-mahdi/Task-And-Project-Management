import { RouterProvider } from 'react-router-dom';
import { router } from './pages';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { useQuery } from '@apollo/client';
import { gql } from './__generated__';

const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      name
      workspaces {
        workspace {
          name
        }
      }
    }
  }
`);

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
