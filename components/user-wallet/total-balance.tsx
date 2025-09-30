import React from "react";
import WalletTokens from "./wallet-tokens";

type TotalBalanceProps = {
  smartAddress: `0x${string}`;
  setStep: (step: "balance" | "send" | "status") => void;
};

const TotalBalance = ({ smartAddress, setStep }: TotalBalanceProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-8">
        <div className="stat-title">Account balance</div>
        <div className="stat-value">$50.00</div>
      </div>

      <p className="text-xs text-neutral-content">
        Your smart address: {smartAddress}
      </p>

      <div className="flex w-full gap-2">
        <button onClick={() => setStep("send")} className="btn btn-lg flex-1/2">
          Withdrawal
        </button>
        <button className="btn btn-lg flex-1/2">Deposit</button>
      </div>

      <div>
        <WalletTokens />
      </div>
    </div>
  );
};

export default TotalBalance;
