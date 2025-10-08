import { Delegation } from "@metamask/delegation-toolkit";

export type DonateDataType = {
  token: string;
  address: `0x${string}`;
  signDelegation: Delegation;
  amount: string;
};
