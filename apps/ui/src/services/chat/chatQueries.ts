import { gql } from '@apollo/client';

export const GET_CHAT = gql`
  query getUserRoomsByUserIdAndProjectId($projectId: ID!) {
    getUserRoomsByUserIdAndProjectId(projectId: $projectId) {
      id
      createdAt
      name
    }
  }
`;

export const GET_PROJECT_MEMBERS = gql`
  query project($projectId: ID!) {
    project(id: $projectId) {
      id
      userProjects {
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query room($id: ID!) {
    room(id: $id) {
      id
      messages {
        id
        content
        createdAt
        deletedAt
        sender {
          id
          name
          avatar
        }
      }
    }
  }
`;
