import React, { useEffect } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { Outlet, useParams } from 'react-router-dom';
import useSprintContext from '../../context/useSprintContext';

export function Sprint(props) {
  const params = useParams();
  const [sprintState, setSprintState] = useSprintContext();
  console.log('params', params);

  useEffect(() => {
    setSprintState({ data: 'Sprint Data' });
  }, []);

  return (
    <MainLayout
      sectionsData={{
        sectionTitle: 'Sprint',
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
