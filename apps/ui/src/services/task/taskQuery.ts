import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query getTasks($projectId: String, $milestoneId: String) {
    tasks(filter: { projectId: $projectId, milestoneId: $milestoneId }) {
      id
      name
      description
      status
      tags
      createdAt
      creator {
        id
        name
        avatar
      }
      milestone {
        id
        name
      }
      comments {
        id
        content
        createdAt
        user {
          id
          name
          avatar
        }
      }
      userTasks {
        id
        user {
          name
          avatar
        }
      }
    }
  }
`;
