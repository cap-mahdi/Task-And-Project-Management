import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    workspaceNotifications {
      id
      actor {
        id
        name
        avatar
      }
      createdAt
      workspace {
        id
        name
      }
      action
      read
    }
    projectNotifications {
      id
      actor {
        id
        name
      }
      createdAt
      project {
        id
        name
        workspace {
          id
          name
        }
      }
      action
      read
    }
  }
`;
