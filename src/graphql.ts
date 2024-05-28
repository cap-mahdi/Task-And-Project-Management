
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

export enum Action {
    ADD = "ADD",
    REMOVE = "REMOVE"
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

export class CreateCommentInput {
    content: string;
    taskId: string;
}

export class EditCommentInput {
    content?: Nullable<string>;
}

export class CreateMilestone {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
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
    description: string;
    status: Status;
    tags: string[];
    assignees: string[];
}

export class UpdateTask {
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<Status>;
    tags?: Nullable<string[]>;
    assignees?: Nullable<string[]>;
}

export class TaskFilter {
    projectId?: Nullable<string>;
    milestoneId?: Nullable<string>;
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

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
}

export class ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export class CreateUserProject {
    userId: string;
    projectId: string;
    role: ProjectRole;
}

export class UpdateUserProject {
    role?: Nullable<ProjectRole>;
}

export class EmailRoleProjectInput {
    email: string;
    role: string;
}

export class AddUserProjectInput {
    projectId: string;
    emailRoles: EmailRoleProjectInput[];
}

export class EmailRoleInput {
    email: string;
    role: string;
}

export class UpdateUserWorkspace {
    role?: Nullable<WorkspaceRole>;
}

export class AddUserWorkspaceInput {
    workspaceId: string;
    emailRoles: EmailRoleInput[];
}

export class CreateWorkspaceInput {
    name: string;
    description?: Nullable<string>;
}

export class UpdateWorkspaceInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class ProjectNotification {
    id: string;
    actor: User;
    recipient: User;
    createdAt: Date;
    project: Project;
    action: Action;
    read: boolean;
}

export class WorkspaceNotification {
    id: string;
    actor: User;
    recipient: User;
    createdAt: Date;
    Workspace: Workspace;
    action: Action;
    read: boolean;
}

export class Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    task: Task;
}

export abstract class IQuery {
    abstract comments(taskId: string): Comment[] | Promise<Comment[]>;

    abstract messages(roomId: string): Message[] | Promise<Message[]>;

    abstract milestones(projectId: string): Milestone[] | Promise<Milestone[]>;

    abstract milestone(id: string): Nullable<Milestone> | Promise<Nullable<Milestone>>;

    abstract projects(): Nullable<Project[]> | Promise<Nullable<Project[]>>;

    abstract project(id: string): Project | Promise<Project>;

    abstract getWorkspaceMembersNotInProject(projectId: string): User[] | Promise<User[]>;

    abstract room(id: string): Nullable<Room> | Promise<Nullable<Room>>;

    abstract tasks(filter?: Nullable<TaskFilter>): Task[] | Promise<Task[]>;

    abstract task(id: string): Task | Promise<Task>;

    abstract users(): User[] | Promise<User[]>;

    abstract getUsersByParams(input: GetUserInput): User[] | Promise<User[]>;

    abstract getConnectedUser(): User | Promise<User>;

    abstract getProjectUsers(projectId: string): UserProject[] | Promise<UserProject[]>;

    abstract userProject(userId: string, projectId: string): UserProject | Promise<UserProject>;

    abstract getUserRoomsByUserIdAndProjectId(projectId: string): Nullable<Room[]> | Promise<Nullable<Room[]>>;

    abstract getWorkspaceUsers(workspaceId: string): UserWorkspace[] | Promise<UserWorkspace[]>;

    abstract userWorkspaces(): UserWorkspace[] | Promise<UserWorkspace[]>;

    abstract userWorkspace(userId: string, workspaceId: string): Nullable<UserWorkspace> | Promise<Nullable<UserWorkspace>>;

    abstract workspaces(): Workspace[] | Promise<Workspace[]>;

    abstract workspace(id: string): Nullable<Workspace> | Promise<Nullable<Workspace>>;
}

export abstract class IMutation {
    abstract createComment(input: CreateCommentInput): Comment | Promise<Comment>;

    abstract deleteComment(id: string): Comment | Promise<Comment>;

    abstract editComment(id: string, input: EditCommentInput): Comment | Promise<Comment>;

    abstract createMilestone(input: CreateMilestone, projectId: string): Milestone | Promise<Milestone>;

    abstract updateMilestone(id: string, input: UpdateMilestone): Milestone | Promise<Milestone>;

    abstract deleteMilestone(id: string): Milestone | Promise<Milestone>;

    abstract createProject(input: CreateProjectInput): Project | Promise<Project>;

    abstract createRoom(projectId: string, name: string, members: string[]): Room | Promise<Room>;

    abstract createTask(input: CreateTask, milestoneId: string): Task | Promise<Task>;

    abstract updateTask(id: string, input: UpdateTask): Task | Promise<Task>;

    abstract deleteTask(id: string): boolean | Promise<boolean>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(input: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(): User | Promise<User>;

    abstract changePassword(input: ChangePasswordInput): User | Promise<User>;

    abstract changeUserAvatar(file: Upload): User | Promise<User>;

    abstract addUsersToProject(input: AddUserProjectInput): UserProject[] | Promise<UserProject[]>;

    abstract deleteUsersFromProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;

    abstract addUserToRoom(userId: string[], roomId: string): Nullable<UserRoom[]> | Promise<Nullable<UserRoom[]>>;

    abstract updateUserWorkspace(userId: string, workspaceId: string, input: UpdateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;

    abstract addUsersToWorkspace(input: AddUserWorkspaceInput): UserWorkspace[] | Promise<UserWorkspace[]>;

    abstract createWorkspace(input: CreateWorkspaceInput): Workspace | Promise<Workspace>;

    abstract updateWorkspace(id: string, input: UpdateWorkspaceInput): Workspace | Promise<Workspace>;
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
    userProjects: UserProject[];
    milestones: Milestone[];
    creator: User;
}

export class Room {
    id: string;
    createdAt: Date;
    name: string;
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
    creator: User;
    createdAt: Date;
}

export class User {
    id: string;
    name: string;
    email: string;
    phone?: Nullable<string>;
    password: string;
    avatar?: Nullable<string>;
    createdAt: Date;
    role: UserRole;
    userWorkspaces: UserWorkspace[];
    userProjects: UserProject[];
    userRooms: UserRoom[];
    userTasks: UserTask[];
    createdWorkspaces: Workspace[];
    createdProjects: Project[];
}

export class File {
    filename: string;
    mimetype: string;
    encoding: string;
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

export type Upload = any;
type Nullable<T> = T | null;
