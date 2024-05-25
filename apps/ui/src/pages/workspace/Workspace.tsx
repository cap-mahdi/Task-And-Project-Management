import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';
import useWorkspaceContext from '../../context/useWorkspaceContext';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { FetchWorkspaceByIdRequest } from '../../services/workspace/workspaceQueries';

export function Workspace(props: any) {
  const params = useParams();
  console.log('params from workspace', params);
  const [workspaceState, setWorkspaceState] = useWorkspaceContext();

  const [loadWorkspace, workspaceItems] = useCustomLazyQuery(
    FetchWorkspaceByIdRequest(`${params?.workspaceId}`, [
      'id',
      'name',
      'description',
      'projects{ id, name }',
    ]),
    true
  );

  useEffect(() => {
    setWorkspaceState({ data: workspaceItems?.data?.workspace });
  }, [workspaceItems.data]);
  useEffect(() => {
    if (params.workspaceId) {
      console.log('refired');

      loadWorkspace();
    }
  }, [params, loadWorkspace]);
  return (
    <MainLayout
      sectionsData={{
        sectionTitle: workspaceState.data?.name || 'Workspace',
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
