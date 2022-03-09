import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      description
      url
    }
  }
`;
