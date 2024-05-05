import { Outlet, createBrowserRouter } from 'react-router-dom';
import { NavBar, SideBar } from '../components';
import { Login, Register, ResetPassword } from '../pages/auth';
import { Layout } from '../layout';
import { Overview } from '../pages/overview';
import { Home } from '../pages/home';

import { Chat } from '../pages/chat/chat';

import { Tasks } from '../pages/tasks';

import { GeneralSettings } from '../pages/account/generalSettings';
import { NotificationSettings } from '../pages/account/notificationSettings';
import { SecuritySettings } from '../pages/account/securitySettings';
import { Sprint } from '../pages/sprint';

import { DashboardLayout } from '../layout/DashboardLayout';
import { SectionHeader } from '../components/SectionHeader';
import BasicModal from '../components/BasicModal';
import { TaskDetails } from '../components/taskDetails/TaskDetails';
import { MainLayout } from '../layout/MainLayout';
import { Task } from '../pages/tasks/components/Task';
import { DashboardNavBar } from '../components/DashboardNavBar';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard, Work } from '@mui/icons-material';
import { Account } from '../pages/account/Account';
import { Workspace } from '../pages/workspace/Workspace';
import { WorkspaceProjects } from '../pages/workspace/WorkspaceProjects';
import { WorkspaceProvider } from '../context/useWorkspaceContext';
import { ProjectProvider } from '../context/useProjectContext';
import { Project } from '../pages/project/Project';
import { ProjectSprints } from '../pages/project/ProjectSprints';
import { workspaceRoutes } from './workspaceRoutes';
import { accountRoutes } from './accountRoutes';

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
        element: <div>Notifs Goes Here</div>,
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
