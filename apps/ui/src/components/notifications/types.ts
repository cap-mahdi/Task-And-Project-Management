import {
  Project,
  ProjectNotification,
  Workspace,
  WorkspaceNotification,
} from '../../__generated__/graphql';

export enum EntityType {
  PROJECT = 'project',
  WORKSPACE = 'workspace',
}
export interface TypedProjectNotification
  extends Omit<ProjectNotification, 'project'> {
  type: EntityType.PROJECT;
  url: string;
  entity: Project;
}

export interface TypedWorkspaceNotification
  extends Omit<WorkspaceNotification, 'workspace'> {
  type: EntityType.WORKSPACE;
  url: string;
  entity: Workspace;
}

export type INotification =
  | TypedProjectNotification
  | TypedWorkspaceNotification;
