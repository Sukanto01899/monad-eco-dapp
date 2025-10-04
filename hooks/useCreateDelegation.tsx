"use client";

import { createDelegation } from "@metamask/delegation-toolkit";
import React, { useState } from "react";
import useSmartAccount from "./useSmartAccount";
import contracts from "@/contracts/abi/abi";
import { parseEther, zeroAddress } from "viem";
import { usePimlicoServices } from "./usePimlicoServices";

const useCreateDelegation = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDelegating, setIsDelegating] = useState(false);
  const { getSmartWallet } = useSmartAccount();
  const { bundlerClient, pimlicoClient, paymasterClient } =
    usePimlicoServices();

  const deploySmartWallet = async () => {
    if (!pimlicoClient || !bundlerClient || !paymasterClient) {
      throw new Error("Client not found!");
    }
    try {
      setIsDeploying(true);
      const smartAccount = await getSmartWallet();
      const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();
      const userOperationHash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [
          {
            to: zeroAddress,
            value: parseEther("0"),
          },
        ],
        ...fee,
        paymaster: paymasterClient,
      });
      return userOperationHash;
    } catch (error) {
      throw new Error("Smart address deploying error!");
    } finally {
      setIsDeploying(false);
    }
  };

  const createDelegationForPlatform = async () => {
    try {
      setIsDelegating(true);
      const delegatorSmartAccount = await getSmartWallet();
      if (
        !delegatorSmartAccount ||
        !process.env.NEXT_PUBLIC_PLATFORM_SMART_ADDRESS
      ) {
        throw new Error("Delegator smart account not found");
      }
      const delegation = createDelegation({
        to: process.env.NEXT_PUBLIC_PLATFORM_SMART_ADDRESS as `0x${string}`,
        from: delegatorSmartAccount.address,
        environment: delegatorSmartAccount.environment,
        scope: {
          type: "functionCall",
          targets: [
            contracts.EcoReward.address as `0x${string}`,
            contracts.ECOStaking.address as `0x${string}`,
          ],
          selectors: [
            "approve(address, uint256)",
            "transfer(address, uint256)",
            "stake(uint256)",
            "unstake(uint256)",
            "claimRewards()",
          ],
        },
      });

      const signature = await delegatorSmartAccount.signDelegation({
        delegation,
      });

      const signedDelegation = {
        ...delegation,
        signature,
      };
      return signedDelegation;
    } catch (error) {
      throw new Error("Delegating error!");
    } finally {
      setIsDelegating(false);
    }
  };
  return {
    createDelegationForPlatform,
    deploySmartWallet,
    isDelegating,
    isDeploying,
  };
};

export default useCreateDelegation;
