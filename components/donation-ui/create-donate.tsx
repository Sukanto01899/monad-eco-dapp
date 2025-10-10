"use client";

import tokens from "@/data/tokens";
import { donateApi } from "@/endpoints/authApi";
import useSmartAccount from "@/hooks/useSmartAccount";
import { DonateDataType } from "@/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Modal from "../common/modal";
import ConfirmModal from "../earn-ui/confirm-modal";
import BtnLoading from "../common/btn-loading";
import toast from "react-hot-toast";
import useCreateDonateDelegation from "@/hooks/useCreateDonateDelegation";

const CreateDonate = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const { getSmartWallet } = useSmartAccount();
  const queryClient = useQueryClient();
  const { signDelegation } = useCreateDonateDelegation();

  const { mutate: donateMutate, isPending } = useMutation({
    mutationFn: async (params: DonateDataType) => {
      return await donateApi(params);
    },
    onSuccess: (data) => {
      setAmount("");
      if (data.isSuccess) {
        toast.success("Donate created!");
        queryClient.invalidateQueries({ queryKey: ["donations"] });
      } else {
        toast.error(data?.error || "Donate creating failed!");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong!");
    },
  });

  const handleCreateDonate = async () => {
    if (!selectedToken || !amount) return;
    const token = tokens.find((t) => t.code === selectedToken);
    if (!token) return;
    try {
      const signedDelegation = await signDelegation(token, amount);

      donateMutate({
        token: token.code,
        address: token.address as `0x${string}`,
        signDelegation: signedDelegation,
        amount,
      });
    } catch (error) {
      console.log(error);
      toast.error("Delegation error!");
    }
  };

  const openDonateConfirmModal = () => {
    const modal = document.getElementById(
      "donate_confirm_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <div className="w-full">
      <fieldset className="fieldset">
        <div>
          <legend className="fieldset-legend">
            Select Token for donation.
          </legend>
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

        <div>
          <legend className="fieldset-legend">
            Enter monthly donation amount.
          </legend>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            className="input w-full"
            required
            placeholder="Enter amount to donate"
            title="Enter amount to donate"
          />
        </div>

        {/* Details */}
        <div className="bg-base-100 p-4 rounded-lg space-y-2 my-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delegate Address </span>
            <span className="font-semibold text-gray-200">0x8A0f...0e83c</span>
          </div>
        </div>

        <button
          disabled={isPending}
          onClick={openDonateConfirmModal}
          className="btn bg-neutral w-full"
        >
          {isPending && <BtnLoading />}
          Create Delegation for Donation
        </button>
      </fieldset>

      <Modal>
        <ConfirmModal
          modalName="donate_confirm_modal"
          title="Confirm Donation"
          message={`Are you sure you want to donate ${amount} ${selectedToken}?`}
          confirmAction={handleCreateDonate}
        />
      </Modal>
    </div>
  );
};

export default CreateDonate;
