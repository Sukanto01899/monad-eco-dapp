import Link from "next/link";
import React from "react";
import AuthBtn from "../common/AuthBtn";

const Header = () => {
  return (
    <div className="fixed w-full navbar bg-transparent">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          ECOReward
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
        <AuthBtn>Login</AuthBtn>
      </div>
    </div>
  );
};

export default Header;
