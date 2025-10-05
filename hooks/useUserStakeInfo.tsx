"use client";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import useSmartAddress from "./useSmartAddress";
import contracts from "@/contracts/abi/abi";
import { formatUnits } from "viem";

interface Info {
  stakedAmount: string;
  rewardsEarned: string;
  pending: string;
  dayLeft: string;
  noPenalty: boolean;
}
type StakeInfoTuple = [bigint, bigint, bigint, bigint, bigint, boolean];

const useUserStakeInfo = () => {
  const { smartUser } = useSmartAddress();
  const [info, setInfo] = useState<Info>({
    stakedAmount: "0",
    rewardsEarned: "0",
    pending: "0",
    dayLeft: "0",
    noPenalty: false,
  });
  const {
    data: stakeInfo,
    isLoading,
    refetch,
    isFetching,
  } = useReadContract({
    address: contracts.ECOStaking.address as `0x${string}`,
    abi: contracts.ECOStaking.abi,
    functionName: "getStakeInfo",
    args: [smartUser?.user?.smart_address],
  }) as {
    data: StakeInfoTuple | undefined;
    isLoading: boolean;
    refetch: () => void;
    isFetching: boolean;
  };

  useEffect(() => {
    if (stakeInfo) {
      const stakedAmount = formatUnits(stakeInfo[0] as bigint, 18);
      const startTime = parseInt(stakeInfo[1].toString());
      //   const lastClaimTime = parseInt(stakeInfo[2].toString());
      const rewardsEarned = formatUnits(stakeInfo[3] as bigint, 18);
      const pending = formatUnits(stakeInfo[4] as bigint, 18);
      const noPenalty = stakeInfo[5];

      let dayRemaining = 0;
      const todayTime = Date.now() / 1000;
      const day1 = 60 * 60 * 24;
      const day7 = day1 * 7;

      const passedTime = todayTime - startTime;
      const leftTime = day7 - passedTime;

      if (leftTime < 1) {
        dayRemaining = 0;
      } else {
        dayRemaining = leftTime / day1;
      }

      const dayLeft = Math.round(dayRemaining).toString();
      setInfo({ stakedAmount, rewardsEarned, pending, noPenalty, dayLeft });
    }
  }, [stakeInfo]);

  return { ...info, isLoading, refetch, isFetching };
};

export default useUserStakeInfo;
