import React from "react";
import DailyClaim from "./daily-claim";
import ProofState from "./proof-state";
import StakingDetails from "./staking-details";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center md:justify-start flex-wrap gap-4">
        <DailyClaim />
        <ProofState />
        <StakingDetails />
      </div>
    </div>
  );
};

export default Dashboard;
