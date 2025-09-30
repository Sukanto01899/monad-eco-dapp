import React, { useState } from "react";
import WalletTokens from "./wallet-tokens";
import TotalBalance from "./total-balance";
import SendToken from "./send-token";
import SendSuccess from "./send-success";

type WalletStateProps = {
  smartAddress: `0x${string}`;
  step: "balance" | "send" | "status";
  setStep: (step: "balance" | "send" | "status") => void;
};

const WalletState = ({ smartAddress, step, setStep }: WalletStateProps) => {
  return (
    <>
      {step === "balance" && (
        <TotalBalance setStep={setStep} smartAddress={smartAddress} />
      )}
      {step === "send" && <SendToken setStep={setStep} />}
      {step === "status" && <SendSuccess setStep={setStep} />}
    </>
  );
};

export default WalletState;
