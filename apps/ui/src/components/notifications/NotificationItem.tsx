import Avatar from '@mui/material/Avatar';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { Chip } from './Chip';
import { useTheme } from '@mui/material/styles';
import { NotificationItemWrapper } from './NotificationItemWrapper';
import PersonIcon from '@mui/icons-material/Person';
import { Action } from '../../__generated__/graphql';
import { useNavigate } from 'react-router-dom';
import { INotification } from './types';

interface NotificationItemProps {
  notification: INotification;
  onClose: () => void;
}

const readNotificationBgColor = 'catskillWhite.main';

const NotificationItem = ({ notification, onClose }: NotificationItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const chipSX = {
    height: 24,
    padding: '0 6px',
  };

  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange,
    backgroundColor: theme.palette.orange,
    marginRight: '5px',
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning,
    backgroundColor: theme.palette.warning,
  };

  const handleNotificationClick = () => {
    console.log('clicked');
    navigate(notification.url);
    onClose();
  };

  return (
    <NotificationItemWrapper
      bgColor={notification.read ? '' : readNotificationBgColor}
      onClick={handleNotificationClick}
    >
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar
            alt={notification.actor.name}
            src={notification?.actor.avatar || <PersonIcon />}
          />
        </ListItemAvatar>
        <ListItemText primary={notification.actor.name} />
        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                {notification.createdAt?.getDate()} 2 min ago
              </Typography>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Grid container direction="column" className="list-container">
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="subtitle2">
            {notification.action === Action.ADD
              ? `${notification.actor.name || ''} added you to ${
                  notification.project?.name || ''
                } project`
              : notification.action === Action.REMOVE
              ? `${notification.actor.name || ''} removed you from ${
                  notification.project?.name || ''
                } project`
              : ''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {!notification.read && (
              <Grid item>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
            )}
            {notification.createdAt &&
              new Date().getTime() -
                new Date(notification.createdAt).getTime() <
                60 * 60 * 1000 && (
                <Grid item>
                  <Chip label="New" sx={chipWarningSX} />
                </Grid>
              )}
          </Grid>
        </Grid>
      </Grid>
    </NotificationItemWrapper>
  );
};

export { NotificationItem };
