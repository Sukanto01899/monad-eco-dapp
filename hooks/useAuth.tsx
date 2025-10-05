"use client";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import React from "react";

const useAuth = () => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const { login } = useLogin({
    onComplete: ({
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    }) => {
      if (isNewUser) {
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    login,
    isReady: ready,
    isAuthenticated: authenticated,
  };
};

export default useAuth;
