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
import { EntityType, INotification } from './types';
import { dateToAgo } from '../../utils/dateToAgoHelper';
import { useCustomMutation } from '../../hooks/useCustomMutation';
import {
  READ_PROJECT_NOTIF,
  READ_WORKSPACE_NOTIF,
} from '../../services/notifications/notificationsMutations';
import { set } from 'react-hook-form';

interface NotificationItemProps {
  notification: INotification;
  onClose: () => void;
  markAsRead: (id: string) => void;
}

const readNotificationBgColor = 'catskillWhite.main';

export const actionMapper: Record<Action, string> = {
  [Action.Add]: 'added you to',
  [Action.Remove]: 'removed you from',
};

export const entityMapper: Record<EntityType, string> = {
  [EntityType.PROJECT]: 'project',
  [EntityType.WORKSPACE]: 'workspace',
};
const NotificationItem = ({
  notification,
  onClose,
  markAsRead,
}: NotificationItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [readProjectNotif] = useCustomMutation(READ_PROJECT_NOTIF, false);
  const [readWorkspaceNotif] = useCustomMutation(READ_WORKSPACE_NOTIF, false);

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
    if (notification.type === EntityType.PROJECT) {
      readProjectNotif({ variables: { id: notification.id } });
    } else if (notification.type === EntityType.WORKSPACE) {
      readWorkspaceNotif({ variables: { id: notification.id } });
    }
    console.log('clicked');
    navigate(`/app${notification.url}`);
    markAsRead(notification.id);
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
                {dateToAgo(notification.createdAt)}
              </Typography>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Grid container direction="column" className="list-container">
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="subtitle2">
            {notification.actor.name} {actionMapper[notification.action]}{' '}
            {entityMapper[notification.type]}{' '}
            <Typography variant="subtitle2" component="span" color="primary">
              {notification.entity.name}
            </Typography>
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
