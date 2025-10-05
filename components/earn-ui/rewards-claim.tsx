"use client";

import { claimRewardsApi } from "@/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaArrowRight, FaGift } from "react-icons/fa";
import Modal from "../common/modal";
import ConfirmModal from "./confirm-modal";
import toast from "react-hot-toast";
import BtnLoading from "../common/btn-loading";
import useUserStakeInfo from "@/hooks/useUserStakeInfo";

const RewardClaim = () => {
  const [disableClaim, setDisableClaim] = useState(false);
  const { pending, isLoading, refetch, isFetching } = useUserStakeInfo();
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
      setDisableClaim(true);
      if (data?.isSuccess && data?.transactionHash) {
        toast.success("Rewards claimed successfully!");
      } else {
        toast.error(data.error || "Failed to claim rewards.");
      }

      setTimeout(() => {
        setDisableClaim(false);
        refetch();
      }, 10000);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong!");
    },
    onSettled: () => {
      refetch();
    },
  });

  const hasMinClaim = parseFloat(pending) >= 0.01;

  const openClaimRewardsModal = () => {
    if (!hasMinClaim || isLoading || disableClaim) return;
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
          {pending.slice(0, 6)} ECO
        </h3>
        <p className="text-neutral-content">Available to Claim</p>
      </div>

      {/*Claim button  */}
      <button
        className="btn bg-neutral w-full"
        onClick={openClaimRewardsModal}
        disabled={isPending || !hasMinClaim || disableClaim}
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
