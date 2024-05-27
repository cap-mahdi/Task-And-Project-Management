import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $taskID: ID!) {
    createComment(input: {content: $content, taskId: $taskID}) {
      id
      content
      
    }
  }
`;
