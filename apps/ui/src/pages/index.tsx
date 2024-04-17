import { createBrowserRouter } from 'react-router-dom';

import SideBar from '../components/sideBar/SideBar';

import { Login, Register } from './auth';
import { Layout } from '../layout/layout';

import { Overview } from './overview';

import { ResetPassword } from './auth/reset-password';


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
    element: <Layout />,
    children: [{ path: '', element: <div>Home page</div> }],
  },
  {
    path: '/overview',
    element: <Overview />,
},{
    path: '/sideBarTest',
    element: <Layout />,
    children: [{ path: '', element: <SideBar /> }],

  },
]);
