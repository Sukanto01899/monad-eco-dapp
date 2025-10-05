"use client";
import contracts from "@/contracts/abi/abi";
import { stakeApi } from "@/endpoints/authApi";
import useSmartAddress from "@/hooks/useSmartAddress";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useBalance, useReadContracts } from "wagmi";
import Modal from "../common/modal";
import ConfirmModal from "./confirm-modal";
import toast from "react-hot-toast";
import BtnLoading from "../common/btn-loading";
import { FaArrowRight } from "react-icons/fa";

const Stake = () => {
  const [amount, setAmount] = useState("");
  const { smartUser } = useSmartAddress();
  const {
    mutate: handleStakeMutate,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: async () => {
      return stakeApi(amount);
    },
    onSuccess: (data) => {
      if (data?.isSuccess && data?.transactionHash) {
        toast.success("Stake successful!");
      } else {
        toast.error(data?.error || "Stake failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Stake failed:", error);
      toast.error("Stake failed. Please try again.");
      // Optionally, show error message to user
    },
    onSettled: () => {
      setAmount("");
    },
  });

  const { data: apyData } = useReadContracts({
    contracts: [
      {
        address: contracts.ECOStaking.address as `0x${string}`,
        abi: contracts.ECOStaking.abi,
        functionName: "rewardRate",
      },
      {
        address: contracts.ECOStaking.address as `0x${string}`,
        abi: contracts.ECOStaking.abi,
        functionName: "minimumStakingPeriod",
      },
    ],
  });

  const { data: balanceData } = useBalance({
    address: smartUser?.user?.smart_address,
    token: contracts.EcoReward.address as `0x${string}`,
  });

  const hasEnoughBalance = useMemo(() => {
    return (
      balanceData && parseFloat(amount) <= parseFloat(balanceData?.formatted)
    );
  }, [amount, balanceData]);

  const estimatedDailyRewards = !amount
    ? 0.0
    : parseFloat(amount) * 0.01 * (1 / 365);

  const handleMax = () => {
    // Set the amount to the maximum available balance
    setAmount(parseInt(balanceData?.formatted || "") + "");
  };

  const openStakeConfirmModal = () => {
    const modal = document.getElementById(
      "stake_confirm_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="w-full">
      <fieldset className="fieldset">
        <div className="fieldset-header flex justify-between">
          <legend className="fieldset-legend">Amount to Stake</legend>
          <legend className="fieldset-legend">
            Balance:{" "}
            {balanceData?.formatted
              ? parseFloat(balanceData?.formatted).toFixed(6)
              : "0.00"}{" "}
            {balanceData?.symbol}
          </legend>
        </div>
        <div className="w-full relative">
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            value={amount}
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
          <span className="text-gray-500">Current APY</span>
          <span className="font-semibold text-emerald-600">
            {apyData && typeof apyData[0]?.result === "bigint"
              ? Number(apyData[0].result.toString()) / 100
              : ""}
            %
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimated Daily Rewards</span>
          <span className="font-semibold text-gray-200">
            {estimatedDailyRewards.toFixed(6)} ECO
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Minimum Lock Period</span>
          <span className="font-semibold text-gray-200">
            {apyData && apyData[1]?.result
              ? Number(apyData[1].result) / (60 * 60 * 24)
              : ""}{" "}
            Days
          </span>
        </div>
      </div>

      <button
        disabled={!amount || isPending || !hasEnoughBalance}
        onClick={() => openStakeConfirmModal()}
        className="btn bg-neutral w-full"
      >
        {isPending && <BtnLoading />}
        {amount && parseFloat(amount) > 0
          ? !hasEnoughBalance
            ? "Insufficient Balance"
            : `Stake ${amount} ECO`
          : "Enter Amount to Stake"}
      </button>
      {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
      {isSuccess && data?.isSuccess && (
        <p className="text-green-500 mt-2 flex items-center gap-2">
          Stake successful!{" "}
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
          modalName="stake_confirm_modal"
          title="Confirm Stake"
          message={`Are you sure you want to stake ${amount} ECO tokens?`}
          confirmAction={handleStakeMutate}
        />
      </Modal>
    </div>
  );
};

export default Stake;
