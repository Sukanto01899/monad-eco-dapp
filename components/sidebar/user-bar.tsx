"use client";
import copyToClipboard from "@/lib/utils/copieText";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
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

  const handleCopy = async (textToCopy: string) => {
    await copyToClipboard(textToCopy);
    toast.success("EOA Address Copied!");
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
          <div className="text-xs flex items-center gap-2 uppercase font-semibold opacity-60">
            <span>
              {wallets[0]?.address.slice(0, 4)}...
              {wallets[0]?.address.slice(wallets[0]?.address.length - 4)}
            </span>
            <span
              className="cursor-pointer p-1 hover:bg-base-100 rounded-full"
              onClick={() => handleCopy(wallets[0]?.address)}
            >
              <FaCopy />
            </span>
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
