import { gql } from "graphql-request";

export const GET_ACTIONS = gql`
  query EcoRewardDistributor_RewardDistributed {
    EcoRewardDistributor_RewardDistributed(
      where: { actionType: { _in: ["3"] } }
    ) {
      actionType
      amount
      id
      timestamp
      user
    }
  }
`;

export const GET_TOTAL_PROOF = (address: `0x${string}`) => {
  return gql`
    query EcoRewardDistributor_RewardDistributed {
      EcoRewardDistributor_RewardDistributed(
        where: {
          actionType: { _in: ["3"] }
          user: { _eq: "${address}" }
        }
      ) {
        actionType
        amount
        id
        timestamp
        user
      }
    }
  `;
};
