"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

const UserBar = () => {
  const { user, logout } = usePrivy();
  const { wallets } = useWallets();
  return (
    <div className="flex items-center justify-between bg-base-300 backdrop-blur-md p-2 rounded-md">
      <Link href="/profile" className="flex items-center gap-2">
        <div>
          <img
            className="size-10 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div>
          <div>{user?.email?.address.split("@")[0]}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {wallets[0]?.address.slice(0, 12)}
          </div>
        </div>
      </Link>
      <button onClick={() => logout()} className="btn btn-square btn-ghost">
        <IoIosLogOut className="text-2xl text-red-500" />
      </button>
    </div>
  );
};

export default UserBar;
