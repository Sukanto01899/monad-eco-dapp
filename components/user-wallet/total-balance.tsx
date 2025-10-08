import React from "react";
import WalletTokens from "./wallet-tokens";
import { useBalance } from "wagmi";
import contracts from "@/contracts/abi/abi";
import { FaCopy } from "react-icons/fa";

type TotalBalanceProps = {
  smartAddress: `0x${string}`;
  setStep: (step: "balance" | "send" | "status" | "deposit") => void;
};

const TotalBalance = ({ smartAddress, setStep }: TotalBalanceProps) => {
  const { data: balance } = useBalance({
    address: smartAddress,
    token: contracts.EcoReward.address,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-8">
        <div className="stat-title">Account balance</div>
        <div className="stat-value">
          {balance ? balance.formatted.slice(0, 8) : "0.00"} ECO
        </div>
      </div>

      <p className="text-xs flex justify-between items-center text-neutral-content border border-base-100 py-1 px-3 rounded-full">
        <span>{smartAddress}</span>
        <FaCopy />
      </p>

      <div className="flex w-full gap-2">
        <button onClick={() => setStep("send")} className="btn btn-lg flex-1/2">
          Withdrawal
        </button>
        <button
          onClick={() => setStep("deposit")}
          className="btn btn-lg flex-1/2"
        >
          Deposit
        </button>
      </div>

      <div>
        <WalletTokens />
      </div>
    </div>
  );
};

export default TotalBalance;
