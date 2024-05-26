import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';

export function Account() {
  return (
    <MainLayout
      sectionsData={{
        sectionTitle: 'Account Settings',
        sections: [
          {
            title: 'General',
            link: 'general',
            enableLink: true,
            onSelected: () => {},
          },
          {
            title: 'Notifications',
            link: 'notifications',
            enableLink: true,
            onSelected: () => {},
          },
          {
            title: 'Security',
            link: 'security',
            enableLink: true,
            onSelected: () => {},
          },
        ],
      }}
    >
      <Outlet />
    </MainLayout>
  );
}
