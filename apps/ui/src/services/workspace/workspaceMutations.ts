import { gql } from '@apollo/client';

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      id
      name
      description
    }
  }
`;

export const ADD_USERS_TO_WORKSPACE = gql`
  mutation AddUsersToWorkspace($input: AddUserWorkspaceInput!) {
    addUsersToWorkspace(input: $input) {
      id
      user {
        id
        email
      }
      addedAt
      workspace {
        id
        name
      }
      role
    }
  }
`;
