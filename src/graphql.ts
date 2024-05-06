
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

export class CreateMilestone {
    name: string;
    description?: Nullable<string>;
    startDate: Date;
    endDate: Date;
    status: Status;
    projectId: string;
}

export class UpdateMilestone {
    name?: Nullable<string>;
    description?: Nullable<string>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    status?: Nullable<Status>;
}

export class CreateProjectInput {
    name: string;
    description: string;
    workspaceId: string;
}

export class CreateTask {
    name: string;
    description?: Nullable<string>;
    status: Status;
    tags?: Nullable<string[]>;
    milestoneId: string;
}

export class UpdateTask {
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<Status>;
    tags?: Nullable<string[]>;
}

export class AssignUsersToTask {
    userIds: string[];
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class GetUserInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    name?: Nullable<string>;
}

export class CreateUserProject {
    userId: string;
    projectId: string;
    role: ProjectRole;
}

export class UpdateUserProject {
    role?: Nullable<ProjectRole>;
}

export class UpdateUserWorkspace {
    role?: Nullable<WorkspaceRole>;
}

export class CreateWorkspaceInput {
    name: string;
    description?: Nullable<string>;
}

export class UpdateWorkspaceInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class Comment {
    id: string;
    content: string;
    createdAt: Date;
    user: User;
}

export class Message {
    id: string;
    content: string;
    createdAt: Date;
    sender: User;
    room: Room;
}

export class Milestone {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: Status;
    project: Project;
    tasks: Task[];
}

export abstract class IQuery {
    abstract milestones(): Milestone[] | Promise<Milestone[]>;

    abstract milestone(id: string): Nullable<Milestone> | Promise<Nullable<Milestone>>;

    abstract projects(): Nullable<Project[]> | Promise<Nullable<Project[]>>;

    abstract tasks(): Task[] | Promise<Task[]>;

    abstract task(id: string): Nullable<Task> | Promise<Nullable<Task>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract getUsersByParams(input: GetUserInput): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract getConnectedUser(): User | Promise<User>;

    abstract getProjectUsers(projectId: string): UserProject[] | Promise<UserProject[]>;

    abstract userProject(userId: string, projectId: string): UserProject | Promise<UserProject>;

    abstract userWorkspaces(): UserWorkspace[] | Promise<UserWorkspace[]>;

    abstract userWorkspace(userId: string, workspaceId: string): Nullable<UserWorkspace> | Promise<Nullable<UserWorkspace>>;

    abstract workspaces(): Workspace[] | Promise<Workspace[]>;

    abstract workspace(id: string): Nullable<Workspace> | Promise<Nullable<Workspace>>;
}

export abstract class IMutation {
    abstract createMilestone(input: CreateMilestone): Milestone | Promise<Milestone>;

    abstract updateMilestone(id: string, input: UpdateMilestone): Milestone | Promise<Milestone>;

    abstract createProject(input: CreateProjectInput): Project | Promise<Project>;

    abstract createTask(input: CreateTask): Task | Promise<Task>;

    abstract updateTask(id: string, input: UpdateTask): Task | Promise<Task>;

    abstract assignUsersToTask(taskId: string, input: AssignUsersToTask): Task | Promise<Task>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract addUsersToProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;

    abstract deleteUsersFromProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;

    abstract updateUserWorkspace(userId: string, workspaceId: string, input: UpdateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;

    abstract createWorkspace(input: CreateWorkspaceInput): Workspace | Promise<Workspace>;

    abstract updateWorkspace(id: string, input: UpdateWorkspaceInput): Workspace | Promise<Workspace>;
}

export class Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    workspace: Workspace;
    rooms: Room[];
    userProjects: UserProject[];
    milestones: Milestone[];
    creator: User;
}

export class Room {
    id: string;
    createdAt: Date;
    project: Project;
    userRooms: UserRoom[];
    messages: Message[];
}

export class Task {
    id: string;
    name: string;
    description: string;
    status: Status;
    tags: string[];
    milestone: Milestone;
    comments: Comment[];
    userTasks: UserTask[];
}

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: UserRole;
    userWorkspaces: UserWorkspace[];
    userProjects: UserProject[];
    userRooms: UserRoom[];
    userTasks: UserTask[];
    createdWorkspaces: Workspace[];
    createdProjects: Project[];
}

export class UserProject {
    id: string;
    user: User;
    project: Project;
    role: ProjectRole;
    addedAt: Date;
}

export class UserRoom {
    id: string;
    user: User;
    room: Room;
}

export class UserTask {
    id: string;
    user: User;
    task: Task;
}

export class UserWorkspace {
    id: string;
    user: User;
    addedAt: Date;
    workspace: Workspace;
    role: WorkspaceRole;
}

export class Workspace {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    userWorkspaces: UserWorkspace[];
    projects: Project[];
    creator: User;
}

type Nullable<T> = T | null;
