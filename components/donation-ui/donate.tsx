import useCreateDonateDelegation from "@/hooks/useCreateDonateDelegation";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import { createCaveatEnforcerClient } from "@metamask/delegation-toolkit";
import React from "react";
import { usePublicClient } from "wagmi";

const Donate = ({ max_amount, token, signDelegation }: any) => {
  const { environment } = usePimlicoServices();
  const publicClient = usePublicClient();

  const getDelegationState = async () => {
    if (!publicClient) return;
    const caveatEnforcerClient = createCaveatEnforcerClient({
      environment,
      client: publicClient,
    });

    const { availableAmount } =
      await caveatEnforcerClient.getErc20PeriodTransferEnforcerAvailableAmount({
        delegation: signDelegation,
      });

    console.log(availableAmount);

    return availableAmount;
  };

  return (
    <div className="bg-base-100 p-4 rounded-lg space-y-2">
      <div
        onClick={getDelegationState}
        className="flex justify-between text-sm"
      >
        <span className="text-gray-500">Monthly Donation Amount</span>
        <span className="font-semibold text-gray-200">
          {max_amount} {token}
        </span>
      </div>
      {/* <div className="flex justify-between text-sm">
        <span className="text-gray-500">Consumed</span>
        <span className="font-semibold text-gray-200">324 ECO</span>
      </div> */}
    </div>
  );
};

export default Donate;
