import React from "react";
import tokens from "@/data/tokens";
import TokenItem from "./Token";

const WalletTokens = () => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Your balance
      </li>

      {tokens.map((token) => (
        <TokenItem key={token.code} {...token} />
      ))}
    </ul>
  );
};

export default WalletTokens;
