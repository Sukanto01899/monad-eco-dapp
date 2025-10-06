"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const AuthBtn = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
    <button disabled={!isReady} onClick={handleOpenApp} className="btn">
      {isAuthenticated ? "Open app" : children}
    </button>
  );
};

export default AuthBtn;
