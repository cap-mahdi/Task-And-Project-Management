import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, Layout } from '../layout';
import { Login, Register } from './auth';
import SideBar from '../components/sideBar/SideBar';
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
  {
    path: '/sideBarTest',
    element: <Layout />,
    children: [{ path: '', element: <SideBar /> }],
  },
]);
