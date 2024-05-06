import {
  HomeIcon,
  BellIcon,
  ListBulletIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const menuButtons = [
  { text: 'Home', icon: HomeIcon, link: '' },
  {
    text: 'Account',
    icon: UserIcon,
    link: 'account/general',
  },
  {
    text: 'Notifications',
    icon: BellIcon,
    link: 'notification',
  },
  {
    text: 'My Tasks',
    icon: ListBulletIcon,
    link: 'task',
  },
  {
    text: 'Logout',
    icon: ArrowRightStartOnRectangleIcon,
    link: '',
    onClick: () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
  },
];
