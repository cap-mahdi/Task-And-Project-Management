import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import { SxPropsObject } from '../utils/sxPropsObject';
import logo from '/public/logo.png';
import { IoNotificationsOutline } from 'react-icons/io5';
import useAppContext from '../context/useAppContext';
import PersonIcon from '@mui/icons-material/Person';
import { NotificationSection } from './notifications';

export function DashboardNavBar(props) {
  const [globalState] = useAppContext();
  const styles: SxPropsObject = {
    wrapper: {
      flexGrow: 1,
      boxShadow: 'none',
      border: 'none',
    },
    appBar: {
      backgroundColor: '#fff',
      border: 'none',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      width: '100%',

      px: '1rem',
    },
    title: {
      color: (theme) => theme.palette.blackPearl.main,
      flexGrow: 1,
      fontWeight: 'medium',
    },
    sectionButton: {
      color: 'inherit',
      marginRight: '1rem',
    },
    mainButton: {
      //   backgroundColor: (theme) => theme.palette.bismark.main,
      fontWeight: 'bold',
      fontSize: '1rem',
      px: '2rem',
      borderRadius: '0.5rem',
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <AppBar position="static" sx={styles.appBar}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <img src={logo} alt="logo" />
          <Typography variant="h6" component="div" sx={styles.title}>
            TeamFlow
          </Typography>
        </Box>
        <Toolbar
          sx={{
            width: 'fit-content',
            boxShadow: 'none',

            // backgroundColor: (theme) => theme.palette.blackPearl.main,
          }}
        >
          <NotificationSection />
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.acapulco.main,
              width: '2.5rem',
              height: '2.5rem',
              fontSize: '140%',
            }}
            src={globalState.user?.avatar || <PersonIcon />}
          ></Avatar>
        </Toolbar>
      </AppBar>
      <Divider
        sx={{
          backgroundColor: (theme) => theme.palette.gray.main,
          width: '100%',
        }}
      />
    </Box>
  );
}
