"use client";

import React from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

const Sign = () => {
  const { login, isReady } = useAuth();
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/eco-banner.png"
              alt="aco-banner"
              width={400}
              height={400}
            />
          </div>
          <button
            disabled={!isReady}
            onClick={() => login()}
            className="btn bg-neutral text-neutral-content"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sign;
