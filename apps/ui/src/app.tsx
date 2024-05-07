import { RouterProvider } from 'react-router-dom';
import useAppContext from './context/useAppContext';
import { useEffect } from 'react';
import { useUser } from './services/auth';
import { router } from './routers';
import { CookieSharp } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

export const App = () => {
  return <RouterProvider router={router} />;
};
