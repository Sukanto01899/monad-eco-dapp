"use client";
import React, { useRef } from "react";
import UserBar from "./user-bar";
import Link from "next/link";
import { action_items } from "@/data/action-item";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const drawerLabelRef = useRef<HTMLLabelElement | null>(null);
  const path = usePathname();
  const closeDrawer = () => {
    if (drawerLabelRef.current) {
      drawerLabelRef.current.click();
    }
  };
  return (
    <div className="drawer-side z-50">
      <label
        ref={drawerLabelRef}
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu bg-base-200 text-base-content min-h-full w-60 lg:w-80 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center w-full border-b border-base-100 pb-4">
            <h1 className="text-3xl">ECOReward</h1>
            <p className="text-xs text-center text-neutral-content">
              Transform Waste, Transform the World!
            </p>
          </div>
          {/* Sidebar content here */}
          <ul className="space-y-4">
            {action_items.map((action) => (
              <li onClick={closeDrawer} className={`text-md`} key={action.id}>
                <Link
                  href={action.route}
                  className={`text-md ${path === action.route && "bg-neutral"}`}
                >
                  <action.Icon />
                  {action.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <UserBar />
      </div>
    </div>
  );
};

export default Sidebar;
