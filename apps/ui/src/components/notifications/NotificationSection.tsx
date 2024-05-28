import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonBase from '@mui/material/ButtonBase';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MainCard } from './MainCard';
import { Transitions } from './Transition';
import { NotificationList } from './NotificationList';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Badge } from '@mui/material';
import {
  Action,
  ProjectNotification,
  UserRole,
  WorkspaceNotification,
} from '../../__generated__/graphql';
import { EntityType, INotification } from './types';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { GET_NOTIFICATIONS } from '../../services/notifications/notificationsQueries';
import useAppContext from '../../context/useAppContext';
import { set } from 'react-hook-form';

const status = [
  {
    value: 'all',
    label: 'All Notification',
  },
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'unread',
    label: 'Unread',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const [getNotifications] = useCustomLazyQuery(GET_NOTIFICATIONS, false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [globalState] = useAppContext();

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };

  useEffect(() => {
    getNotifications().then((res) => {
      console.log('notifications ', res);
      const notifsNotifications = res?.data?.workspaceNotifications;
      const projectNotifications = res?.data?.projectNotifications;
      const notifs: INotification[] = [
        ...projectNotifications.map((notif: ProjectNotification) => ({
          ...notif,
          type: 'project',
          url: `/workspace/${notif.project.workspace.id}/project/${notif.project.id}`,
          entity: notif.project,
        })),
        ...notifsNotifications.map((notif: WorkspaceNotification) => ({
          ...notif,
          type: 'workspace',
          url: `/workspace/${notif.workspace.id}`,
          entity: notif.workspace,
        })),
      ];

      //sort based on createdAt
      notifs.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      const unreadCount = notifs.reduce(
        (acc, curr) => (curr.read ? acc : acc + 1),
        0
      );
      setUnreadCount(unreadCount);

      setNotifications(notifs);
      console.log('notifications after sort  ', notifs);
    });
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3000/api/notif/sse?token=${globalState.token}`
    );
    eventSource.onopen = () => {
      console.log('EventSource connected');
    };

    eventSource.addEventListener('project-notification', (event) => {
      setUnreadCount((prev) => prev + 1);
      const data: ProjectNotification = JSON.parse(event.data);
      console.log('project notification', data);
      setNotifications((prev) => [
        {
          ...data,
          type: EntityType.PROJECT,
          url: `/workspace/${data.project.workspace.id}/project/${data.project.id}`,
          entity: data.project,
        },
        ...prev,
      ]);
    });

    eventSource.addEventListener('workspace-notification', (event) => {
      setUnreadCount((prev) => prev + 1);
      const data: WorkspaceNotification = JSON.parse(event.data);
      setNotifications((prev) => [
        {
          ...data,
          type: EntityType.WORKSPACE,
          url: `/workspace/${data.workspace.id}`,
          entity: data.workspace,
        },
        ...prev,
      ]);
    });

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              transition: 'all .2s ease-in-out',
              width: '70px',
              height: '50px',
              backgroundColor: 'white',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Badge badgeContent={unreadCount} color="error">
              <IoNotificationsOutline
                style={{
                  color: '#000',
                  fontSize: '1.5rem',
                  marginRight: '0.8rem',
                }}
              />
            </Badge>
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? 'top' : 'top-right'}
            in={open}
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ pt: 2, px: 2 }}
                      >
                        <Grid item>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="subtitle1">
                              All Notification
                            </Typography>
                            <Chip
                              size="small"
                              label={unreadCount}
                              sx={{
                                color: theme.palette.background.default,
                                bgcolor: theme.palette.warning.dark,
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Typography
                            component={Link}
                            to="#"
                            variant="subtitle2"
                            color="primary"
                          >
                            Mark as all read
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <PerfectScrollbar
                        style={{
                          height: '100%',
                          maxHeight: 'calc(100vh - 205px)',
                          overflowX: 'hidden',
                        }}
                      >
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12}>
                            <Box sx={{ px: 2, pt: 0.25 }}>
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                value={value}
                                onChange={handleChange}
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                {status.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Box>
                          </Grid>
                          <Grid item xs={12} p={0}>
                            <Divider sx={{ my: 0 }} />
                          </Grid>
                        </Grid>
                        <NotificationList
                          markAsRead={(id: string) => {
                            const clickedNotif = notifications.find(
                              (n) => n.id === id
                            );
                            if (clickedNotif?.read) return;
                            setUnreadCount((prev) => prev - 1);
                            setNotifications((prev) =>
                              prev.map((n) =>
                                n.id === id ? { ...n, read: true } : n
                              )
                            );
                          }}
                          notifications={notifications}
                          onClose={() => setOpen(false)}
                        />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="small" disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export { NotificationSection };
