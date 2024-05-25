import React, { useEffect } from 'react';
import useWorkspaceContext from '../../context/useWorkspaceContext';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { FetchWorkspaceByIdRequest } from '../../services/workspace/workspaceQueries';
import { useParams } from 'react-router-dom';
import { AddProject } from '../../components/AddProject';

export function WorkspaceProjects({}) {
  const [workspaceState] = useWorkspaceContext();
  console.log('from project', workspaceState);

  return (
    <div>
      <AddProject />
      {workspaceState.data?.projects?.map((project: any) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
