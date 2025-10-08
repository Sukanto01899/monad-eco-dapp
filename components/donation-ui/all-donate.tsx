"use client";
import { getDonationsApi } from "@/endpoints/authApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Donate from "./donate";
import { Delegation } from "@metamask/delegation-toolkit";

type DonateType = {
  max_amount: number;
  token: string;
  signDelegation: Delegation;
};

const AllDonate = () => {
  const { data: donateData, isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      return await getDonationsApi();
    },
  });

  return (
    <div className="w-full space-y-2">
      {isLoading ? (
        <div className="w-full flex justify-center mt-44">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        donateData &&
        donateData?.donations &&
        donateData?.donations?.map((donate: DonateType, i: number) => (
          <Donate key={i} {...donate} />
        ))
      )}
    </div>
  );
};

export default AllDonate;
