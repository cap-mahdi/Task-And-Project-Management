import { Account } from '../pages/account/Account';
import { GeneralSettings } from '../pages/account/generalSettings';
import { NotificationSettings } from '../pages/account/notificationSettings';
import { SecuritySettings } from '../pages/account/securitySettings';

export const accountRoutes = {
  path: 'account',
  element: <Account />,
  children: [
    { index: true, path: 'general', element: <GeneralSettings /> },
    { path: 'notifications', element: <NotificationSettings /> },
    {
      path: 'security',
      element: <SecuritySettings />,
    },
  ],
};
