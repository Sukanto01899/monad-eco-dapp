"use client";
import AppHeader from "@/components/common/app-header";
import Sidebar from "@/components/sidebar/side-bar";
import CreateSmartAccount from "@/components/user-wallet/create-smart-accoun";
import useSmartAddress from "@/hooks/useSmartAddress";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const { smartUser, isSmartUserLoading, refetch } = useSmartAddress();

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (ready && !authenticated) {
    router.push("/");
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <AppHeader />

        <div className="p-4">
          {isSmartUserLoading ? (
            <div className="flex flex-col w-full justify-center items-center h-40">
              <span className="loading loading-ring loading-xl"></span>
              <p className="text-xs">Please wait...</p>
            </div>
          ) : smartUser?.user ? (
            children
          ) : (
            <div className="max-w-3xl mx-auto">
              <CreateSmartAccount refetch={refetch} />
              <h3 className="text-lg font-semibold text-center">
                Create smart account to perform actions!
              </h3>
            </div>
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
