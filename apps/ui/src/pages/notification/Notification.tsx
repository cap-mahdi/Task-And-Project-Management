import React from 'react';
import { NotificationItem } from '../../components/notifications';
import { Action, UserRole } from '../../__generated__/graphql';
import { Box, Typography } from '@mui/material';

const notif = {
  url: 'workspace/d3d4e0c3-b105-4f81-ac2d-0c053d09458c/project/15b2f276-5cf9-47d0-900b-9596ca59a4ae',
  type: 'project',
  id: '1',
  actor: {
    id: '1',
    name: 'John Doe',
    email: 'john@gmail.com',
    avatar: 'https://i.pravatar.cc/300',
    password: 'password',
    createdAt: new Date(),
    role: UserRole.ADMIN,
    userWorkspaces: [],
    userProjects: [],
    userRooms: [],
    userTasks: [],
    createdWorkspaces: [],
    createdProjects: [],
  },
  recipient: {
    id: '1',
    name: 'John Doe',
    email: 'john@gmail.com',
    avatar: 'https://i.pravatar.cc/300',
    password: 'password',
    createdAt: new Date(),
    role: UserRole.ADMIN,
    userWorkspaces: [],
    userProjects: [],
    userRooms: [],
    userTasks: [],
    createdWorkspaces: [],
    createdProjects: [],
  },
  createdAt: new Date(),
  project: {
    rooms: [],
    userProjects: [],
    milestones: [],
    id: '1',
    name: 'Project 1',
    description: 'Project 1 description',
    workspace: {
      id: '1',
      name: 'Workspace 1',
      description: 'Workspace 1 description',
      createdAt: new Date(),
      userWorkspaces: [],
      projects: [],
      creator: {
        id: '1',
        name: 'John Doe',
        email: 'john@gmail.com',
        avatar: 'https://i.pravatar.cc/300',
        password: 'password',
        createdAt: new Date(),
        role: UserRole.ADMIN,
        userWorkspaces: [],
        userProjects: [],
        userRooms: [],
        userTasks: [],
        createdWorkspaces: [],
        createdProjects: [],
      },
    },
    createdAt: new Date(),
    creator: {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
      avatar: 'https://i.pravatar.cc/300',
      password: 'password',
      createdAt: new Date(),
      role: UserRole.ADMIN,
      userWorkspaces: [],
      userProjects: [],
      userRooms: [],
      userTasks: [],
      createdWorkspaces: [],
      createdProjects: [],
    },
  },
  action: Action.REMOVE,
  read: true,
};

export function Notification(props) {
  return (
    <>
      <Typography
        sx={{
          py: 2,
          px: 3,
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Notifications
      </Typography>
      <NotificationItem notification={notif} />
      <NotificationItem notification={notif} />
      <NotificationItem notification={notif} />
      <NotificationItem notification={notif} />
    </>
  );
}
