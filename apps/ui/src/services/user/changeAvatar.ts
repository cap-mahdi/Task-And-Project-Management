import { gql } from '@apollo/client';

export const CHANGE_AVATAR = gql`
  mutation changeAvatarUser($input: ChangeAvatar!) {
    changeUserAvatar(input: $input)
      @rest(
        type: "file"
        path: "/user/upload"
        method: "POST"
        bodyKey: "input"
      ) {
      id
      name
      email
      phone
      avatar
    }
  }
`;
