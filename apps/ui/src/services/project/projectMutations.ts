import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      userProjects {
        id
      }
    }
  }
`;

export const ADD_USERS_TO_PROJECT = gql`
  mutation AddUsersToProject($input: AddUserProjectInput!) {
    addUsersToProject(input: $input) {
      id
      user {
        id
        email
      }
      role
    }
  }
`;
