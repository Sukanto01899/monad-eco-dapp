"use client";
import React, { useState } from "react";

const Stake = () => {
  const [amount, setAmount] = useState("");

  const handleMax = () => {
    // Set the amount to the maximum available balance
    setAmount("0.00"); // Replace with actual max balance
  };

  const handleStake = () => {
    // Handle the staking logic here
    console.log(`Staking ${amount} ECO Tokens`);
  };

  return (
    <div className="w-full">
      <fieldset className="fieldset">
        <div className="fieldset-header flex justify-between">
          <legend className="fieldset-legend">Amount to Stake</legend>
          <legend className="fieldset-legend">Balance: 0.00</legend>
        </div>
        <div className="w-full relative">
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="input w-full"
            placeholder="0.00"
          />
          <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-300 bg-neutral px-2 py-1 rounded-lg cursor-pointer">
            MAX
          </span>
        </div>
      </fieldset>

      <div className="bg-base-100 p-4 rounded-lg space-y-2 my-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Current APY</span>
          <span className="font-semibold text-emerald-600">5%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimated Daily Rewards</span>
          <span className="font-semibold text-gray-200">100 ECO</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Minimum Lock Period</span>
          <span className="font-semibold text-gray-200">7 Days</span>
        </div>
      </div>

      <button className="btn bg-neutral">Stake ECO Tokens</button>
    </div>
  );
};

export default Stake;
