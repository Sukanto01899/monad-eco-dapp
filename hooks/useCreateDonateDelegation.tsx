import React from "react";
import useSmartAccount from "./useSmartAccount";
import { createDelegation } from "@metamask/delegation-toolkit";
import { parseUnits } from "viem";
import { Token } from "@/data/tokens";

const useCreateDonateDelegation = () => {
  const { getSmartWallet } = useSmartAccount();

  const delegate = async (token: Token, amount: string) => {
    try {
      const smartAccount = await getSmartWallet();
      const delegation = createDelegation({
        to: process.env.NEXT_PUBLIC_PLATFORM_SMART_ADDRESS as `0x${string}`,
        from: smartAccount.address,
        environment: smartAccount.environment,
        scope: {
          type: "erc20PeriodTransfer",
          tokenAddress: token.address as `0x${string}`,
          periodAmount: parseUnits(amount, token.decimal),
          periodDuration: 604800,
          startDate: Math.floor(Date.now() / 1000),
        },
      });
      return delegation;
    } catch (error) {
      throw new Error("Failed to create delegation!");
    }
  };

  const signDelegation = async (token: Token, amount: string) => {
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
