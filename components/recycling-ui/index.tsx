"use client";
import React from "react";
import RecycleImage from "./recycle-image";

const Recycle = () => {
  return (
    <main>
      <div role="alert" className="alert mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Upload a clear image as proof of your eco-friendly action (e.g.,
          recycling, tree planting, or public transport use). Ensure your proof
          is authentic before submitting.
        </span>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4">
        <RecycleImage />
      </div>
    </main>
  );
};

export default Recycle;
