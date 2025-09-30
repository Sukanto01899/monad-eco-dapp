import { gql } from "graphql-request";

export const GET_ACTIONS = gql`
  {
    ActionLoggeds(first: 20, orderBy: timestamp, orderDirection: desc) {
      user
      actionType
      proofURI
      tokens
      timestamp
    }
  }
`;
