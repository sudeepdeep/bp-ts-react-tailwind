import Cookies from "js-cookie";
import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    console.log("valasajsd");
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("username");
    window.location.href = "/login";
  }, []);
  return <div>Logging out....</div>;
}

export default Logout;
