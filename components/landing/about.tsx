import React from "react";
import AuthBtn from "../common/AuthBtn";

const About = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://cdn.pixabay.com/photo/2021/09/19/18/31/recyclable-6638729_1280.png"
          className="w-3/4 md:max-w-sm rounded-lg mx-auto"
        />
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">About ECOReward</h1>
          <p className="py-6 w-full">
            EcoReward is a sustainability-driven platform that empowers users to
            take meaningful eco-friendly actions — such as recycling, planting
            trees, and using public transport — and get rewarded with ECO
            tokens. <br /> Our mission is to inspire global environmental
            responsibility by turning everyday green activities into measurable
            and rewarding contributions. With features like proof submission,
            staking, and a community leaderboard, EcoReward combines blockchain
            transparency with real-world environmental impact. <br /> Join us in
            building a greener future, one action at a time. 🌍💚
          </p>
          <AuthBtn>Get Started</AuthBtn>
        </div>
      </div>
    </div>
  );
};

export default About;
