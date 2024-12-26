/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { UIStore } from "../Store";
function Navbar() {
  const uiStore = UIStore.useState();
  const [showMenu, setShowMenu] = useState(false);
  function handleShowMenu() {
    setShowMenu(!showMenu);
  }
  return (
    <div>
      <nav>
        <div className="mx-auto w-full sm:px-6">
          <div className="flex h-16 w-full">
            <div className="w-full flex items-center justify-between">
              <div className="flex-shrink-0 p-1">
                <div className="font-bold md:tracking-[10px] tracking-[5px] ml-[10px]">
                  UNILINKS ™
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Home
                  </a>

                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Features
                  </a>
                  {uiStore.userLoggedIn ? (
                    <>
                      <a
                        href="/logout"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {uiStore.userDetails[0]?.username}
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Login
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mr-1 flex md:hidden">
              <button
                onClick={handleShowMenu}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-black p-2 text-gray-400 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {showMenu && (
          <>
            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <a
                  href="#"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Features
                </a>
                {uiStore.userLoggedIn ? (
                  <>
                    <a
                      href="/"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {uiStore.userDetails[0]?.username}
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
