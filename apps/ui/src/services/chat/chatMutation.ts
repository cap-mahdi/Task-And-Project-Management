import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation createRoom($projectId: ID!, $name: String!, $members: [ID!]!) {
    createRoom(projectId: $projectId, name: $name, members: $members) {
      id
      name
    }
  }
`;
