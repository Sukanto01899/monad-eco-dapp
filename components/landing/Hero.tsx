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
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
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
