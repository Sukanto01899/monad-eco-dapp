import React from "react";
import useSmartAccount from "./useSmartAccount";
import { createDelegation } from "@metamask/delegation-toolkit";
import { parseEther } from "viem";

const useCreateDonateDelegation = () => {
  const { getSmartWallet } = useSmartAccount();

  const delegate = async (token: string, amount: string) => {
    try {
      const smartAccount = await getSmartWallet();
      const delegation = createDelegation({
        to: process.env.NEXT_PUBLIC_PLATFORM_SMART_ADDRESS as `0x${string}`,
        from: smartAccount.address,
        environment: smartAccount.environment,
        scope: {
          type: "erc20PeriodTransfer",
          tokenAddress: token as `0x${string}`,
          periodAmount: parseEther(amount),
          periodDuration: 604800,
          startDate: Date.now() / 1000,
        },
      });
      return delegation;
    } catch (error) {
      throw new Error("Failed to create delegation!");
    }
  };

  const signDelegation = async (token: string, amount: string) => {
    try {
      const smartAccount = await getSmartWallet();
      const delegation = await delegate(token, amount);
      console.log(delegation);
      const signature = await smartAccount.signDelegation({
        delegation,
      });
      return {
        ...delegation,
        signature,
      };
    } catch (error) {
      throw new Error("Failed to sign delegation!");
    }
  };
  return { delegate, signDelegation };
};

export default useCreateDonateDelegation;
