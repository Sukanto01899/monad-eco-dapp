import tokens from "@/data/tokens";
import { transferApi } from "@/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa";
import BtnLoading from "../common/btn-loading";
import { useBalance } from "wagmi";
import { MdSend } from "react-icons/md";

const SendToken = ({
  setStep,
  setTxHash,
  smartAddress,
}: {
  setStep: (step: "balance" | "send" | "status") => void;
  setTxHash: (txHash: string) => void;
  smartAddress: `0x${string}`;
}) => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const { data: balance } = useBalance({
    address: smartAddress,
    token: tokens.find((t) => t.code === selectedToken)
      ?.address as `0x${string}`,
  });

  const {
    mutate: transferMutate,
    isPending,
    isError,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: async () => {
      return await transferApi(
        toAddress as `0x${string}`,
        amount,
        selectedToken
      );
    },
    onSuccess(data) {
      if (data?.isSuccess) {
        toast.success("Send successful!");
        setTxHash(data?.transactionHash);
        setStep("status");
      } else {
        toast.error(data?.error || "Send failed!");
      }
    },
    onError(error) {
      console.log(error);
      toast.error("Sending failed!");
    },
    onSettled() {
      setAmount("");
      setToAddress("");
    },
  });

  const handleSendToken = async () => {
    if (!selectedToken || !tokens.some((t) => t.code === selectedToken)) {
      toast.error("Select a token!");
      return;
    }
    if (!toAddress || !toAddress.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      toast.error("Invalid address!");
      return;
    }
    if (!amount || (amount && parseFloat(amount) < 0)) {
      toast.error("Invalid amount!");
      return;
    }

    transferMutate();
  };
  return (
    <div className="w-full mt-4">
      <div className=" mb-4 w-full flex flex-col items-center justify-center">
        <MdSend className="text-5xl -rotate-[45deg] text-center" />
      </div>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <div>
          <div className="mb-2 flex justify-between">
            <label className="label">Select token</label>
            {selectedToken && (
              <label className="label">
                {balance && balance.formatted.slice(0, 6)} {balance?.symbol}
              </label>
            )}
          </div>
          <select
            onChange={(e) => setSelectedToken(e.target.value)}
            defaultValue="Select a token"
            className="select w-full"
          >
            <option disabled={true}>Select a token</option>
            {tokens.map((token) => (
              <option value={token.code}>{token.code}</option>
            ))}
          </select>
        </div>
        <label className="label">Address</label>
        <input
          onChange={(e) => setToAddress(e.target.value)}
          type="text"
          value={toAddress}
          className="input w-full"
          placeholder="0x......."
        />

        <label className="label">Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="input w-full"
          placeholder="0.00"
          value={amount}
        />

        <button
          onClick={handleSendToken}
          disabled={isPending || !amount || !toAddress || !selectedToken}
          className="btn btn-neutral mt-4"
        >
          {isPending && <BtnLoading />}
          Send {amount} {selectedToken} <FaRocket />
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
