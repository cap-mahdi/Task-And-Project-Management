import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';
import useWorkspaceContext from '../../context/useWorkspaceContext';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { FetchWorkspaceByIdRequest } from '../../services/workspace/workspaceQueries';
import useAppContext from '../../context/useAppContext';

export function Workspace(props: any) {
  const params = useParams();
  const [workspaceState, setWorkspaceState] = useWorkspaceContext();
  const [globalState, setGlobalState] = useAppContext();

  const [loadWorkspace, workspaceItems] = useCustomLazyQuery(
    FetchWorkspaceByIdRequest(`${params?.workspaceId}`, [
      'id',
      'name',
      'description',
      'projects{ id, name ,description , createdAt }',
    ]),
    false
  );

  useEffect(() => {
    setWorkspaceState({ data: workspaceItems?.data?.workspace });
  }, [workspaceItems.data]);
  useEffect(() => {
    if (params.workspaceId) {
      loadWorkspace();
    }
  }, [params, loadWorkspace, globalState.events['CREATE_PROJECT']]);
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
