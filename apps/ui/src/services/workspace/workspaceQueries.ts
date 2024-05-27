import { gql } from '@apollo/client';

export const FetchWorkspaceRequest = (fields: string[]) => {
  return gql`
  query FetchWorkspaceRequest {
    workspaces
      {
        ${fields.join('\n')}
    }
  }
`;
};

export const FetchWorkspaceByIdRequest = (
  id: string | number,
  fields: string[]
) => {
  return gql`
  query FetchWorkspaceByIdRequest {
    workspace(id: "${id}")
      {
        ${fields.join('\n')}
    }
  }
`;
};

export const GET_WORKSPACE_USERS = gql`
  query GetWorkspaceUsers($workspaceId: ID!) {
    getWorkspaceUsers(workspaceId: $workspaceId) {
      id
      user {
        id
        name
        email
      }

      role
    }
  }
`;
