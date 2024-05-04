import { createBrowserRouter } from 'react-router-dom';
import { NavBar, SideBar } from '../components';
import { Login, Register, ResetPassword } from './auth';
import { Layout } from '../layout';
import { Overview } from './overview';
import { Home } from './home';

import { Chat } from './chat/chat';

import { Tasks } from './tasks';

import { GeneralSettings } from './account/generalSettings';
import { NotificationSettings } from './account/notificationSettings';
import { SecuritySettings } from './account/securitySettings';
import { Sprint } from './sprint';

import { DashboardLayout } from '../layout/DashboardLayout';
import { SectionHeader } from '../components/SectionHeader';
import BasicModal from '../components/BasicModal';
import { TaskDetails } from '../components/taskDetails/TaskDetails';
import { MainLayout } from '../layout/MainLayout';
import { Task } from './tasks/components/Task';
import { DashboardNavBar } from '../components/DashboardNavBar';
import { ProtectedRoute } from '../components/ProtectedRoute';

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
        element: <MainLayout />,
        children: [
          {
            path: 'task',
            element: <Tasks />,
          },
          {
            path: 'chat',
            element: <Chat />,
          },
          {
            path: 'sprints',
            element: <Sprint />,
          },
          {
            path: 'account/general',
            element: <GeneralSettings />,
          },
          { path: 'account/notifications', element: <NotificationSettings /> },
          {
            path: 'account/security',
            element: <SecuritySettings />,
          },
        ],
      },
    ],
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
    path: '/tasks',
    children: [
      {
        path: '',
        element: <Tasks />,
      },
    ],
  },

  {
    path: '/chat',
    element: <Chat />,
  },

  { path: '/sprints', element: <Sprint /> },
]);
