import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask($input: CreateTask!, $milestoneId: ID!) {
    createTask(input: $input, milestoneId: $milestoneId) {
      id
      name
      description
      status
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($id: ID!, $status: Status!) {
    updateTask(input: { status: $status }, id: $id) {
      id
      name
      description
      status
      tags
      creator {
        id
        name
      }
      userTasks {
        id
        user {
          id
          name
        }
      }
    }
  }
`;
