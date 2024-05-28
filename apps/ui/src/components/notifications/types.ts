import { ProjectNotification, WorkspaceNotification } from "../../__generated__/graphql";


export interface TypedProjectNotification extends ProjectNotification {
  type: 'project';
  url: string;
}

export interface TypedWorkspaceNotification extends WorkspaceNotification {
  type: 'workspace';
  url: string;
}

export type INotification = TypedProjectNotification | TypedWorkspaceNotification;
