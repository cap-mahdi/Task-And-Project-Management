import { gql } from '@apollo/client';
import * as yup from 'yup';
import { EMAIL_REGEX } from '../../utils';

export const LoginSchema = yup.object().shape({
  email: yup.string().email().matches(EMAIL_REGEX, 'Invalid email').required(),
  password: yup.string().min(8).required(),
});

export type LoginType = yup.InferType<typeof LoginSchema>;

export const LoginRequest = gql`
  mutation LoginRequest($input: LoginInput!) {
    createPost(input: $input)
      @rest(
        type: "Post"
        path: "/auth/login"
        method: "POST"
        bodyKey: "input"
      ) {
      accessToken
    }
  }
`;
