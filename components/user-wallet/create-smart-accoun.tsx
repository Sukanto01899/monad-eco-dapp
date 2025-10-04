"use client";
import { saveUserApi } from "@/endpoints/authApi";
import useCreateDelegation from "@/hooks/useCreateDelegation";
import useSmartAccount from "@/hooks/useSmartAccount";
import { Delegation } from "@metamask/delegation-toolkit";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import BtnLoading from "../common/btn-loading";

const CreateSmartAccount = ({ refetch }: { refetch: () => void }) => {
  const { getSmartWallet } = useSmartAccount();
  const {
    createDelegationForPlatform,
    deploySmartWallet,
    isDelegating,
    isDeploying,
  } = useCreateDelegation();

  const {
    mutate: handleSmartAccountMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["createSmartAccount"],
    mutationFn: async ({
      smartAddress,
      delegation,
    }: {
      smartAddress: `0x${string}`;
      delegation: Delegation;
    }) => {
      return await saveUserApi(smartAddress, delegation);
    },
    onSuccess: (data) => {
      if (data.user) {
        refetch();
      }
    },
    onError: (error) => {
      toast.error("Smart account creating error!");
      console.log(error);
    },
  });

  const handleCreateSmartAccount = async () => {
    try {
      const smartAddress = await getSmartWallet();
      const deployHash = await deploySmartWallet();
      if (!deployHash) {
        return toast.error("Failed to deploy", {
          position: "top-right",
        });
      }

      const delegation = await createDelegationForPlatform();
      if (!delegation || !smartAddress)
        return toast.error("Failed to create delegation", {
          position: "top-right",
        });

      handleSmartAccountMutate({
        smartAddress: smartAddress.address,
        delegation,
      });
    } catch (error) {
      console.log(error);
      return toast.error("Failed to create smart account!", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="card w-full flex items-center bg-base-100 shadow-sm">
      <div className="card-body w-full flex flex-col  items-center">
        <h2 className="text-3xl font-bold">Create Smart Account</h2>

        <ul className="mt-6 flex flex-col gap-2 text-xs">
          <li>
            <FaCheck className="size-4 me-2 inline-block text-success" />
            <span>Secure and user-friendly wallet!</span>
          </li>
          <li>
            <FaCheck className="size-4 me-2 inline-block text-success" />
            <span>Gasless transactions!</span>
          </li>
          <li>
            <FaCheck className="size-4 me-2 inline-block text-success" />
            <span>Batch processing capabilities!</span>
          </li>
          <li>
            <FaCheck className="size-4 me-2 inline-block text-success" />
            <span>No wallet signature required!</span>
          </li>
        </ul>
        <div className="mt-6 w-full">
          <button
            disabled={isPending || isDelegating || isDeploying}
            onClick={() => handleCreateSmartAccount()}
            className="btn btn-primary w-full"
          >
            {(isPending || isDelegating || isDeploying) && <BtnLoading />}
            {isDeploying
              ? "Deploying"
              : isDelegating
              ? "Delegating"
              : isSuccess
              ? "Success"
              : isPending
              ? "Creating..."
              : "Create Smart Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSmartAccount;
