/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ProjectRole {
  Project_ADMIN = 'Project_ADMIN',
  Project_EDITOR = 'Project_EDITOR',
  Project_MEMBER = 'Project_MEMBER',
}

export enum WorkspaceRole {
  WORKSPACE_ADMIN = 'WORKSPACE_ADMIN',
  WORKSPACE_EDITOR = 'WORKSPACE_EDITOR',
  WORKSPACE_MEMBER = 'WORKSPACE_MEMBER',
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateWorkspace {
  name: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: User;
}

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: User;
  room: Room;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: Status;
  project: Project;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  workspace: Workspace;
  rooms: Room[];
  users: UserProject[];
  milestones: Milestone[];
}

export interface Room {
  id: string;
  createdAt: Date;
  project: Project;
  users: User[];
  messages: Message[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: Status;
  tags: string[];
  milestone: Milestone;
  comments: Comment[];
  assignees: User[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  role: UserRole;
  workspaces: UserWorkspace[];
  projects: UserProject[];
}

export interface IQuery {
  users(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

export interface IMutation {
  createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

export interface UserProject {
  user: User;
  project: Project;
  role: ProjectRole;
}

export interface UserWorkspace {
  user: User;
  workspace: Workspace;
  role: WorkspaceRole;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  users: UserWorkspace[];
  projects: Project[];
}

type Nullable<T> = T | null;
