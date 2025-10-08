"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useChains } from "wagmi";

const UserBar = () => {
  const { logout } = usePrivy();
  const router = useRouter();
  const { wallets } = useWallets();
  const chain = useChains();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="flex items-center justify-between bg-base-300 backdrop-blur-md p-2 rounded-md">
      <div className="flex items-center gap-2">
        <div>
          <img
            className="size-10 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div>
          <div>{chain[0].name}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {wallets[0]?.address.slice(0, 4)}...
            {wallets[0]?.address.slice(wallets[0]?.address.length - 4)}
          </div>
        </div>
      </div>
      <button onClick={handleLogout} className="btn btn-square btn-ghost">
        <IoIosLogOut className="text-2xl text-red-500" />
      </button>
    </div>
  );
};

export default UserBar;
