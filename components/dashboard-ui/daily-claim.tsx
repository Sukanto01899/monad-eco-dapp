"use client";
import contracts from "@/contracts/abi/abi";
import useSmartAddress from "@/hooks/useSmartAddress";
import React from "react";
import { useReadContract } from "wagmi";
import BtnLoading from "../common/btn-loading";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { claimDailyApi } from "@/endpoints/authApi";

const DailyClaim = () => {
  const { smartUser } = useSmartAddress();
  const {
    mutate: dailyClaimMutate,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: () => {
      return claimDailyApi();
    },
    onSuccess: (data) => {
      if (data?.isSuccess && data?.transactionHash) {
        toast.success("Daily claim successful!");
      } else {
        toast.error(data?.error || "Daily claim failed!");
      }
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  const { data: canClaimDailyReward, isLoading } = useReadContract({
    abi: contracts.EcoRewardDistributor.abi,
    address: contracts.EcoRewardDistributor.address,
    functionName: "canClaimDailyReward",
    args: [smartUser?.user?.smart_address],
  });

  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm">
      <figure>
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1313&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="recyclable"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Claim daily 10 ECO!</h2>
        <p>
          Claim your daily reward and contribute to environmental sustainability
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => dailyClaimMutate()}
            disabled={
              isPending || !canClaimDailyReward || isLoading || isSuccess
            }
            className="btn btn-primary"
          >
            {isPending && <BtnLoading />}
            {canClaimDailyReward
              ? isSuccess
                ? "Success"
                : "Claim Daily"
              : "Back Tomorrow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyClaim;
