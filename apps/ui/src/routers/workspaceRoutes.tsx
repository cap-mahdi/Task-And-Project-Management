import { Outlet } from 'react-router-dom';
import { WorkspaceProvider } from '../context/useWorkspaceContext';
import { Workspace } from '../pages/workspace/Workspace';
import { WorkspaceProjects } from '../pages/workspace/WorkspaceProjects';
import { ProjectProvider } from '../context/useProjectContext';
import { Project } from '../pages/project/Project';
import { Chat } from '../pages/chat/chat';
import { Sprints } from '../pages/sprint';
import { AddUserToWorkspace } from '../components/AddUserToWorkspace';
import { SprintProvider } from '../context/useSprintContext';
import { Sprint } from '../pages/sprint/Sprint';
import { Tasks } from '../pages/tasks/Tasks';
import { ProjectTasks } from '../pages/tasks/ProjectTasks';
import { SprintTasks } from '../pages/tasks/SprintTasks';

export const workspaceRoutes = {
  path: 'workspace/:workspaceId',
  element: <Outlet />,
  children: [
    {
      path: '',
      element: (
        <WorkspaceProvider>
          <Workspace />
        </WorkspaceProvider>
      ),
      children: [
        {
          path: '',
          element: <WorkspaceProjects />,
        },
        {
          path: 'team',
          element: <AddUserToWorkspace />,
        },
        {
          path: 'settings',
          element: <div>Settings in here</div>,
        },
      ],
    },
    {
      path: 'project/:projectId',
      element: (
        <ProjectProvider>
          <Project />
        </ProjectProvider>
      ),
      children: [
        {
          path: '',
          element: <Sprints />,
        },
        {
          path: 'task',
          element: <ProjectTasks />,
        },
        {
          path: 'team',
          element: <div>Project Team here</div>,
        },
        {
          path: 'settings',
          element: <div>Project Settings</div>,
        },
        {
          path: 'room',
          element: <Chat />,
        },
      ],
    },
    {
      path: 'project/:projectId/sprint/:sprintId',
      element: (
        <SprintProvider>
          <Sprint />
        </SprintProvider>
      ),
      children: [
        {
          path: '',
          element: <div> Sprint here</div>,
        },
        {
          path: 'task',
          element: <SprintTasks />,
        },
        {
          path: 'settings',
          element: <div>Settings in sprint</div>,
        },
      ],
    },
  ],
};
