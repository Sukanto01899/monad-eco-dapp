"use client";
import React from "react";
import RecycleImage from "./recycle-image";
import { usePrivy } from "@privy-io/react-auth";

const Recycle = () => {
  const { user } = usePrivy();
  const testApi = async () => {
    const res = await fetch("/api/secure/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        smartAddress: "0x2000C13E94F45ba68ee3517aDbE6Ca382e6F0e20",
      }),
      credentials: "include",
    });
    const js = await res.json();
    console.log(js);
    console.log(user);
  };
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <RecycleImage />

      <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
        Previous proof
      </div>
    </div>
  );
};

export default Recycle;
