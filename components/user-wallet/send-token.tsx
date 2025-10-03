import contracts from "@/contracts/abi/abi";
import tokens, { Token } from "@/data/tokens";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import useSmartAccount from "@/hooks/useSmartAccount";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa";
import { parseAbi, parseEther, parseUnits } from "viem";

const SendToken = ({
  setStep,
}: {
  setStep: (step: "balance" | "send" | "status") => void;
}) => {
  const { getSmartWallet } = useSmartAccount();
  const { bundlerClient, pimlicoClient, paymasterClient } =
    usePimlicoServices();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendToken = async () => {
    if (!bundlerClient || !pimlicoClient) {
      toast("Something wrong!", { position: "top-right" });
      return;
    }
    if (!selectedToken) {
      toast("Select token!", { position: "top-right" });
      return;
    }
    if (!toAddress || !toAddress.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      toast("Invalid address!", { position: "top-right" });
      return;
    }
    if (!amount || (amount && parseFloat(amount) < 0)) {
      toast("Invalid amount!", { position: "top-right" });
      return;
    }
    try {
      setIsLoading(true);
      const smartAccount = await getSmartWallet();
      const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();
      const method = {
        MON: {
          to: toAddress as `0x${string}`,
          value: parseEther(amount),
        },
        ECO: {
          to: contracts.EcoReward.address as `0x${string}`,
          abi: parseAbi(["function transfer(address,uint256)"]),
          functionName: "transfer",
          args: [toAddress, parseUnits(amount, 18)],
        },
      };
      const selectedMethod =
        selectedToken.code === "MON" ? method.MON : method.ECO;
      const userOperationHash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [selectedMethod],
        ...fee,
        paymaster: paymasterClient,
      });

      if (userOperationHash) {
        setStep("status");
      }
    } catch (error) {
      console.log(error);
      toast("Something wrong", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full mt-6">
      <div className="filter mb-4">
        <input
          className="btn filter-reset"
          type="radio"
          name="token"
          aria-label="All"
        />
        {tokens.map((token, index) => (
          <input
            key={index}
            onChange={() => setSelectedToken(token)}
            className="btn"
            type="radio"
            name="token"
            aria-label={token.code}
          />
        ))}
      </div>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <label className="label">Address</label>
        <input
          onChange={(e) => setToAddress(e.target.value)}
          type="text"
          className="input w-full"
          placeholder="0x......."
        />

        <label className="label">Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="input w-full"
          placeholder="0.00"
        />

        <button
          onClick={handleSendToken}
          disabled={isLoading}
          className="btn btn-neutral mt-4"
        >
          Send {selectedToken && selectedToken.code} <FaRocket />
        </button>
        <button
          onClick={() => setStep("balance")}
          className="btn btn-ghost text-red-500 mt-2"
        >
          Cancel
        </button>
      </fieldset>
    </div>
  );
};

export default SendToken;
