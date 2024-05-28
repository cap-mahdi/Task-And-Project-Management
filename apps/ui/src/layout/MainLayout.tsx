import { Box } from '@mui/material';
import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Outlet, useLocation } from 'react-router-dom';
const data = {
  sectionTitle: 'Workspace',
  sections: [
    {
      title: 'Overview',
      link: '/app',
      enableLink: true,
      onSelected: () => {},
    },
    {
      title: 'Chat',
      link: '/app/chat',
      enableLink: true,
      onSelected: () => {},
    },
    {
      title: 'Tasks',
      link: '/app/tasks',
      enableLink: true,
      onSelected: () => {},
    },
    {
      title: 'Sprint',
      link: '/app/sprint',
      enableLink: false,
      onSelected: () => {},
    },
    {
      title: 'Account',
      link: '/app/account',
      enableLink: true,
      onSelected: () => {},
    },
  ],
};

export function MainLayout({ children, sectionsData = data }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');

  const currentSection = pathParts[pathParts.length - 1];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'space-between',
      }}
    >
      <SectionHeader data={sectionsData} currentSection={currentSection} />

      <div
        style={{
          marginTop: '7.5rem',
        }}
      >
        {children}
      </div>
    </Box>
  );
}
