import { gql } from "@apollo/client";

export const FEED_QUERY = gql`
  query Feed($filter: String, $skip: Int, $take: Int, $orderBy: [LinkOrderByInput!]) {
    feed(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;
