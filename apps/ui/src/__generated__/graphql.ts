/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AssignUsersToTask = {
  userIds: Array<Scalars['ID']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type CreateMilestone = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['Date']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
  status: Status;
};

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type CreateTask = {
  description?: InputMaybe<Scalars['String']['input']>;
  milestoneId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  status: Status;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserProject = {
  projectId: Scalars['ID']['input'];
  role: ProjectRole;
  userId: Scalars['ID']['input'];
};

export type CreateWorkspaceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type GetUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  room: Room;
  sender: User;
};

export type Milestone = {
  __typename?: 'Milestone';
  description: Scalars['String']['output'];
  endDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  project: Project;
  startDate: Scalars['Date']['output'];
  status: Status;
  tasks: Array<Task>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsersToProject: Array<UserProject>;
  assignUsersToTask: Task;
  createMilestone: Milestone;
  createProject: Project;
  createTask: Task;
  createUser: User;
  createWorkspace: Workspace;
  deleteUsersFromProject: Array<UserProject>;
  updateMilestone: Milestone;
  updateTask: Task;
  updateUserWorkspace: UserWorkspace;
  updateWorkspace: Workspace;
};


export type MutationAddUsersToProjectArgs = {
  projectId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationAssignUsersToTaskArgs = {
  input: AssignUsersToTask;
  taskId: Scalars['ID']['input'];
};


export type MutationCreateMilestoneArgs = {
  input: CreateMilestone;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTask;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationDeleteUsersFromProjectArgs = {
  projectId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateMilestoneArgs = {
  id: Scalars['ID']['input'];
  input: UpdateMilestone;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTask;
};


export type MutationUpdateUserWorkspaceArgs = {
  input: UpdateUserWorkspace;
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWorkspaceInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  milestones: Array<Milestone>;
  name: Scalars['String']['output'];
  rooms: Array<Room>;
  userProjects: Array<UserProject>;
  workspace: Workspace;
};

export enum ProjectRole {
  ProjectAdmin = 'Project_ADMIN',
  ProjectEditor = 'Project_EDITOR',
  ProjectMember = 'Project_MEMBER'
}

export type Query = {
  __typename?: 'Query';
  getConnectedUser: User;
  getProjectUsers: Array<UserProject>;
  getUsersByParams?: Maybe<Array<User>>;
  milestone?: Maybe<Milestone>;
  milestones: Array<Milestone>;
  projects?: Maybe<Array<Project>>;
  task?: Maybe<Task>;
  tasks: Array<Task>;
  userProject: UserProject;
  userWorkspace?: Maybe<UserWorkspace>;
  userWorkspaces: Array<UserWorkspace>;
  users?: Maybe<Array<User>>;
  workspace?: Maybe<Workspace>;
  workspaces: Array<Workspace>;
};


export type QueryGetProjectUsersArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetUsersByParamsArgs = {
  input: GetUserInput;
};


export type QueryMilestoneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserProjectArgs = {
  projectId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryUserWorkspaceArgs = {
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryWorkspaceArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  project: Project;
  userRooms: Array<UserRoom>;
};

export enum Status {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export type Task = {
  __typename?: 'Task';
  comments: Array<Comment>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  milestone: Milestone;
  name: Scalars['String']['output'];
  status: Status;
  tags: Array<Scalars['String']['output']>;
  userTasks: Array<UserTask>;
};

export type UpdateMilestone = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Status>;
};

export type UpdateTask = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserProject = {
  role?: InputMaybe<ProjectRole>;
};

export type UpdateUserWorkspace = {
  role?: InputMaybe<WorkspaceRole>;
};

export type UpdateWorkspaceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: UserRole;
  userProjects: Array<UserProject>;
  userRooms: Array<UserRoom>;
  userTasks: Array<UserTask>;
  userWorkspaces: Array<UserWorkspace>;
};

export type UserProject = {
  __typename?: 'UserProject';
  addedAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  project: Project;
  role: ProjectRole;
  user: User;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserRoom = {
  __typename?: 'UserRoom';
  id: Scalars['ID']['output'];
  room: Room;
  user: User;
};

export type UserTask = {
  __typename?: 'UserTask';
  id: Scalars['ID']['output'];
  task: Task;
  user: User;
};

export type UserWorkspace = {
  __typename?: 'UserWorkspace';
  addedAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  role: WorkspaceRole;
  user: User;
  workspace: Workspace;
};

export type Workspace = {
  __typename?: 'Workspace';
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projects: Array<Project>;
  userWorkspaces: Array<UserWorkspace>;
};

export enum WorkspaceRole {
  WorkspaceAdmin = 'WORKSPACE_ADMIN',
  WorkspaceEditor = 'WORKSPACE_EDITOR',
  WorkspaceMember = 'WORKSPACE_MEMBER'
}
