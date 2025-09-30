"use client";
// import { publicClient } from "@/lib/utils/createSmartWallet";
import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useCallback, useEffect, useState, useRef } from "react";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";
import { usePublicClient } from "wagmi";

const STORAGE_KEY = "smartAddress";

const useSmartAccount = () => {
  const [smartAddress, setSmartAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const publicClient = usePublicClient();

  // Cache the smart account instance to avoid recreating it
  const smartAccountRef = useRef<MetaMaskSmartAccount | null>(null);

  const { wallets } = useWallets();
  const { user } = usePrivy();
  const userWallet = wallets[0];

  // Create smart wallet instance (called once)
  const createSmartWallet =
    useCallback(async (): Promise<MetaMaskSmartAccount> => {
      console.log(user);
      console.log(wallets);
      if (!userWallet || !publicClient) {
        throw new Error("User wallet not found");
      }

      // Return cached instance if available
      if (smartAccountRef.current) {
        return smartAccountRef.current;
      }

      setIsLoading(true);
      setError(null);

      try {
        const address = userWallet.address as `0x${string}`;
        const eip1193provider = await userWallet.getEthereumProvider();

        const walletClient = createWalletClient({
          account: address,
          chain: mainnet,
          transport: custom(eip1193provider),
        });

        const smartAccount = await toMetaMaskSmartAccount({
          client: publicClient,
          implementation: Implementation.Hybrid,
          deployParams: [address, [], [], []],
          deploySalt: "0x",
          signer: { walletClient },
        });

        // Cache the smart account instance
        smartAccountRef.current = smartAccount;

        return smartAccount;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    }, [userWallet]);

  // Get smart wallet for operations (reuses existing instance)
  const getSmartWalletForOperation =
    useCallback(async (): Promise<MetaMaskSmartAccount> => {
      // Return cached instance if available
      if (smartAccountRef.current) {
        return smartAccountRef.current;
      }

      // Create new instance if not cached
      return await createSmartWallet();
    }, [createSmartWallet]);

  // Initialize smart wallet (called once on mount)
  const initializeSmartWallet = useCallback(async () => {
    if (!userWallet) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if we already have a stored address
      const storedAddress = localStorage.getItem(STORAGE_KEY);

      if (storedAddress) {
        setSmartAddress(storedAddress);
        // Don't create the smart account yet, just store the address
        return;
      }

      // Create smart wallet instance to get the address
      const smartAccount = await createSmartWallet();
      const newAddress = smartAccount.address;

      localStorage.setItem(STORAGE_KEY, newAddress);
      setSmartAddress(newAddress);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to initialize smart wallet";
      setError(errorMessage);
      console.error("Smart wallet initialization error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userWallet, createSmartWallet]);

  // Clear cached instance when wallet changes
  useEffect(() => {
    smartAccountRef.current = null;
  }, [userWallet?.address]);

  useEffect(() => {
    initializeSmartWallet();
  }, [initializeSmartWallet]);

  return {
    smartAddress,
    isLoading,
    error,
    // Use this if you need direct access to the smart account
    getSmartWallet: getSmartWalletForOperation,
  };
};

export default useSmartAccount;
