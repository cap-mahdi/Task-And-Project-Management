import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import useNotificationContext from '../../context/useNotificationsContext';

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
  const navigate = useNavigate();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [globalState] = useAppContext();
  const [{ unreadCount, notifications }, setNotificationState] =
    useNotificationContext();
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
                            setNotificationState((prev) => ({
                              ...prev,
                              unreadCount: prev.unreadCount - 1,
                              notifications: prev.notifications.map((n) =>
                                n.id === id ? { ...n, read: true } : n
                              ),
                            }));
                          }}
                          notifications={notifications}
                          onClose={() => setOpen(false)}
                        />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button
                      size="small"
                      disableElevation
                      onClick={() => {
                        navigate('/app/notification');
                        setOpen(false);
                      }}
                    >
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
