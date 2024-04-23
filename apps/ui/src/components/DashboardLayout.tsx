import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

export function DashboardLayout({ NavBar, SideBar, Main }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters>{NavBar}</Toolbar>
      </AppBar>
      {/* {NavBar} */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {SideBar}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {Main}
        </Box>
      </Box>
    </Box>
  );
}
