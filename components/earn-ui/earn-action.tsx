import React from "react";
import Stake from "./stake";
import Unstake from "./Unstake";
import RewardClaim from "./rewards-claim";

const EarnAction = () => {
  return (
    <div className="tabs tabs-border">
      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="Stake"
        defaultChecked
      />
      <div className="tab-content border-base-300 bg-base-200 p-10">
        <Stake />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="Unstake"
      />
      <div className="tab-content border-base-300 bg-base-200 p-10">
        <Unstake />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="Rewards"
      />
      <div className="tab-content border-base-300 bg-base-200 p-10">
        <RewardClaim />
      </div>
    </div>
  );
};

export default EarnAction;
