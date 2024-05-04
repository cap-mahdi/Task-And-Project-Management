import {
  HomeIcon,
  BellIcon,
  ListBulletIcon,
  ArrowRightStartOnRectangleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { link } from 'fs';

export const menuButtons = [
  { text: 'Home', icon: HomeIcon, link: '' },
  {
    text: 'Dashboard',
    icon: Squares2X2Icon,
    link: 'sprints',
  },
  {
    text: 'Notifications',
    icon: BellIcon,
    link: 'chat',
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
