"use client";

import copyToClipboard from "@/lib/utils/copieText";
import React from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

const ViewSmartAddress = ({ children }: { children: string }) => {
  const handleCopy = async (textToCopy: string) => {
    await copyToClipboard(textToCopy);
    toast.success("Address Copied!");
  };
  return (
    <p className="text-xs flex justify-between items-center text-neutral-content bg-base-100 py-2 px-3 rounded-full">
      <span className="tracking-widest">{children}</span>
      <FaCopy
        onClick={() => handleCopy(children)}
        className="text-2xl p-1 hover:bg-base-200 rounded-full cursor-pointer"
      />
    </p>
  );
};

export default ViewSmartAddress;
