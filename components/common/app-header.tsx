import { action_items } from "@/data/action-item";
import { usePathname } from "next/navigation";
import React from "react";
import { FaWallet } from "react-icons/fa";
import Modal from "./modal";
import UserWallet from "../user-wallet";

const AppHeader = () => {
  const path = usePathname();
  const action_name = action_items.find((action) => action.route === path);
  const openWallet = () => {
    const modal = document.getElementById("wallet_modal") as HTMLDialogElement;
    if (modal) {
      modal.show();
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </label>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">
          {action_name && action_name.name}
        </a>
      </div>
      <div className="navbar-end">
        {/* Wallet action */}
        <button
          onClick={() => openWallet()}
          className="btn btn-dash btn-circle p-1"
        >
          <div className="indicator">
            <FaWallet className="text-2xl" />
            <Modal>
              <UserWallet />
            </Modal>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
