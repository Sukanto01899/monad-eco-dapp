"use client";
import { useGetUserTotalProof } from "@/hooks/useEnvio";
import useSmartAddress from "@/hooks/useSmartAddress";
import React from "react";

const ProofState = () => {
  const { smartUser } = useSmartAddress();
  const { data } = useGetUserTotalProof(smartUser?.user?.smart_address);

  return (
    <div className="card bg-base-300 image-full w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Your Verified Proofs</h2>
        <div className="stat-value">{data?.length}</div>
        <div className="stat-desc">Total earned {data?.length * 100} ECO</div>
      </div>
    </div>
  );
};

export default ProofState;
