import { gql } from '@apollo/client';
import * as yup from 'yup';
import { EMAIL_REGEX } from '../../utils';

export const RegisterSchema = yup.object().shape({
  email: yup.string().email().matches(EMAIL_REGEX, 'Invalid email').required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  name: yup.string().required(),
});

export type RegisterType = yup.InferType<typeof RegisterSchema>;

export const SignupRequest = gql`
  mutation SignupRequest($input: SignupInput!) {
    createPost(input: $input)
      @rest(
        type: "Post"
        path: "/auth/signup"
        method: "POST"
        bodyKey: "input"
      ) {
      user
      accessToken
    }
  }
`;
