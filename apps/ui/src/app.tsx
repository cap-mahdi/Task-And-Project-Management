import { RouterProvider } from 'react-router-dom';
import { router } from './pages';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { AppContext } from './context/useAppContext';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ThemeProvider>
  );
};
