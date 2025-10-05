"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
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
    <div className="fixed w-full navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          MonadEco
        </Link>
      </div>
      {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div> */}
      <div className="navbar-end">
        <button disabled={!isReady} onClick={handleOpenApp} className="btn">
          {isAuthenticated ? "Open app" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
