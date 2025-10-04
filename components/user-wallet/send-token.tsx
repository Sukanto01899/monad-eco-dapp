import tokens, { Token } from "@/data/tokens";
import { transferApi } from "@/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa";
import BtnLoading from "../common/btn-loading";
import { useBalance } from "wagmi";
import contracts from "@/contracts/abi/abi";

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
  const { data: balance } = useBalance({
    address: smartAddress,
    token: contracts.EcoReward.address as `0x${string}`,
  });

  const {
    mutate: transferMutate,
    isPending,
    isError,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: async () => {
      return await transferApi(toAddress as `0x${string}`, amount);
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
      toast.error("Sending failed!");
    },
    onSettled() {
      setAmount("");
      setToAddress("");
    },
  });

  const handleSendToken = async () => {
    if (!toAddress || !toAddress.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      toast.error("Invalid address!", { position: "top-right" });
      return;
    }
    if (!amount || (amount && parseFloat(amount) < 0)) {
      toast.error("Invalid amount!", { position: "top-right" });
      return;
    }

    transferMutate();
  };
  return (
    <div className="w-full mt-4">
      <div className=" mb-4 w-full flex flex-col items-center justify-center">
        <div className="avatar">
          <div className="w-18 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>

        <p className="text-neutral-content text-bold">
          Balance: {balance?.formatted.slice(0, 8)} ECO
        </p>
      </div>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
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
        />

        <button
          onClick={handleSendToken}
          disabled={isPending || !amount || !toAddress}
          className="btn btn-neutral mt-4"
        >
          {isPending && <BtnLoading />}
          Send <FaRocket />
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
