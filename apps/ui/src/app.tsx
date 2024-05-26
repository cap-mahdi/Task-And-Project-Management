import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { MenuItem, Select } from '@mui/material';
import { WorkspaceRole } from './__generated__/graphql';

export const App = () => {
  return <RouterProvider router={router} />;
};

const workspaceRoleMapper: Record<WorkspaceRole, string> = {
  [WorkspaceRole.WorkspaceAdmin]: 'Admin',
  [WorkspaceRole.WorkspaceEditor]: 'Editor',
  [WorkspaceRole.WorkspaceMember]: 'Viewer',
};
export const Example = () => {
  return (
    <Select>
      {Object.entries(workspaceRoleMapper).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
};
