import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import { NotificationItem } from './NotificationItem';

import { INotification } from './types';

interface NotificationListProps {
  notifications: INotification[];
  onClose: () => void;
}

const NotificationList = ({
  notifications,
  onClose,
}: NotificationListProps) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: '100%',
        minWidth: 400,
        maxWidth: 400,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          minWidth: 400,
          maxWidth: 400,
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22,
        },
        '& .MuiDivider-root': {
          my: 0,
        },
        '& .list-container': {
          pl: 7,
        },
      }}
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </List>
  );
};

export { NotificationList };
