import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { monadTestnet } from "viem/chains";

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not defined in environment variables");
}
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const transport = http();

export const walletClient = createWalletClient({
  account,
  chain: monadTestnet,
  transport,
});

export const delegateWalletClient = createWalletClient({
  account: account,
  chain: monadTestnet,
  transport: http(),
});
