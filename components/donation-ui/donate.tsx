import tokens from "@/data/tokens";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import {
  createCaveatEnforcerClient,
  Delegation,
} from "@metamask/delegation-toolkit";
import React, { useEffect, useState } from "react";
import { formatEther, formatUnits, parseUnits } from "viem";
import { usePublicClient } from "wagmi";

type DonateType = {
  max_amount: number;
  token: string;
  signDelegation: Delegation;
};

const Donate = ({ max_amount, token, signDelegation }: DonateType) => {
  const { environment } = usePimlicoServices();
  const publicClient = usePublicClient();
  const [availableAmount, setAvailableAmount] = useState<string | undefined>(
    undefined
  );

  const getDelegationState = async () => {
    if (!publicClient || !signDelegation) return;
    const caveatEnforcerClient = createCaveatEnforcerClient({
      environment,
      client: publicClient,
    });

    const decimal = tokens.find((t) => t.code === token)?.decimal;
    if (!decimal) return;

    const { availableAmount } =
      await caveatEnforcerClient.getErc20PeriodTransferEnforcerAvailableAmount({
        delegation: signDelegation,
      });

    return formatUnits(availableAmount, decimal);
  };

  useEffect(() => {
    getDelegationState().then((available) => setAvailableAmount(available));
  }, []);

  return (
    <div className="bg-base-100 p-4 rounded-lg space-y-2">
      <div
        onClick={getDelegationState}
        className="flex justify-between text-sm"
      >
        <span className="text-gray-500">Monthly Donated</span>
        <span className="font-semibold text-gray-200">
          {max_amount} {token}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Available</span>
        <span className="font-semibold text-gray-200">
          {availableAmount} {token}
        </span>
      </div>
    </div>
  );
};

export default Donate;
