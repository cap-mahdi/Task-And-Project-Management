import React, { useEffect } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { Outlet, useParams } from 'react-router-dom';
import useProjectContext from '../../context/useProjectContext';
import { useLazyQuery } from '@apollo/client';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { GET_PROJECT_BY_ID } from '../../services/project/projectQueries';

export function Project() {
  const { projectId } = useParams();
  const [projectState, setProjectState] = useProjectContext();
  const [getProject, project] = useCustomLazyQuery(GET_PROJECT_BY_ID, false);
  console.log('Project ID STATETETETETETETET ', projectState);
  useEffect(() => {
    console.info('Project ID ', projectId);
    getProject({
      variables: { id: projectId },
    }).then((res) => {
      console.log('Project ', res.data.project);
      setProjectState({ project: res.data.project });
    });
  }, [projectId]);

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
