import React from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

type SendSuccessProps = {
  setStep: (step: "balance" | "send" | "status") => void;
  txHash: string;
};

const SendSuccess = ({ setStep, txHash }: SendSuccessProps) => {
  return (
    <div className="w-full mt-6">
      <div className="text-center w-full flex flex-col items-center gap-4">
        <FaCheckCircle className="text-green-500 text-8xl" />
        <h1 className="text-neutral-content">Transaction Successful!</h1>
        <a
          href={`https://testnet.monadexplorer.com/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-purple-300 flex items-center gap-2"
        >
          View Transaction <FaArrowRight />
        </a>
      </div>
      <button
        onClick={() => setStep("balance")}
        className="btn btn-ghost text-red-500 w-full mt-6"
      >
        Close
      </button>
    </div>
  );
};

export default SendSuccess;
