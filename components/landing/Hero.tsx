"use client";
import React from "react";
import AuthBtn from "../common/AuthBtn";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content flex-col lg:flex-row items-center pt-16 pb-16 lg:py-0 gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold">
            A Gamified sustainability dApp <br /> on{" "}
            <span className="text-primary">Monad</span>
          </h1>
          <p className="py-6">
            EcoReward is a gamified sustainability dApp built on the Monad
            testnet, enabling users to earn EcoTokens by performing and
            verifying real-life eco-friendly actions such as recycling, walking,
            or using public transport.
          </p>
          <AuthBtn>Get Started</AuthBtn>
        </div>

        <img
          src="/banner.png"
          className="w-3/4 md:max-w-sm rounded-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
