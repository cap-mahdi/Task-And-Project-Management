import {
  HomeIcon,
  BellIcon,
  ListBulletIcon,
  ArrowRightStartOnRectangleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

const menuButtons = [
  { text: 'Home', icon: HomeIcon },
  {
    text: 'Dashboard',
    icon: Squares2X2Icon,
  },
  {
    text: 'Notifications',
    icon: BellIcon,
  },
  {
    text: 'My Tasks',
    icon: ListBulletIcon,
  },
  {
    text: 'Logout',
    icon: ArrowRightStartOnRectangleIcon,
  },
];

export default menuButtons;
