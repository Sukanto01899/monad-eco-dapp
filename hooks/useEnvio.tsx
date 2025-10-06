import { envioClient } from "@/lib/config/envioClient";
import { GET_ACTIONS, GET_TOTAL_PROOF } from "@/lib/utils/gqlQueries";
import { useQuery } from "@tanstack/react-query";

type ActionsResponse = {
  EcoRewardDistributor_RewardDistributed: any; // Replace 'any' with the actual type if known
};

export function useRewardDistributor() {
  return useQuery({
    queryKey: ["actions"],
    queryFn: async () => {
      const data = await envioClient.request<ActionsResponse>(GET_ACTIONS);
      return data?.EcoRewardDistributor_RewardDistributed;
    },
    refetchInterval: 10000, // every 5 sec auto refresh
  });
}
export function useGetUserTotalProof(address: `0x${string}`) {
  return useQuery({
    queryKey: ["actions", address],
    queryFn: async () => {
      const data = await envioClient.request<ActionsResponse>(
        GET_TOTAL_PROOF(address)
      );
      return data?.EcoRewardDistributor_RewardDistributed;
    },
    refetchInterval: 5000, // every 5 sec auto refresh
  });
}
