import React from "react";
import { FaGift } from "react-icons/fa";

const RewardClaim = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaGift className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-neutral-content mb-2">
          100 ECO
        </h3>
        <p className="text-neutral-content">Available to Claim</p>
      </div>

      {/*<RewardHistory />*/}
      <div className="bg-base-100 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-content">Total Rewards Earned</span>
          <span className="font-semibold text-gray-800">456 ECO</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-content">Pending Rewards</span>
          <span className="font-semibold text-emerald-600">45 ECO</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-content">Already Claimed</span>
          <span className="font-semibold text-neutral-content">
            {(456 - 45).toFixed(2)} ECO
          </span>
        </div>
      </div>

      {/*Claim button  */}
      <button
        className="btn btn-primary w-full bg-gradient-to-r from-amber-500 to-orange-600 border-0 text-lg"
        // onClick={handleClaimRewards}
        disabled={parseFloat("345") <= 0}
      >
        Claim Rewards
      </button>
    </div>
  );
};

export default RewardClaim;
