import { gql } from '@apollo/client';

export const UPDATE_USERS = gql`
  mutation UpdateUse ($input: UpdateUserInput!){
     updateUser(
    input: $input
  ){
    id,
    name,
    email,
    phone
  }
  }

`;
