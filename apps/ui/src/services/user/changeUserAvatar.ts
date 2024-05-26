import { gql } from '@apollo/client';

export const CHANGE_USER_AVATAR = gql`
  mutation ChangeUserAvatar ($file: Upload!){
     changeUserAvatar(
    file: $file
  ){
    id,
    name,
    email,
    phone,
    avatar
  }
  }

`;
