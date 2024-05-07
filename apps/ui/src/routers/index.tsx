import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Login, Register, ResetPassword } from '../pages/auth';
import { Home } from '../pages/home';
import { DashboardLayout } from '../layout/DashboardLayout';
import { DashboardNavBar } from '../components/DashboardNavBar';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { workspaceRoutes } from './workspaceRoutes';
import { accountRoutes } from './accountRoutes';
import { SideBar } from './../components/sideBar';
import { Chat } from '../pages/chat/chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        {' '}
        <DashboardLayout NavBar={<DashboardNavBar />} SideBar={<SideBar />} />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <div>Workpaces Goes Here</div>,
      },
      {
        path: 'notification',
        // element: <div>Notifs Goes Here</div>,
        element: <Chat />,
      },
      {
        path: 'task',
        element: <div>My tasks are displayed here</div>,
      },
      {
        path: '',
        element: (
          <div>
            <Outlet />
          </div>
        ),
        children: [accountRoutes, workspaceRoutes],
      },
    ],
  },
]);
