import React from "react";
import { FaAlignRight, FaCheckCircle } from "react-icons/fa";

type SendSuccessProps = {
  setStep: (step: "balance" | "send" | "status") => void;
};

const SendSuccess = ({ setStep }: SendSuccessProps) => {
  return (
    <div className="w-full mt-6">
      <div className="text-center w-full flex flex-col items-center gap-4">
        <FaCheckCircle className="text-green-500 text-8xl" />
        <h1 className="text-neutral-content">Successfully sent!</h1>
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
