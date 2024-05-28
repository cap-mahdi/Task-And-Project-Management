/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getConnectedUser {\n    getConnectedUser {\n      id\n      name\n      phone\n      email\n      role\n      avatar\n    }\n  }\n": types.GetConnectedUserDocument,
    "\n  mutation createRoom($projectId: ID!, $name: String!, $members: [ID!]!) {\n    createRoom(projectId: $projectId, name: $name, members: $members) {\n      id\n      name\n    }\n  }\n": types.CreateRoomDocument,
    "\n  query getUserRoomsByUserIdAndProjectId($projectId: ID!) {\n    getUserRoomsByUserIdAndProjectId(projectId: $projectId) {\n      id\n      createdAt\n      name\n    }\n  }\n": types.GetUserRoomsByUserIdAndProjectIdDocument,
    "\n  query project($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      userProjects {\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.ProjectDocument,
    "\n  query room($id: ID!) {\n    room(id: $id) {\n      id\n      messages {\n        id\n        content\n        createdAt\n        deletedAt\n        sender {\n          id\n          name\n          avatar\n        }\n      }\n    }\n  }\n": types.RoomDocument,
    "\n  mutation CreateComment($content: String!, $taskID: ID!) {\n    createComment(input: {content: $content, taskId: $taskID}) {\n      id\n      content\n      \n    }\n  }\n": types.CreateCommentDocument,
    "\n  query GetComments($taskID: ID!) {\n    comments(taskId: $taskID) {\n    id\n    content\n    user{\n        name\n    }\n  }\n  }\n": types.GetCommentsDocument,
    "\n  mutation CreateMilestone($input: CreateMilestone!, $projectId: String!) {\n    createMilestone(input: $input, projectId: $projectId) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n": types.CreateMilestoneDocument,
    "\n  query GetMilestones($projectId: ID!) {\n    milestones(projectId: $projectId) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n": types.GetMilestonesDocument,
    "\n  query GetMilestone($id: ID!) {\n    milestone(id: $id) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n": types.GetMilestoneDocument,
    "\n  query GetMilestoneAndTasks($id: ID!) {\n    milestone(id: $id) {\n      tasks {\n        id\n        name\n        description\n        userTasks {\n          user {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetMilestoneAndTasksDocument,
    "\n  query GetNotifications {\n    workspaceNotifications {\n      id\n      actor {\n        id\n        name\n      }\n      createdAt\n      workspace {\n        id\n        name\n      }\n      action\n      read\n    }\n    projectNotifications {\n      id\n      actor {\n        id\n        name\n      }\n      createdAt\n      project {\n        id\n        name\n      }\n      action\n      read\n    }\n  }\n": types.GetNotificationsDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      description\n      userProjects {\n        id\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation AddUsersToProject($input: AddUserProjectInput!) {\n    addUsersToProject(input: $input) {\n      id\n      user {\n        id\n        email\n      }\n      role\n    }\n  }\n": types.AddUsersToProjectDocument,
    "\n  mutation createTask($input: CreateTask!, $milestoneId: ID!) {\n    createTask(input: $input, milestoneId: $milestoneId) {\n      id\n      name\n      description\n      status\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation updateTaskStatus($id: ID!, $status: Status!) {\n    updateTask(input: { status: $status }, id: $id) {\n      id\n      name\n      description\n      status\n      tags\n      creator {\n        id\n        name\n      }\n      userTasks {\n        id\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.UpdateTaskStatusDocument,
    "\n  query getTasks($projectId: String, $milestoneId: String) {\n    tasks(filter: { projectId: $projectId, milestoneId: $milestoneId }) {\n      id\n      name\n      description\n      status\n      tags\n      createdAt\n      creator {\n        id\n        name\n        avatar\n      }\n      milestone {\n        id\n        name\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          avatar\n        }\n      }\n      userTasks {\n        id\n        user {\n          name\n          avatar\n        }\n      }\n    }\n  }\n": types.GetTasksDocument,
    "\n  mutation ChangePassword ($input: ChangePasswordInput!){\n     changePassword(\n    input: $input\n  ){\n    id,\n    name,\n    email,\n    phone,\n    avatar\n  }\n  }\n\n": types.ChangePasswordDocument,
    "\n  mutation ChangeUserAvatar($file: Upload!) {\n    changeUserAvatar(file: $file) {\n      id\n      name\n      email\n      phone,\n    avatar\n      avatar\n    }\n  }\n": types.ChangeUserAvatarDocument,
    "\n  mutation DeleteUser{\n    deleteUser {\n      id,\n      name,\n      email,\n      phone\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUse ($input: UpdateUserInput!){\n     updateUser(\n    input: $input\n  ){\n    id,\n    name,\n    email,\n    phone,\n    avatar\n  }\n  }\n\n": types.UpdateUseDocument,
    "\n  mutation CreateWorkspace($input: CreateWorkspaceInput!) {\n    createWorkspace(input: $input) {\n      id\n      name\n      description\n    }\n  }\n": types.CreateWorkspaceDocument,
    "\n  mutation AddUsersToWorkspace($input: AddUserWorkspaceInput!) {\n    addUsersToWorkspace(input: $input) {\n      id\n      user {\n        id\n        email\n      }\n      addedAt\n      workspace {\n        id\n        name\n      }\n      role\n    }\n  }\n": types.AddUsersToWorkspaceDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getConnectedUser {\n    getConnectedUser {\n      id\n      name\n      phone\n      email\n      role\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query getConnectedUser {\n    getConnectedUser {\n      id\n      name\n      phone\n      email\n      role\n      avatar\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRoom($projectId: ID!, $name: String!, $members: [ID!]!) {\n    createRoom(projectId: $projectId, name: $name, members: $members) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createRoom($projectId: ID!, $name: String!, $members: [ID!]!) {\n    createRoom(projectId: $projectId, name: $name, members: $members) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserRoomsByUserIdAndProjectId($projectId: ID!) {\n    getUserRoomsByUserIdAndProjectId(projectId: $projectId) {\n      id\n      createdAt\n      name\n    }\n  }\n"): (typeof documents)["\n  query getUserRoomsByUserIdAndProjectId($projectId: ID!) {\n    getUserRoomsByUserIdAndProjectId(projectId: $projectId) {\n      id\n      createdAt\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query project($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      userProjects {\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query project($projectId: ID!) {\n    project(id: $projectId) {\n      id\n      userProjects {\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query room($id: ID!) {\n    room(id: $id) {\n      id\n      messages {\n        id\n        content\n        createdAt\n        deletedAt\n        sender {\n          id\n          name\n          avatar\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query room($id: ID!) {\n    room(id: $id) {\n      id\n      messages {\n        id\n        content\n        createdAt\n        deletedAt\n        sender {\n          id\n          name\n          avatar\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateComment($content: String!, $taskID: ID!) {\n    createComment(input: {content: $content, taskId: $taskID}) {\n      id\n      content\n      \n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($content: String!, $taskID: ID!) {\n    createComment(input: {content: $content, taskId: $taskID}) {\n      id\n      content\n      \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetComments($taskID: ID!) {\n    comments(taskId: $taskID) {\n    id\n    content\n    user{\n        name\n    }\n  }\n  }\n"): (typeof documents)["\n  query GetComments($taskID: ID!) {\n    comments(taskId: $taskID) {\n    id\n    content\n    user{\n        name\n    }\n  }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMilestone($input: CreateMilestone!, $projectId: String!) {\n    createMilestone(input: $input, projectId: $projectId) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMilestone($input: CreateMilestone!, $projectId: String!) {\n    createMilestone(input: $input, projectId: $projectId) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMilestones($projectId: ID!) {\n    milestones(projectId: $projectId) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n"): (typeof documents)["\n  query GetMilestones($projectId: ID!) {\n    milestones(projectId: $projectId) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMilestone($id: ID!) {\n    milestone(id: $id) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n"): (typeof documents)["\n  query GetMilestone($id: ID!) {\n    milestone(id: $id) {\n      id\n      name\n      description\n      startDate\n      endDate\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMilestoneAndTasks($id: ID!) {\n    milestone(id: $id) {\n      tasks {\n        id\n        name\n        description\n        userTasks {\n          user {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMilestoneAndTasks($id: ID!) {\n    milestone(id: $id) {\n      tasks {\n        id\n        name\n        description\n        userTasks {\n          user {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetNotifications {\n    workspaceNotifications {\n      id\n      actor {\n        id\n        name\n      }\n      createdAt\n      workspace {\n        id\n        name\n      }\n      action\n      read\n    }\n    projectNotifications {\n      id\n      actor {\n        id\n        name\n      }\n      createdAt\n      project {\n        id\n        name\n      }\n      action\n      read\n    }\n  }\n"): (typeof documents)["\n  query GetNotifications {\n    workspaceNotifications {\n      id\n      actor {\n        id\n        name\n      }\n      createdAt\n      workspace {\n        id\n        name\n      }\n      action\n      read\n    }\n    projectNotifications {\n      id\n      actor {\n        id\n        name\n      }\n      createdAt\n      project {\n        id\n        name\n      }\n      action\n      read\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      description\n      userProjects {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      description\n      userProjects {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddUsersToProject($input: AddUserProjectInput!) {\n    addUsersToProject(input: $input) {\n      id\n      user {\n        id\n        email\n      }\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation AddUsersToProject($input: AddUserProjectInput!) {\n    addUsersToProject(input: $input) {\n      id\n      user {\n        id\n        email\n      }\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createTask($input: CreateTask!, $milestoneId: ID!) {\n    createTask(input: $input, milestoneId: $milestoneId) {\n      id\n      name\n      description\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation createTask($input: CreateTask!, $milestoneId: ID!) {\n    createTask(input: $input, milestoneId: $milestoneId) {\n      id\n      name\n      description\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateTaskStatus($id: ID!, $status: Status!) {\n    updateTask(input: { status: $status }, id: $id) {\n      id\n      name\n      description\n      status\n      tags\n      creator {\n        id\n        name\n      }\n      userTasks {\n        id\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateTaskStatus($id: ID!, $status: Status!) {\n    updateTask(input: { status: $status }, id: $id) {\n      id\n      name\n      description\n      status\n      tags\n      creator {\n        id\n        name\n      }\n      userTasks {\n        id\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getTasks($projectId: String, $milestoneId: String) {\n    tasks(filter: { projectId: $projectId, milestoneId: $milestoneId }) {\n      id\n      name\n      description\n      status\n      tags\n      createdAt\n      creator {\n        id\n        name\n        avatar\n      }\n      milestone {\n        id\n        name\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          avatar\n        }\n      }\n      userTasks {\n        id\n        user {\n          name\n          avatar\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTasks($projectId: String, $milestoneId: String) {\n    tasks(filter: { projectId: $projectId, milestoneId: $milestoneId }) {\n      id\n      name\n      description\n      status\n      tags\n      createdAt\n      creator {\n        id\n        name\n        avatar\n      }\n      milestone {\n        id\n        name\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          avatar\n        }\n      }\n      userTasks {\n        id\n        user {\n          name\n          avatar\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangePassword ($input: ChangePasswordInput!){\n     changePassword(\n    input: $input\n  ){\n    id,\n    name,\n    email,\n    phone,\n    avatar\n  }\n  }\n\n"): (typeof documents)["\n  mutation ChangePassword ($input: ChangePasswordInput!){\n     changePassword(\n    input: $input\n  ){\n    id,\n    name,\n    email,\n    phone,\n    avatar\n  }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeUserAvatar($file: Upload!) {\n    changeUserAvatar(file: $file) {\n      id\n      name\n      email\n      phone,\n    avatar\n      avatar\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeUserAvatar($file: Upload!) {\n    changeUserAvatar(file: $file) {\n      id\n      name\n      email\n      phone,\n    avatar\n      avatar\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser{\n    deleteUser {\n      id,\n      name,\n      email,\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser{\n    deleteUser {\n      id,\n      name,\n      email,\n      phone\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUse ($input: UpdateUserInput!){\n     updateUser(\n    input: $input\n  ){\n    id,\n    name,\n    email,\n    phone,\n    avatar\n  }\n  }\n\n"): (typeof documents)["\n  mutation UpdateUse ($input: UpdateUserInput!){\n     updateUser(\n    input: $input\n  ){\n    id,\n    name,\n    email,\n    phone,\n    avatar\n  }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateWorkspace($input: CreateWorkspaceInput!) {\n    createWorkspace(input: $input) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkspace($input: CreateWorkspaceInput!) {\n    createWorkspace(input: $input) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddUsersToWorkspace($input: AddUserWorkspaceInput!) {\n    addUsersToWorkspace(input: $input) {\n      id\n      user {\n        id\n        email\n      }\n      addedAt\n      workspace {\n        id\n        name\n      }\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation AddUsersToWorkspace($input: AddUserWorkspaceInput!) {\n    addUsersToWorkspace(input: $input) {\n      id\n      user {\n        id\n        email\n      }\n      addedAt\n      workspace {\n        id\n        name\n      }\n      role\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;