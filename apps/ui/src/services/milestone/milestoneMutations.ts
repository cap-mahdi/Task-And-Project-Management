import { gql } from '@apollo/client';

export const CREATE_MILESTONE = gql`
  mutation CreateMilestone($input: CreateMilestone!, $projectId: String!) {
    createMilestone(input: $input, projectId: $projectId) {
      id
      name
      description
      startDate
      endDate
      status
    }
  }
`;
