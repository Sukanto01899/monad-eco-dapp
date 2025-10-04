"use client";
import { getUser } from "@/endpoints/authApi";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

const useSmartAddress = () => {
  const { user } = usePrivy();

  const {
    data: smartUser,
    isLoading: isSmartUserLoading,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      return await getUser();
    },
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  return {
    refetch,
    smartUser,
    isSmartUserLoading,
    isFetched,
  };
};

export default useSmartAddress;
