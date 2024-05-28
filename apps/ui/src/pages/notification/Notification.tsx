import React from 'react';
import { NotificationItem } from '../../components/notifications';
import { Action, UserRole } from '../../__generated__/graphql';
import { Typography } from '@mui/material';
import useNotificationContext from '../../context/useNotificationsContext';

export function Notification(props) {
  const [{ notifications }, setNotificationState] = useNotificationContext();
  const markAsRead = (id: string) => {
    const clickedNotif = notifications.find((n) => n.id === id);
    if (clickedNotif?.read) return;
    setNotificationState((prev) => ({
      ...prev,
      unreadCount: prev.unreadCount - 1,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  };
  return (
    <>
      <Typography
        sx={{
          py: 2,
          px: 3,
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Notifications
      </Typography>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          notification={notification}
          markAsRead={markAsRead}
          onClose={() => {}}
        />
      ))}
    </>
  );
}
