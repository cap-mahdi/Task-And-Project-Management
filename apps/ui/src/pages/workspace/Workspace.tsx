import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';
import useWorkspaceContext from '../../context/useWorkspaceContext';

export function Workspace(props) {
  const [workspaceState, setWorkspaceState] = useWorkspaceContext();
  useEffect(() => {
    setWorkspaceState({ data: 'Workspace Data' });
  }, []);
  return (
    <MainLayout
      sectionsData={{
        sectionTitle: 'Workspace',
        sections: [
          {
            title: 'Projects',
            link: '',
            enableLink: true,
            onSelected: () => {},
          },
          {
            title: 'Team',
            link: 'team',
            enableLink: true,
            onSelected: () => {},
          },
          {
            title: 'Settings',
            link: 'settings',
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
