"use client";
import React, { useEffect, useState } from "react";
import WalletState from "./wallet-state";
import { useReadContract } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import contracts from "@/contracts/abi/abi";
import useSmartAddress from "@/hooks/useSmartAddress";
import CreateSmartAccount from "./create-smart-accoun";

const UserWallet = () => {
  const {
    smartAddress,
    isUserRegisteredLoading,
    isUserRegisteredRefetch,
    isUserRegistered,
    isUserRegisteredFetching,
  } = useSmartAddress();
  const [step, setStep] = useState<"balance" | "send" | "status">("status");

  return (
    <dialog id="wallet_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setTimeout(() => setStep("balance"), 300)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {!!isUserRegistered && <h3 className="font-bold text-lg">Wallet</h3>}
        {isUserRegisteredLoading ? (
          "Loading"
        ) : isUserRegistered ? (
          <WalletState
            setStep={setStep}
            step={step}
            smartAddress={smartAddress as `0x${string}`}
          />
        ) : (
          <CreateSmartAccount refetch={isUserRegisteredRefetch} />
        )}
      </div>
    </dialog>
  );
};

export default UserWallet;
