"use client";
import { saveUserApi } from "@/endpoints/authApi";
import useSmartAccount from "@/hooks/useSmartAccount";
import { usePrivy } from "@privy-io/react-auth";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";
import { error } from "console";
import React from "react";

const CreateSmartAccount = ({ refetch }: { refetch: () => void }) => {
  const { getSmartWallet } = useSmartAccount();
  const {
    mutate: handleSmartAccount,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const smartAddress = await getSmartWallet();
      console.log(smartAddress);
      return await saveUserApi(smartAddress.address as string);
    },
    onSuccess: (data) => {
      if (data.hash) {
        refetch();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="card w-full flex items-center bg-base-100 shadow-sm">
      <div className="card-body w-full flex flex-col  items-center">
        <h2 className="text-3xl font-bold">Create Smart Account</h2>

        <ul className="mt-6 flex flex-col gap-2 text-xs">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>High-resolution image generation</span>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Customizable style templates</span>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Batch processing capabilities</span>
          </li>
        </ul>
        <div className="mt-6 w-full">
          <button
            disabled={isPending}
            onClick={() => handleSmartAccount()}
            className="btn btn-primary w-full"
          >
            {isSuccess
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
