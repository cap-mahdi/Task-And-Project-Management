
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

export interface CreateCommentInput {
    content: string;
    taskId: string;
}

export interface EditCommentInput {
    content?: Nullable<string>;
}

export interface CreateMilestone {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface UpdateMilestone {
    name?: Nullable<string>;
    description?: Nullable<string>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    status?: Nullable<Status>;
}

export interface CreateProjectInput {
    name: string;
    description: string;
    workspaceId: string;
}

export interface CreateTask {
    name: string;
    description: string;
    status: Status;
    tags: string[];
    assignees: string[];
}

export interface UpdateTask {
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<Status>;
    tags?: Nullable<string[]>;
    assignees?: Nullable<string[]>;
}

export interface TaskFilter {
    projectId?: Nullable<string>;
    milestoneId?: Nullable<string>;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface GetUserInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    name?: Nullable<string>;
}

export interface UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
}

export interface ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface CreateUserProject {
    userId: string;
    projectId: string;
    role: ProjectRole;
}

export interface UpdateUserProject {
    role?: Nullable<ProjectRole>;
}

export interface EmailRoleInput {
    email: string;
    role: string;
}

export interface UpdateUserWorkspace {
    role?: Nullable<WorkspaceRole>;
}

export interface AddUserWorkspaceInput {
    workspaceId: string;
    emailRoles: EmailRoleInput[];
}

export interface CreateWorkspaceInput {
    name: string;
    description?: Nullable<string>;
}

export interface UpdateWorkspaceInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    task: Task;
}

export interface IQuery {
    comments(taskId: string): Comment[] | Promise<Comment[]>;
    milestones(projectId: string): Milestone[] | Promise<Milestone[]>;
    milestone(id: string): Nullable<Milestone> | Promise<Nullable<Milestone>>;
    projects(): Nullable<Project[]> | Promise<Nullable<Project[]>>;
    project(id: string): Project | Promise<Project>;
    tasks(filter?: Nullable<TaskFilter>): Task[] | Promise<Task[]>;
    task(id: string): Task | Promise<Task>;
    users(): User[] | Promise<User[]>;
    getUsersByParams(input: GetUserInput): User[] | Promise<User[]>;
    getConnectedUser(): User | Promise<User>;
    getProjectUsers(projectId: string): UserProject[] | Promise<UserProject[]>;
    userProject(userId: string, projectId: string): UserProject | Promise<UserProject>;
    userWorkspaces(): UserWorkspace[] | Promise<UserWorkspace[]>;
    userWorkspace(userId: string, workspaceId: string): Nullable<UserWorkspace> | Promise<Nullable<UserWorkspace>>;
    workspaces(): Workspace[] | Promise<Workspace[]>;
    workspace(id: string): Nullable<Workspace> | Promise<Nullable<Workspace>>;
}

export interface IMutation {
    createComment(input: CreateCommentInput): Comment | Promise<Comment>;
    deleteComment(id: string): Comment | Promise<Comment>;
    editComment(id: string, input: EditCommentInput): Comment | Promise<Comment>;
    createMilestone(input: CreateMilestone, projectId: string): Milestone | Promise<Milestone>;
    updateMilestone(id: string, input: UpdateMilestone): Milestone | Promise<Milestone>;
    deleteMilestone(id: string): Milestone | Promise<Milestone>;
    createProject(input: CreateProjectInput): Project | Promise<Project>;
    createRoom(projectId: string): Room | Promise<Room>;
    createTask(input: CreateTask, milestoneId: string): Task | Promise<Task>;
    updateTask(id: string, input: UpdateTask): Task | Promise<Task>;
    deleteTask(id: string): boolean | Promise<boolean>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(input: UpdateUserInput): User | Promise<User>;
    deleteUser(): User | Promise<User>;
    changePassword(input: ChangePasswordInput): User | Promise<User>;
    changeUserAvatar(file: Upload): User | Promise<User>;
    addUsersToProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;
    deleteUsersFromProject(projectId: string, userIds: string[]): UserProject[] | Promise<UserProject[]>;
    addUserToRoom(userId: string[], roomId: string): Nullable<UserRoom[]> | Promise<Nullable<UserRoom[]>>;
    updateUserWorkspace(userId: string, workspaceId: string, input: UpdateUserWorkspace): UserWorkspace | Promise<UserWorkspace>;
    addUsersToWorkspace(input: AddUserWorkspaceInput): UserWorkspace[] | Promise<UserWorkspace[]>;
    createWorkspace(input: CreateWorkspaceInput): Workspace | Promise<Workspace>;
    updateWorkspace(id: string, input: UpdateWorkspaceInput): Workspace | Promise<Workspace>;
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
    userProjects: UserProject[];
    milestones: Milestone[];
    creator: User;
}

export interface Room {
    id: string;
    createdAt: Date;
    project: Project;
    userRooms: UserRoom[];
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
    userTasks: UserTask[];
    creator: User;
    createdAt: Date;
}

export interface User {
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

export interface File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export interface UserProject {
    id: string;
    user: User;
    project: Project;
    role: ProjectRole;
    addedAt: Date;
}

export interface UserRoom {
    id: string;
    user: User;
    room: Room;
}

export interface UserTask {
    id: string;
    user: User;
    task: Task;
}

export interface UserWorkspace {
    id: string;
    user: User;
    addedAt: Date;
    workspace: Workspace;
    role: WorkspaceRole;
}

export interface Workspace {
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
