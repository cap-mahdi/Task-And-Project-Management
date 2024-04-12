import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layout';
import { Login, Register } from './auth';
import { Layout } from '../layout/layout';
export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <div>Home page</div> }],
  },
]);
