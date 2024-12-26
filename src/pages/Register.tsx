import Cookies from "js-cookie";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/earth.json";
import { Button } from "../components/Button";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import axios, { axiosErrorToast } from "../utils/axios";
import { toast } from "react-toastify";
import Logo_UI from "../assets/logo_ui.png";
import {
  CorrectIcon,
  ShowOffIcon,
  ShowOnIcon,
  WrongIcon,
} from "../assets/Icons";
import GoogleAuth from "../components/GoogleAuth";

// Define a type for userData
interface UserData {
  username: string;
  password: string;
  repassword: string;
  email: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userAvailable, setUserAvailable] = useState<boolean | null>(null);
  const existingUser = Cookies.get("token");

  // Define state with typed user data
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
    repassword: "",
    email: "",
  });

  // If a token exists, remove it (this ensures a fresh state)
  useEffect(() => {
    console.log("called");
    if (existingUser) {
      // Cookies.remove("token");
    }
  }, [existingUser]);

  // Check if the username is available
  useEffect(() => {
    if (userData.username.length > 5) {
      handleCheckUsernameAvailable(userData.username);
    }
    setUserAvailable(null);
  }, [userData.username]);

  // Registration logic
  const handleRegister = () => {
    if (userData.password !== userData.repassword) {
      toast.error("Passwords did not match");
      return;
    }

    setLoading(true);

    axios
      .post("/auth/registration", {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        applicationType: "unilinks",
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data, "responsedata");
        Cookies.set("username", userData.username);
        Cookies.set("token", res.data.access_token);
        Cookies.set("userId", res.data.userId);
        window.location.href = "/success";
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  };

  // Username availability check
  const handleCheckUsernameAvailable = (username: string) => {
    axios.get(`/user/${username}/check-username`).then((res) => {
      if (res.data.success === "true") {
        setUserAvailable(true);
      } else {
        setUserAvailable(false);
      }
    });
  };

  // Toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="w-full min-h-[100vh] h-auto flex justify-center md:bg-black bg-[#161B22] pt-2">
        <div className="authCard w-[300px]">
          <div className="w-[150px] mx-auto">
            <img
              src={Logo_UI}
              alt="logo"
              width="80"
              height="80"
              className="mx-auto"
            />
            {/* <Lottie animationData={bgImg} loop={true} autoplay={true} /> */}
          </div>
          <div className="logo pb-3">
            <span className="flex gap-1 justify-center text-white">
              Welcome to <Logo />
            </span>
          </div>
          <div className="w-[300px] bg-[#161B22] md:p-3 rounded-md flex flex-col gap-2">
            <TextField
              name="username"
              title="Enter Username"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  username: e,
                })
              }
              value={userData.username}
              sx={"bg-transparent"}
              onIcon={
                userAvailable === true ? (
                  <CorrectIcon />
                ) : (
                  userAvailable === false && <WrongIcon />
                )
              }
              toolTip={
                userAvailable === true
                  ? "Username available"
                  : "Username not available"
              }
            />

            <TextField
              name="email"
              type="email"
              title="Enter Email"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e,
                })
              }
              value={userData.email}
              sx={"bg-transparent"}
            />

            <TextField
              name="password"
              type="password"
              title="Enter Password"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e,
                })
              }
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.password}
              sx={"bg-transparent"}
            />

            <TextField
              name="re-password"
              type="password"
              title="Re-Enter Password"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  repassword: e,
                })
              }
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.repassword}
              sx={"bg-transparent"}
            />

            <Button
              disabled={loading || userAvailable === false}
              text="Register"
              handleSubmit={handleRegister}
              loading={loading}
              sx={"h-[40px] bg-[#1DB954d9]"}
            />
          </div>

          <div className="text-white text-center my-2">OR</div>

          <GoogleAuth />

          <div className="h-[80px] border-2 mt-2 border-[#161B22] rounded-md flex gap-2 justify-center items-center">
            <h4 className="font-normal text-white">
              Already have an account?{" "}
              <span
                className="text-[#1DB954] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in ➞
              </span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
