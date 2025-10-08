import React from "react";
import CreateDonate from "./create-donate";
import AllDonate from "./all-donate";

const Donation = () => {
  return (
    <main>
      <div role="alert" className="alert bg-green-600/50">
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
          We use user donations to support verified environmental initiatives
          such as tree planting, recycling drives, and renewable energy
          projects. Every contribution directly funds eco-friendly actions,
          ensuring real-world impact and transparent usage through blockchain
          tracking.
        </span>
      </div>
      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Add Donation"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-200 p-10">
          <CreateDonate />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Your Donation"
        />
        <div className="tab-content border-base-300 bg-base-200 p-10">
          <AllDonate />
        </div>
      </div>
    </main>
  );
};

export default Donation;
