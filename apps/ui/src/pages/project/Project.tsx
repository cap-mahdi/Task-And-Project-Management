import React, { useEffect } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { Outlet, useParams } from 'react-router-dom';
import useProjectContext from '../../context/useProjectContext';

export function Project(props) {
  const params = useParams();
  const [projectState, setProjectState] = useProjectContext();
  console.log('params', params);

  useEffect(() => {
    setProjectState({ data: 'Project Data' });
  }, []);

  return (
    <MainLayout
      sectionsData={{
        sectionTitle: 'Project',
        sections: [
          {
            title: 'Overview',
            link: '',
            enableLink: true,
            onSelected: () => {},
          },
          {
            title: 'Tasks',
            link: 'task',
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
            title: 'Chat',
            link: 'room',
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
