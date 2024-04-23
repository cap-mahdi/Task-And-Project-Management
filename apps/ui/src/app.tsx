import { RouterProvider } from 'react-router-dom';
import { router } from './pages';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
