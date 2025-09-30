"use client";

import { createConfig } from "@privy-io/wagmi";
import { monadTestnet } from "viem/chains";
import { http } from "wagmi";
import { WagmiProvider as WagmiBaseProvider } from "@privy-io/wagmi";

export const config = createConfig({
  chains: [monadTestnet], // Pass your required chains as an array
  transports: {
    [monadTestnet.id]: http(),
    // For each of your required chains, add an entry to `transports` with
    // a key of the chain's `id` and a value of `http()`
  },
});

export default function WagmiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WagmiBaseProvider config={config}>{children}</WagmiBaseProvider>;
}
