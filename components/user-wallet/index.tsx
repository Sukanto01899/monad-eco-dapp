"use client";
import React, { useState } from "react";
import WalletState from "./wallet-state";
import useSmartAddress from "@/hooks/useSmartAddress";
import CreateSmartAccount from "./create-smart-accoun";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const UserWallet = () => {
  const { refetch, smartUser, isSmartUserLoading, isFetched } =
    useSmartAddress();
  const [step, setStep] = useState<"balance" | "send" | "status" | "deposit">(
    "balance"
  );
  const { exportWallet } = usePrivy();
  const { wallets } = useWallets();

  return (
    <dialog
      id="wallet_modal"
      className="modal modal-bottom sm:modal-middle z-[1000]"
    >
      <div className="modal-box bg-base-300">
        <form method="dialog">
          <button
            onClick={() => setTimeout(() => setStep("balance"), 300)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {!isSmartUserLoading && (
          <h3 className="font-bold text-lg">
            Smart Wallet{" "}
            {wallets[0].walletClientType === "privy" && (
              <span
                onClick={exportWallet}
                className="ml-3 text-sm font-bold text-yellow-500 cursor-pointer border p-1"
              >
                Export EOA
              </span>
            )}
          </h3>
        )}
        {isSmartUserLoading ? (
          <div className="flex flex-col w-full justify-center items-center h-40">
            <span className="loading loading-ring loading-xl"></span>
            <p className="text-xs">Please wait...</p>
          </div>
        ) : smartUser?.user ? (
          <WalletState
            setStep={setStep}
            step={step}
            smartAddress={smartUser?.user?.smart_address as `0x${string}`}
          />
        ) : (
          <CreateSmartAccount refetch={refetch} />
        )}
      </div>
    </dialog>
  );
};

export default UserWallet;
