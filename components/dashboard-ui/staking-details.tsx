"use client";

import useUserStakeInfo from "@/hooks/useUserStakeInfo";
import React from "react";

const StakingDetails = () => {
  const { stakedAmount, pending } = useUserStakeInfo();
  return (
    <div className="card bg-base-300 image-full w-96 shadow-sm">
      <div className="card-body">
        <div className="stat-title">Your Total Stake</div>
        <div className="stat-value">{stakedAmount.slice(0, 6)} ECO</div>
        <div className="stat-desc">
          Total pending{" "}
          <span className="text-green-500">{pending.slice(0, 6)}</span> ECO
        </div>
      </div>
    </div>
  );
};

export default StakingDetails;
