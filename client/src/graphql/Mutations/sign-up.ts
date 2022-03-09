import { gql } from '@apollo/client';

export const SIGN_UP_MUTATIOn = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token,
      user {
        id
        email
      }
    }
  }
`;
