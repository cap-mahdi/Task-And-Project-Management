import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layout';
import { Login, Register } from './auth';
export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
