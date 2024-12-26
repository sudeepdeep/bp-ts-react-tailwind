import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios, { axiosErrorToast } from "../utils/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const GoogleAuth: React.FC = () => {
  const clientId: string =
    "181150036065-g7456u1ekrbv1l4d20qha28kbhtbsdgc.apps.googleusercontent.com";

  function handleUserSignUp(data: any) {
    axios
      .post("/auth/google-auth", data)
      .then((res) => {
        if (res.data.access_token) {
          Cookies.set("token", res.data.access_token);
          Cookies.set("userId", res.data.userId);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        axiosErrorToast(err);
      });
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse: any) => {
          handleUserSignUp(credentialResponse);
        }}
        onError={() => {
          toast.error("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
