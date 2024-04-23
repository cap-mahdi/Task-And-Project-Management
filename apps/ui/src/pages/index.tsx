import { createBrowserRouter } from 'react-router-dom';
import { SideBar } from '../components';
import { Login, Register, ResetPassword } from './auth';
import { Layout } from '../layout';
import { Overview } from './overview';
import { Home } from './home';
import { Sprint } from './sprint';

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
  {
    path: '/sprints',
    element: <Sprint />,
  },
]);
