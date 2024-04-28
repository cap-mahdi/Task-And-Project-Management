
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

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class CreateWorkspace {
    name: string;
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

export abstract class IQuery {
    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;
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
