"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivyProviders from "./privy-provider";
import WagmiProvider from "./wagmi-provider";

const queryClient = new QueryClient();

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivyProviders>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProviders>
  );
}
