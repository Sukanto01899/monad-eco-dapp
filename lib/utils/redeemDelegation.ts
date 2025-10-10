import {
  createPublicClient,
  encodeFunctionData,
  http,
  parseAbi,
  parseEther,
  parseUnits,
} from "viem";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import {
  createExecution,
  Delegation,
  ExecutionMode,
  getDeleGatorEnvironment,
} from "@metamask/delegation-toolkit";
import { monadTestnet } from "viem/chains";
import contracts from "@/contracts/abi/abi";
import { delegateWalletClient } from "./getPlatformSmartAccount";

const STAKING_CONTRACT = contracts.ECOStaking.address as `0x${string}`;

const publicClient = createPublicClient({
  transport: http(),
  chain: monadTestnet,
});

export const stakeDelegationRedeem = async (
  amount: string,
  signedDelegation: Delegation
) => {
  try {
    const delegations = [signedDelegation];

    const approveCalldata = encodeFunctionData({
      abi: parseAbi(["function approve(address,uint256)"]),
      functionName: "approve",
      args: [STAKING_CONTRACT, parseEther(amount)], // Allow staking contract to spend
    });

    const approveExecution = createExecution({
      target: contracts.EcoReward.address as `0x${string}`, // ERC20 token contract
      callData: approveCalldata,
    });
    console.log("Approve calldata:", approveCalldata);

    // 2. Create execution for staking
    const stakingCalldata = encodeFunctionData({
      abi: parseAbi(["function stake(uint256)"]),
      functionName: "stake",
      args: [parseEther(amount)],
    });

    console.log("Staking calldata:", stakingCalldata);

    const stakeExecutions = createExecution({
      target: STAKING_CONTRACT,
      callData: stakingCalldata,
    });

    // 3. Redeem delegation and execute stake
    const redeemApproveCalldata = DelegationManager.encode.redeemDelegations({
      delegations: [delegations],
      modes: [ExecutionMode.SingleDefault],
      executions: [[approveExecution]],
    });
    const redeemStakeCalldata = DelegationManager.encode.redeemDelegations({
      delegations: [delegations],
      modes: [ExecutionMode.SingleDefault],
      executions: [[stakeExecutions]],
    });

    const approveTx = await delegateWalletClient.sendTransaction({
      to: getDeleGatorEnvironment(monadTestnet.id).DelegationManager,
      data: redeemApproveCalldata,
      chain: monadTestnet,
    });

    // ✅ Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: approveTx,
      confirmations: 1, // Wait for 1 block confirmation
    });

    if (!receipt || receipt.status !== "success") {
      throw new Error("Approve transaction failed");
    }
    const stakeTx = await delegateWalletClient.sendTransaction({
      to: getDeleGatorEnvironment(monadTestnet.id).DelegationManager,
      data: redeemStakeCalldata,
      chain: monadTestnet,
    });

    if (!stakeTx) {
      throw new Error("Stake transaction failed");
    }
    console.log("Stake transaction hash:", stakeTx);
    return stakeTx;
  } catch (error) {
    console.error("Error in stakeDelegationRedeem:", error);
    throw error;
  }
};

export const unstakeDelegationRedeem = async (
  amount: string,
  signedDelegation: Delegation
) => {
  try {
    const delegations = [signedDelegation];

    const unstakingCalldata = encodeFunctionData({
      abi: parseAbi(["function unstake(uint256)"]),
      functionName: "unstake",
      args: [parseEther(amount)],
    });

    console.log("Unstaking calldata:", unstakingCalldata);

    const unstakeExecutions = createExecution({
      target: STAKING_CONTRACT,
      callData: unstakingCalldata,
    });

    // 3. Redeem delegation and execute unstake
    const redeemUnstakeCalldata = DelegationManager.encode.redeemDelegations({
      delegations: [delegations],
      modes: [ExecutionMode.SingleDefault],
      executions: [[unstakeExecutions]],
    });

    const unstakeTx = await delegateWalletClient.sendTransaction({
      to: getDeleGatorEnvironment(monadTestnet.id).DelegationManager,
      data: redeemUnstakeCalldata,
      chain: monadTestnet,
    });

    if (!unstakeTx) {
      throw new Error("Unstake transaction failed");
    }
    console.log("Unstake transaction hash:", unstakeTx);
    return unstakeTx;
  } catch (error) {
    console.error("Error in unstakeDelegationRedeem:", error);
    throw error;
  }
};
export const claimRewardsDelegationRedeem = async (
  signedDelegation: Delegation
) => {
  try {
    const delegations = [signedDelegation];

    const claimRewardsCalldata = encodeFunctionData({
      abi: parseAbi(["function claimRewards()"]),
      functionName: "claimRewards",
    });

    console.log("Claim rewards calldata:", claimRewardsCalldata);

    const claimRewardsExecutions = createExecution({
      target: STAKING_CONTRACT,
      callData: claimRewardsCalldata,
    });

    // 3. Redeem delegation and execute unstake
    const redeemClaimRewardsCalldata =
      DelegationManager.encode.redeemDelegations({
        delegations: [delegations],
        modes: [ExecutionMode.SingleDefault],
        executions: [[claimRewardsExecutions]],
      });

    const claimRewardsTx = await delegateWalletClient.sendTransaction({
      to: getDeleGatorEnvironment(monadTestnet.id).DelegationManager,
      data: redeemClaimRewardsCalldata,
      chain: monadTestnet,
    });

    if (!claimRewardsTx) {
      throw new Error("Claim rewards transaction failed");
    }
    console.log("Claim rewards transaction hash:", claimRewardsTx);
    return claimRewardsTx;
  } catch (error) {
    console.error("Error in claimRewardsDelegationRedeem:", error);
    throw error;
  }
};
export const transferDelegationRedeem = async (
  recipientAddress: `0x${string}`,
  amount: string,
  tokenContract: `0x${string}`,
  signedDelegation: Delegation,
  decimal: number
) => {
  try {
    const delegations = [signedDelegation];

    const transferCalldata = encodeFunctionData({
      abi: parseAbi(["function transfer(address,uint256)"]),
      functionName: "transfer",
      args: [recipientAddress, parseUnits(amount, decimal)],
    });

    console.log("Transfer calldata:", transferCalldata);

    const transferExecutions = createExecution({
      target: tokenContract,
      callData: transferCalldata,
    });

    // 3. Redeem delegation and execute unstake
    const redeemTransferCalldata = DelegationManager.encode.redeemDelegations({
      delegations: [delegations],
      modes: [ExecutionMode.SingleDefault],
      executions: [[transferExecutions]],
    });

    const transferTx = await delegateWalletClient.sendTransaction({
      to: getDeleGatorEnvironment(monadTestnet.id).DelegationManager,
      data: redeemTransferCalldata,
      chain: monadTestnet,
    });

    if (!transferTx) {
      throw new Error("Transfer transaction failed");
    }
    console.log("Transfer transaction hash:", transferTx);
    return transferTx;
  } catch (error) {
    console.error("Error in transferDelegationRedeem:", error);
    throw error;
  }
};

export default stakeDelegationRedeem;
