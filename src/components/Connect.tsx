import React from "react";
import { UIStore } from "../Store";

function Connect() {
  const uiStore = UIStore.useState();
  const userDetails = uiStore.userDetails[0];
  console.log(userDetails);
  return (
    <>
      <div className="bg-[#1DB954] mt-[120px] w-[200px] p-[15px] flex items-center justify-center rounded-lg cursor-pointer hover:border-[#1DB954] hover:border-[2px] hover:bg-black">
        <a
          href={
            !userDetails ? "/user-links" : `/my-links/${userDetails?.username}`
          }
        >
          Link Accounts
        </a>
      </div>
    </>
  );
}

export default Connect;
