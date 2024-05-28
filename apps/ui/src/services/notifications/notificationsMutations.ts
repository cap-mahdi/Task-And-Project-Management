import { gql } from '@apollo/client';

export const READ_PROJECT_NOTIF = gql`
  mutation readNotification($id: ID!) {
    markProjectNotificationAsRead(id: $id) {
      id
    }
  }
`;

export const READ_WORKSPACE_NOTIF = gql`
  mutation readNotification($id: ID!) {
    markWorkspaceNotificationAsRead(id: $id) {
      id
    }
  }
`;
