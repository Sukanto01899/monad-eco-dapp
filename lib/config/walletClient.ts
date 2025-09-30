import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { monadTestnet } from "viem/chains";

if (!process.env.PRIVATE_KEY) {
  throw new Error("Private key not found!");
}

const rpcUrl = "https://monad-testnet.g.alchemy.com/v2/y-actUyaM6bEJqmVIO8p7";

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

const client = createWalletClient({
  account,
  chain: monadTestnet,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(rpcUrl),
});

export default client;
