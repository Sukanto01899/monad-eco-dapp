import React from "react";

const DailyClaim = () => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Claim daily reward!</h2>
        <p>
          Claim your daily reward and contribute to environmental sustainability
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">coming soon</button>
        </div>
      </div>
    </div>
  );
};

export default DailyClaim;
