"use client";
import contracts from "@/contracts/abi/abi";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import { useReadContract } from "wagmi";

const useSmartAddress = () => {
  const { user } = usePrivy();
  const {
    data: smartAddress,
    isLoading,
    isSuccess,
    refetch: isUserRegisteredRefetchRefetch,
    isFetching: privyDIDToAddressFetching,
  } = useReadContract({
    functionName: "privyDIDToAddress",
    abi: contracts.EcoUser.abi,
    address: contracts.EcoUser.address as `0x${string}`,
    args: [user?.id],
  });
  const {
    data: isUserRegistered,
    refetch: isUserRegisteredRefetch,
    isFetching: isUserRegisteredFetching,
    isLoading: isUserRegisteredLoading,
  } = useReadContract({
    functionName: "isUserRegistered",
    abi: contracts.EcoUser.abi,
    address: contracts.EcoUser.address as `0x${string}`,
    args: [user?.id],
  });

  const refetch = () => {
    isUserRegisteredRefetch();
    isUserRegisteredRefetchRefetch();
  };

  const isFetching = privyDIDToAddressFetching || isUserRegisteredFetching;
  return {
    smartAddress,
    isUserRegisteredLoading,
    isSuccess,
    isUserRegisteredRefetch,
    isUserRegistered,
    isUserRegisteredFetching,
  };
};

export default useSmartAddress;
