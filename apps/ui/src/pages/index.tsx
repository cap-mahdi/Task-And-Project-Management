import { createBrowserRouter } from 'react-router-dom';
import { NavBar, SideBar } from '../components';
import { Login, Register, ResetPassword } from './auth';
import { Layout } from '../layout';
import { Overview } from './overview';
import { Home } from './home';

import { GeneralSettings } from './account/generalSettings';
import { NotificationSettings } from './account/notificationSettings';
import { SecuritySettings } from './account/securitySettings';
import { Sprint } from './sprint';
import { DashboardLayout } from '../components/DashboardLayout';
import { SectionHeader } from '../components/SectionHeader';
import BasicModal from '../components/BasicModal';
import { TaskDetails } from '../components/taskDetails/TaskDetails';

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
    path: '/account/general',
    element: <GeneralSettings />,
  },
  {
    path: '/account/notifications',
    element: <NotificationSettings />,
  },
  {
    path: '/account/security',
    element: <SecuritySettings />,
},
  { path: '/sprints',
    element: <Sprint />,},
  {

    path: '/test-layout',
    element: (
      <DashboardLayout
        NavBar={<NavBar />}
        SideBar={<SideBar />}
        Main={
          <>
            <SectionHeader />
            <Overview />
            <BasicModal>
              <TaskDetails />
            </BasicModal>{' '}
          </>
        }
      />
    ),


  },
]);
