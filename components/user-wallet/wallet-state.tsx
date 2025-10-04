"use client";
import React, { useState } from "react";
import TotalBalance from "./total-balance";
import SendToken from "./send-token";
import SendSuccess from "./send-success";

type WalletStateProps = {
  smartAddress: `0x${string}`;
  step: "balance" | "send" | "status";
  setStep: (step: "balance" | "send" | "status") => void;
};

const WalletState = ({ smartAddress, step, setStep }: WalletStateProps) => {
  const [txHash, setTxHash] = useState("");
  return (
    <>
      {step === "balance" && (
        <TotalBalance setStep={setStep} smartAddress={smartAddress} />
      )}
      {step === "send" && (
        <SendToken
          smartAddress={smartAddress}
          setTxHash={setTxHash}
          setStep={setStep}
        />
      )}
      {step === "status" && <SendSuccess txHash={txHash} setStep={setStep} />}
    </>
  );
};

export default WalletState;
