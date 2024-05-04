import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { SxPropsObject } from '../utils/sxPropsObject';
import { title } from 'process';
import { Link } from 'react-router-dom';

const sections = ['Demos', 'Pages', 'Support', 'Contact'];
const name = 'TeamFlow.io';
const mainButton = 'Start Now';

export function NavBar(props) {
  const styles: SxPropsObject = {
    wrapper: {
      flexGrow: 1,
      backgroundColor: (theme) => theme.palette.blackPearl.main,
    },
    appBar: {
      backgroundColor: 'transparent',
      boxShadow: 'none',

      color: 'white',
      width: '75%',
      margin: 'auto',
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bold',
    },
    sectionButton: {
      color: 'inherit',
      marginRight: '1rem',
    },
    mainButton: {
      backgroundColor: (theme) => theme.palette.bismark.main,
      fontWeight: 'bold',
      fontSize: '1rem',
      px: '2rem',
      borderRadius: '0.5rem',
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.title}>
            {name}
          </Typography>

          {sections.map((el) => (
            <Button sx={styles.sectionButton}>{el}</Button>
          ))}

          <Button color="inherit" sx={styles.mainButton}>
            <Link
              to={'/login'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {mainButton}
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
