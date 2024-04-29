
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

export class CreateUserProject {
    userId: string;
    projectId: string;
    role: ProjectRole;
}

export class UpdateUserProject {
    role?: Nullable<ProjectRole>;
}

export class CreateUserWorkspace {
    userId: string;
    workspaceId: string;
    role: WorkspaceRole;
}

export class UpdateUserWorkspace {
    role?: Nullable<WorkspaceRole>;
}

export class CreateWorkspace {
    name: string;
    description?: Nullable<string>;
}

export class UpdateWorkspace {
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

    abstract tasks(): Task[] | Promise<Task[]>;

    abstract task(id: string): Nullable<Task> | Promise<Nullable<Task>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

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

    abstract createTask(input: CreateTask): Task | Promise<Task>;

    abstract updateTask(id: string, input: UpdateTask): Task | Promise<Task>;

    abstract assignUsersToTask(taskId: string, input: AssignUsersToTask): Task | Promise<Task>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract addUsersToProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;

    abstract deleteUsersFromProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;

    abstract createUserWorkspace(input: CreateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;

    abstract updateUserWorkspace(userId: string, workspaceId: string, input: UpdateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;

    abstract createWorkspace(input: CreateWorkspace): Workspace | Promise<Workspace>;

    abstract updateWorkspace(id: string, input: UpdateWorkspace): Workspace | Promise<Workspace>;
}

export class Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    workspace: Workspace;
    rooms: Room[];
    users: UserProject[];
    milestones: Milestone[];
}

export class Room {
    id: string;
    createdAt: Date;
    project: Project;
    users: User[];
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
    assignees: User[];
}

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: UserRole;
    workspaces: UserWorkspace[];
    projects: UserProject[];
}

export class UserProject {
    user: User;
    project: Project;
    role: ProjectRole;
}

export class UserWorkspace {
    user: User;
    workspace: Workspace;
    role: WorkspaceRole;
}

export class Workspace {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    users: UserWorkspace[];
    projects: Project[];
}

type Nullable<T> = T | null;
