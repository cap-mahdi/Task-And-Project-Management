import { gql } from '@apollo/client';

export const GET_MILESTONES = gql`
  query GetMilestones($projectId: ID!) {
    milestones(projectId: $projectId) {
      id
      name
      description
      startDate
      endDate
      status
    }
  }
`;

export const GET_MILESTONE_BY_ID = gql`
  query GetMilestone($id: ID!) {
    milestone(id: $id) {
      id
      name
      description
      startDate
      endDate
      status
    }
  }
`;
