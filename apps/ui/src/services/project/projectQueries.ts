import { gql } from '@apollo/client';

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

export const GET_PROJECT_BY_ID = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      description
    }
  }
`;

export const GET_PROJECTS_WITH_WORKSPACE = gql`
  query GetProjects {
    projects {
      id
      name
      workspace {
        id
        name
      }
      milestones {
        id
        name
        description
        startDate
        endDate
        status
      }
      userProjects {
        user {
          id
          name
        }
        role
      }
    }
  }
`;

export const GET_ALL_WORKSPACE_MEMBERS_NOT_IN_PROJECT = (id: string) => {
  return gql`
  query GetWorkspaceMembersNotInProject {
    getWorkspaceMembersNotInProject(projectId:  "${id}") {
      id
      name
      email
      avatar
  }
  }
`;
};

export const GET_PROJECT_USERS = gql`
  query GetProjectUsers($projectId: ID!) {
    getProjectUsers(projectId: $projectId) {
      id
      user {
        id
        name
        email
      }

      role
      addedAt
    }
  }
`;
