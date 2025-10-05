"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const { login, isReady, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleOpenApp = () => {
    if (!isReady) return;
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      login();
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-center">
        <div className="max-w-md lg:max-w-lg xl:max-w-xl">
          <h1 className="text-5xl font-bold">
            A Gamified sustainability dApp <br /> built on the{" "}
            <span className="text-primary">Monad</span>
          </h1>
          <p className="py-6">
            EcoReward is a gamified sustainability dApp built on the Monad
            testnet, enabling users to earn EcoTokens by performing and
            verifying real-life eco-friendly actions such as recycling, walking,
            or using public transport.
          </p>
          <button
            disabled={!isReady}
            onClick={handleOpenApp}
            className="btn btn-primary"
          >
            {isAuthenticated ? "Open App" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
