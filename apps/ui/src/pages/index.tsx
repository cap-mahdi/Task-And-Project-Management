import { createBrowserRouter } from 'react-router-dom';

import { SideBar } from '../components';

import { Login, Register } from './auth';
import { Layout } from '../layout/Layout';

import { Overview } from './overview';

import { ResetPassword } from './auth/ResetPassword';
import { Home } from './home';

export const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/overview',
    element: <Overview />,
  },
  {
    path: '/side-bar-test',
    element: <Layout />,
    children: [{ path: '', element: <SideBar /> }],
  },
]);
