import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  NavBar: React.ReactNode;
  SideBar: React.ReactNode;
}
export function DashboardLayout({ NavBar, SideBar }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          border: 'none',
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {NavBar}
      </AppBar>
      {/* {NavBar} */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {SideBar}

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
