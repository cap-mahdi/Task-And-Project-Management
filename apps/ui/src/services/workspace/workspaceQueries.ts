import { gql } from "@apollo/client";




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