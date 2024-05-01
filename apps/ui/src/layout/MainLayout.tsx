import { Box } from '@mui/material';
import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Outlet } from 'react-router-dom';

export function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'space-between',
      }}
    >
      <SectionHeader />

      <div
        style={{
          marginTop: '7.5rem',
        }}
      >
        <Outlet />
      </div>
    </Box>
  );
}
