"use client";

import contracts from "@/contracts/abi/abi";
import { claimRewardsApi } from "@/endpoints/authApi";
import useSmartAddress from "@/hooks/useSmartAddress";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FaArrowRight, FaGift } from "react-icons/fa";
import { formatUnits } from "viem";
import { useReadContracts } from "wagmi";
import Modal from "../common/modal";
import ConfirmModal from "./confirm-modal";
import toast from "react-hot-toast";
import BtnLoading from "../common/btn-loading";

const RewardClaim = () => {
  const { smartUser } = useSmartAddress();
  const {
    mutate: claimRewards,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: async () => {
      return claimRewardsApi();
    },
    onSuccess: (data) => {
      if (data?.isSuccess && data?.transactionHash) {
        toast.success("Rewards claimed successfully!");
      } else {
        toast.error(data.error || "Failed to claim rewards.");
      }
    },
  });
  const { data: rewardData, isLoading } = useReadContracts({
    contracts: [
      {
        address: contracts.ECOStaking.address as `0x${string}`,
        abi: contracts.ECOStaking.abi,
        functionName: "calculatePendingRewards",
        args: [smartUser?.user?.smart_address as `0x${string}`],
      },
      {
        address: contracts.ECOStaking.address as `0x${string}`,
        abi: contracts.ECOStaking.abi,
        functionName: "getTotalRewards",
        args: [smartUser?.user?.smart_address as `0x${string}`],
      },
    ],
  });

  const pendingRewards =
    rewardData && typeof rewardData[0]?.result === "bigint"
      ? parseFloat(
          formatUnits(rewardData[0].result as bigint, 18).toString()
        ).toFixed(6)
      : "0.00";
  const totalRewards =
    rewardData && typeof rewardData[1]?.result === "bigint"
      ? parseFloat(
          formatUnits(rewardData[1].result as bigint, 18).toString()
        ).toFixed(6)
      : "0.00";

  const hasMinClaim = parseFloat(pendingRewards) >= 0.01;

  const openClaimRewardsModal = () => {
    const modal = document.getElementById(
      "claim_rewards_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div
          className={`animate-bounce w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <FaGift className="w-10 h-10 text-white" />
        </div>
        <h3
          className={`${
            isLoading && "animate-pulse"
          } text-3xl font-bold text-neutral-content mb-2`}
        >
          {pendingRewards} ECO
        </h3>
        <p className="text-neutral-content">Available to Claim</p>
      </div>

      {/*<RewardHistory />*/}
      <div className="bg-base-100 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-content">Total Rewards Earned</span>
          <span className="font-semibold text-neutral-content">
            {totalRewards} ECO
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-content">Pending Rewards</span>
          <span className="font-semibold text-emerald-600">
            {pendingRewards} ECO
          </span>
        </div>
      </div>

      {/*Claim button  */}
      <button
        className="btn bg-neutral w-full"
        onClick={openClaimRewardsModal}
        disabled={isPending || !hasMinClaim}
      >
        {isPending && <BtnLoading />}
        {hasMinClaim ? "Claim Rewards" : "MIN Claim 0.01 ECO"}
      </button>

      {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
      {isSuccess && data?.isSuccess && (
        <p className="text-green-500 mt-2 flex items-center gap-2">
          Claim successful!{" "}
          {data.transactionHash && (
            <a
              href={`https://testnet.monadexplorer.com/tx/${data.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-purple-300 flex items-center gap-2"
            >
              View Transaction <FaArrowRight />
            </a>
          )}
        </p>
      )}

      <Modal>
        <ConfirmModal
          modalName="claim_rewards_modal"
          title="Claim Rewards"
          message={`Are you sure you want to claim rewards?`}
          confirmAction={claimRewards}
        />
      </Modal>
    </div>
  );
};

export default RewardClaim;
