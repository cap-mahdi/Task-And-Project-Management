import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments($taskID: ID!) {
    comments(taskId: $taskID) {
      id
      content
      user {
        name
        avatar
      }
    }
  }
`;
