import { Token } from "@/data/tokens";
import useSmartAccount from "@/hooks/useSmartAccount";
import useSmartAddress from "@/hooks/useSmartAddress";
import React from "react";
import { useBalance } from "wagmi";

const TokenItem = ({ name, code, address }: Token) => {
  const { smartAddress: smartAccountAddress } = useSmartAccount();
  const { smartUser } = useSmartAddress();
  const { data } = useBalance({
    address: smartUser?.user?.smart_address as `0x${string}`,
    token: address === "" ? undefined : (address as `0x${string}`),
  });

  return (
    <li className="list-row">
      <div>
        <img
          className="size-10 rounded-box"
          src="https://media.istockphoto.com/id/1045368942/vector/abstract-green-leaf-logo-icon-vector-design-ecology-icon-set-eco-icon.jpg?s=612x612&w=0&k=20&c=XIfHMI8r1G73blCpCBFmLIxCtOLx8qX0O3mZC9csRLs="
        />
      </div>
      <div>
        <div>{name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">{code}</div>
      </div>
      <div className="text-xs uppercase font-semibold opacity-60">
        {data?.formatted.slice(0, 8)}
      </div>
    </li>
  );
};

export default TokenItem;
