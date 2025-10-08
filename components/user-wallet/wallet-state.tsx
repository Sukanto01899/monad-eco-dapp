"use client";
import React, { useState } from "react";
import TotalBalance from "./total-balance";
import SendToken from "./send-token";
import SendSuccess from "./send-success";
import DepositToken from "./deposit-token";

type WalletStateProps = {
  smartAddress: `0x${string}`;
  step: "balance" | "send" | "status" | "deposit";
  setStep: (step: "balance" | "send" | "status" | "deposit") => void;
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
      {step === "deposit" && (
        <DepositToken
          smartAddress={smartAddress}
          setTxHash={setTxHash}
          setStep={setStep}
        />
      )}
    </>
  );
};

export default WalletState;
