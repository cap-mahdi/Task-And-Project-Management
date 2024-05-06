import React from 'react';
import useWorkspaceContext from '../../context/useWorkspaceContext';

export function WorkspaceProjects({}) {
  const [workspaceState] = useWorkspaceContext();
  console.log('from Workpace', workspaceState);

  return (
    <div>
      <h1>Workspace Projects</h1>
    </div>
  );
}
