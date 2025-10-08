"use client";
import tokens from "@/data/tokens";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowDown } from "react-icons/fa";
import { parseUnits } from "viem";
import {
  useAccount,
  usePublicClient,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import BtnLoading from "../common/btn-loading";
import { monadTestnet } from "viem/chains";
import { useConnectWallet, useWallets } from "@privy-io/react-auth";

// 2. Define the minimal ERC-20 ABI for the 'transfer' function
const transferAbi = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const DepositToken = ({
  setStep,
  setTxHash,
  smartAddress,
}: {
  setStep: (step: "balance" | "send" | "status") => void;
  setTxHash: (txHash: string) => void;
  smartAddress: `0x${string}`;
}) => {
  const [selectedToken, setSelectedToken] = useState("");
  const [amount, setAmount] = useState("");
  const { writeContract, isPending } = useWriteContract();
  const publicClient = usePublicClient();
  const [isConfirming, setIsConfirming] = useState(false);
  const { isConnected, address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { connectWallet } = useConnectWallet();

  const handleDeposit = () => {
    if (!selectedToken) {
      return toast.error("Select token!");
    }
    if (!amount) {
      return toast.error("Enter amount!");
    }
    const token = tokens.find((t) => t.code === selectedToken);
    if (!token || !smartAddress) return;

    writeContract(
      {
        abi: transferAbi,
        address: token.address as `0x${string}`,
        functionName: "transfer",
        args: [
          smartAddress as `0x${string}`,
          parseUnits(amount, token.decimal),
        ],
      },
      {
        onSuccess: async (data) => {
          setAmount("");
          setIsConfirming(true);
          const receipt = await publicClient?.waitForTransactionReceipt({
            hash: data,
            confirmations: 1,
          });
          setIsConfirming(false);
          if (!receipt || receipt.status !== "success") {
            toast.error("Transaction failed");
          } else {
            toast.success("Deposit successful!");
            setTxHash(data);
            setStep("status");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleConnect = async () => {
    if (isConnected) {
      if (chainId !== monadTestnet.id) {
        try {
          await switchChainAsync({ chainId: monadTestnet.id });
          console.log("Successfully switched to Monad Testnet!");
        } catch (error) {
          console.error("Failed to switch chain:", error);
          throw error;
        }
      }
    } else {
      console.log("Already connected to Monad Testnet.");
    }
    return;
  };

  return (
    <div className="w-full mt-4">
      <div className=" mb-4 w-full flex flex-col items-center justify-center">
        <FaArrowDown className="text-5xl -rotate-[45deg] text-center" />
      </div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <div>
          <label className="label">Select token</label>

          <select
            onChange={(e) => setSelectedToken(e.target.value)}
            defaultValue="Select a token"
            className="select w-full"
          >
            <option disabled={true}>Select a token</option>
            {tokens.map((token, i) => (
              <option key={i} value={token.code}>
                {token.code}
              </option>
            ))}
          </select>
        </div>
        <label className="label">Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="input w-full"
          placeholder="0.00"
          value={amount}
        />

        {isConnected ? (
          chainId === monadTestnet.id ? (
            <button
              disabled={isPending || !amount || !selectedToken || isConfirming}
              onClick={handleDeposit}
              className="btn btn-neutral mt-4"
            >
              {(isPending || isConfirming) && <BtnLoading />}
              Confirm Deposit
            </button>
          ) : (
            <button onClick={handleConnect} className="btn btn-neutral mt-4">
              Switch Monad Testnet
            </button>
          )
        ) : (
          <button
            onClick={() => connectWallet()}
            className="btn btn-neutral mt-4"
          >
            Connect
          </button>
        )}
      </fieldset>

      <p className="text-center text-sm">
        EOA <span className="font-bold">{address}</span>
      </p>
    </div>
  );
};

export default DepositToken;
