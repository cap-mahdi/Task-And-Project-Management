import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export function NavBar(props) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: (theme) => theme.palette.blackPearl.main,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: (theme) => theme.palette.blackPearl.main,
          color: 'white',
          width: '75%',
          margin: 'auto',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
            }}
          >
            TeamFlow.io
          </Typography>

          <Button
            color="inherit"
            sx={{
              marginRight: '1rem',
            }}
          >
            Demos
          </Button>
          <Button
            color="inherit"
            sx={{
              marginRight: '1rem',
            }}
          >
            Pages
          </Button>
          <Button
            color="inherit"
            sx={{
              marginRight: '1rem',
            }}
          >
            Support
          </Button>
          <Button
            color="inherit"
            sx={{
              marginRight: '1rem',
            }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            sx={{
              backgroundColor: (theme) => theme.palette.bismark.main,
              fontWeight: 'bold',
              fontSize: '1rem',
              px: '2rem',
              borderRadius: '0.5rem',
            }}
          >
            Start Now
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
