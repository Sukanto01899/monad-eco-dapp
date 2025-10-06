"use client";
import React from "react";
import RecycleImage from "./recycle-image";

const Recycle = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <RecycleImage />

      <div className="card bg-base-300 rounded-box grid  grow place-items-center">
        <figure className="bg-base-200 w-80 h-60 relative border border-dashed border-white cursor-pointer">
          <img className="w-full h-full" src="/recycle-demo.jpg" />
        </figure>
      </div>
    </div>
  );
};

export default Recycle;
