"use client";
import contracts from "@/contracts/abi/abi";
import React, { useEffect, useMemo, useState } from "react";
import { useReadContracts } from "wagmi";
import Modal from "../common/modal";
import ConfirmModal from "./confirm-modal";
import { formatUnits } from "viem";
import { useMutation } from "@tanstack/react-query";
import { unstakeApi } from "@/endpoints/authApi";
import toast from "react-hot-toast";
import BtnLoading from "../common/btn-loading";
import { FaArrowRight } from "react-icons/fa";
import useSmartAddress from "@/hooks/useSmartAddress";
import useUserStakeInfo from "@/hooks/useUserStakeInfo";

const Unstake = () => {
  const [amount, setAmount] = useState("");
  const { smartUser } = useSmartAddress();
  const { stakedAmount, noPenalty, dayLeft } = useUserStakeInfo();
  const {
    mutate: unstakeMutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: async () => {
      return unstakeApi(amount);
    },
    onSuccess: (data) => {
      if (data?.isSuccess && data?.transactionHash) {
        toast.success("Unstake successful!");
      } else {
        toast.error(data?.error || "Unstake failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Unstake failed:", error);
      toast.error("Unstake failed. Please try again.");
      // Optionally, show error message to user
    },
    onSettled: () => {
      setAmount("");
    },
  });
  const { data: unstakeData } = useReadContracts({
    contracts: [
      {
        address: contracts.ECOStaking.address as `0x${string}`,
        abi: contracts.ECOStaking.abi,
        functionName: "earlyUnstakePenalty",
      },
    ],
  });

  const earlyUnstakePenalty =
    unstakeData && typeof unstakeData[0]?.result === "bigint"
      ? Number(unstakeData[0].result.toString()) / 100
      : "";

  const willReceived = !amount
    ? 0.0
    : noPenalty
    ? parseFloat(amount)
    : parseFloat(amount) - (5 * parseFloat(amount)) / 100;

  const unstakePenaltyAmount = !amount
    ? 0.0
    : parseFloat(amount) - willReceived;

  const hasEnoughBalance = useMemo(() => {
    return stakedAmount && parseFloat(amount) <= parseFloat(stakedAmount);
  }, [amount, stakedAmount]);

  const handleMax = () => {
    // Set the amount to the maximum available balance
    setAmount(parseInt(stakedAmount || "") + "");
    console.log("Max amount set:", stakedAmount);
  };

  const openStakeConfirmModal = () => {
    const modal = document.getElementById(
      "unstake_confirm_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="w-full">
      <fieldset className="fieldset">
        <div className="fieldset-header flex justify-between">
          <legend className="fieldset-legend">Amount to Unstake</legend>
          <legend className="fieldset-legend">
            Staked: {stakedAmount} ECO
          </legend>
        </div>
        <div className="w-full relative">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="input w-full"
            placeholder="0.00"
          />
          <span
            onClick={handleMax}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-300 bg-neutral px-2 py-1 rounded-lg cursor-pointer"
          >
            MAX
          </span>
        </div>
      </fieldset>

      <div className="bg-base-100 p-4 rounded-lg space-y-2 my-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">You will receive</span>
          <span className="font-semibold text-emerald-600">
            {willReceived.toFixed(6) || "0.00"} ECO
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Early Unstake Penalty ({earlyUnstakePenalty}%)
          </span>
          <span className="font-semibold text-gray-200">
            {unstakePenaltyAmount.toFixed(6)} ECO
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="font-semibold text-gray-200">
            {dayLeft} days remaining
          </span>
        </div>
      </div>

      <button
        disabled={isPending || !amount || !hasEnoughBalance}
        onClick={openStakeConfirmModal}
        className="btn bg-neutral w-full"
      >
        {isPending && <BtnLoading />}
        {amount && parseFloat(amount) > 0
          ? !hasEnoughBalance
            ? "Insufficient Balance"
            : noPenalty
            ? `Unstake ${amount} ECO`
            : `Unstake with Penalty`
          : "Enter Amount to Untake"}
      </button>
      {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
      {isSuccess && data?.isSuccess && (
        <p className="text-green-500 mt-2 flex items-center gap-2">
          Unstake successful!{" "}
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
          modalName="unstake_confirm_modal"
          title="Confirm Unstake"
          message={`Are you sure you want to unstake ${amount} ECO tokens?`}
          confirmAction={unstakeMutate}
        />
      </Modal>
    </div>
  );
};

export default Unstake;
