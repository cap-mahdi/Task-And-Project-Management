
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

export enum ProjectRole {
    Project_ADMIN = "Project_ADMIN",
    Project_EDITOR = "Project_EDITOR",
    Project_MEMBER = "Project_MEMBER"
}

export enum WorkspaceRole {
    WORKSPACE_ADMIN = "WORKSPACE_ADMIN",
    WORKSPACE_EDITOR = "WORKSPACE_EDITOR",
    WORKSPACE_MEMBER = "WORKSPACE_MEMBER"
}

export interface CreateMilestone {
    name: string;
    description?: Nullable<string>;
    startDate: Date;
    endDate: Date;
    status: Status;
    projectId: string;
}

export interface UpdateMilestone {
    name?: Nullable<string>;
    description?: Nullable<string>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    status?: Nullable<Status>;
}

export interface CreateTask {
    name: string;
    description?: Nullable<string>;
    status: Status;
    tags?: Nullable<string[]>;
    milestoneId: string;
}

export interface UpdateTask {
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<Status>;
    tags?: Nullable<string[]>;
}

export interface AssignUsersToTask {
    userIds: string[];
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface CreateUserProject {
    userId: string;
    projectId: string;
    role: ProjectRole;
}

export interface UpdateUserProject {
    role?: Nullable<ProjectRole>;
}

export interface CreateUserWorkspace {
    userId: string;
    workspaceId: string;
    role: WorkspaceRole;
}

export interface UpdateUserWorkspace {
    role?: Nullable<WorkspaceRole>;
}

export interface CreateWorkspace {
    name: string;
    description?: Nullable<string>;
}

export interface UpdateWorkspace {
    name?: Nullable<string>;
    description?: Nullable<string>;
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

export interface IQuery {
    milestones(): Milestone[] | Promise<Milestone[]>;
    milestone(id: string): Nullable<Milestone> | Promise<Nullable<Milestone>>;
    tasks(): Task[] | Promise<Task[]>;
    task(id: string): Nullable<Task> | Promise<Nullable<Task>>;
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
    getProjectUsers(projectId: string): UserProject[] | Promise<UserProject[]>;
    userProject(userId: string, projectId: string): UserProject | Promise<UserProject>;
    userWorkspaces(): UserWorkspace[] | Promise<UserWorkspace[]>;
    userWorkspace(userId: string, workspaceId: string): Nullable<UserWorkspace> | Promise<Nullable<UserWorkspace>>;
    workspaces(): Workspace[] | Promise<Workspace[]>;
    workspace(id: string): Nullable<Workspace> | Promise<Nullable<Workspace>>;
}

export interface IMutation {
    createMilestone(input: CreateMilestone): Milestone | Promise<Milestone>;
    updateMilestone(id: string, input: UpdateMilestone): Milestone | Promise<Milestone>;
    createTask(input: CreateTask): Task | Promise<Task>;
    updateTask(id: string, input: UpdateTask): Task | Promise<Task>;
    assignUsersToTask(taskId: string, input: AssignUsersToTask): Task | Promise<Task>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    addUsersToProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;
    deleteUsersFromProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;
    createUserWorkspace(input: CreateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;
    updateUserWorkspace(userId: string, workspaceId: string, input: UpdateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;
    createWorkspace(input: CreateWorkspace): Workspace | Promise<Workspace>;
    updateWorkspace(id: string, input: UpdateWorkspace): Workspace | Promise<Workspace>;
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

export interface UserProject {
    user: User;
    project: Project;
    role: ProjectRole;
}

export interface UserRoom {
    user: string;
    room: string;
}

export interface UserTask {
    user: string;
    task: string;
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
