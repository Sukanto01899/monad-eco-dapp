import contracts from "@/contracts/abi/abi";
import client, { publicClient } from "../config/walletClient";

export const saveUser = async (user: string[]) => {
  const gasEstimate = await publicClient.estimateContractGas({
    address: contracts.EcoUser.address as `0x${string}`,
    abi: contracts.EcoUser.abi,
    functionName: "registerUser",
    args: [...user],
    account: "0x8A0f614d04B4205564234ba53D518362F200e83c", // The sender
  });
  console.log("Estimated Gas:", gasEstimate);

  const txHash = await client.writeContract({
    address: contracts.EcoUser.address as `0x${string}`,
    abi: contracts.EcoUser.abi,
    functionName: "registerUser",
    args: [...user],
  });
  return txHash;
};

export const sendReward = async (address: string, rewardType: number) => {
  try {
    const txHash = await client.writeContract({
      address: contracts.EcoRewardDistributor.address as `0x${string}`,
      abi: contracts.EcoRewardDistributor.abi,
      functionName: "distributeReward",
      args: [address, rewardType],
    });
    return txHash;
  } catch (error) {
    console.log(error);
  }
};
