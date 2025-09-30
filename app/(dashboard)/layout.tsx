"use client";
import AppHeader from "@/components/common/app-header";
import Sidebar from "@/components/sidebar/side-bar";
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

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (ready && !authenticated) {
    // Replace this code with however you'd like to handle an unauthenticated user
    // As an example, you might redirect them to a login page
    router.push("/auth");
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <AppHeader />

        <div className="p-4">{children}</div>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
