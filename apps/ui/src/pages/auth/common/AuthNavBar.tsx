import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { title } from 'process';
import { SxPropsObject } from '../../../utils/sxPropsObject';

const sections = ['Demos', 'Pages', 'Support', 'Contact'];
const name = 'TeamFlow.io';
const mainButton = 'Start Now';

export function AuthNavBar(props) {
  const styles: SxPropsObject = {
    wrapper: {
      backgroundColor: (theme) => theme.palette.acapulco.main,
    },
    appBar: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      color: (theme) => theme.palette.blackPearl.main,
      width: '75%',
      margin: 'auto',
    },

    tollbar: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    title: {
      fontWeight: 'bold',
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.tollbar}>
          <Typography variant="h6" sx={styles.title}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
