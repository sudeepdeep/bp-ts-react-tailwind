/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { UIStore } from "../Store";
import { Button } from "./Button";
import BgImg from "../assets/gray-textured-wall.jpg";
import {
  ActivateExploreIcon,
  ActivateMessageIcon,
  ActiveAdd,
  ActiveLocationIcon,
  Add,
  ExploreIcon,
  LocationIcon,
  MessageIcon,
} from "../assets/Icons";

function SideBar() {
  const [showLogged, setShowLogged] = useState(true);
  const menuLists = [
    {
      title: "My Links",
      path: "/my-links",
      icon: <ExploreIcon />,
      activeIcon: <ActivateExploreIcon />,
      active: false,
      isAuth: true,
    },

    {
      title: "Banners",
      path: "/banners",
      icon: <LocationIcon />,
      activeIcon: <ActiveLocationIcon />,
      active: false,
      isAuth: true,
    },

    // {
    //   title: "Inbox",
    //   path: "/inbox",
    //   icon: <MessageIcon />,
    //   activeIcon: <ActivateMessageIcon />,
    // },

    {
      title: "Analytics",
      path: "/analytics",
      icon: <Add />,
      activeIcon: <ActiveAdd />,
      active: false,
      isAuth: true,
    },
  ];

  const currentPath = window.location.pathname;

  const uiStore = UIStore.useState();
  useEffect(() => {
    console.log(uiStore.userLoggedIn);
    if (!uiStore.userLoggedIn) {
      setShowLogged(false);
    }
  }, []);
  console.log(showLogged);
  // if (!uiStore.userLoggedIn) return <></>;
  return (
    <>
      {/* big screen layout */}
      <div className="hidden md:block h-[80vh] w-auto m-[10px] rounded-lg relative">
        <div className=" rounded-lg inset-0 z-auto"></div>

        {showLogged ? (
          <>
            <div className="inside h-[80vh] w-[300px] rounded-lg flex flex-col items-center text-black">
              {menuLists.map((item) =>
                uiStore.userLoggedIn
                  ? item.isAuth && (
                      <>
                        <div
                          className={`w-[300px] h-[40px] cursor-pointer mb-3 text-center rounded-md text-white text-sm flex items-center justify-center font-medium ${
                            currentPath.includes(item.path) && "bg-gray-900"
                          } hover:text-[#1db954e1]`}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                        </div>
                      </>
                    )
                  : !item.isAuth && (
                      <>
                        <div
                          className={`w-[300px] h-[40px] cursor-pointer mb-3 text-center rounded-md text-white text-sm flex items-center justify-center font-medium ${
                            currentPath.includes(item.path) && "bg-gray-900"
                          } hover:text-[#1db954e1]`}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                        </div>
                      </>
                    )
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* small screen layout */}
      <div className="fixed md:hidden block h-[50px] w-[100%] bottom-0 rounded-t-lg bg-gradient-to-r from-[#1db954e1] to-[#17a74ae1]">
        <div className="w-[100%] h-[100%] flex items-center justify-around">
          {menuLists.map((item) => (
            <>{item.icon}</>
          ))}
        </div>
        {/* <div className="absolute h-[50px] w-[100%] bottom-0 bg-green-400 z-10"></div> */}
      </div>
    </>
  );
}

export default SideBar;
