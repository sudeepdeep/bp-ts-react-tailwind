import Cookies from "js-cookie";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/earth.json";
import { Button } from "../components/Button";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import axios, { axiosErrorToast } from "../utils/axios";
import { ShowOffIcon, ShowOnIcon } from "../assets/Icons";
import Logo_UI from "../assets/logo_ui.png";
import GoogleAuth from "../components/GoogleAuth";

const Login: React.FC = () => {
  const existingUserCheck = Cookies.get("token");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (existingUserCheck) {
      navigate("/");
    }
  }, [existingUserCheck, navigate]);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        setLoading(false);
        if (res.data.access_token) {
          Cookies.set("token", res.data.access_token);
          Cookies.set("userId", res.data.userId);
          const el = JSON.parse(
            sessionStorage.getItem("existingLinks") ?? "[]"
          );
          if (el.length > 0) {
            window.location.href = `/my-links/${username}`;
          } else {
            window.location.href = "/";
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  };

  return (
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
        </div>
        <div className="logo pb-3">
          <span className="flex gap-1 justify-center text-white">
            Sign in to <Logo />
          </span>
        </div>
        <div className="w-[300px] bg-[#161B22] md:p-3 rounded-md flex flex-col gap-2">
          <TextField
            name="username"
            title="Username"
            value={username}
            onChange={(e: string) => setUsername(e)}
          />

          <TextField
            name="password"
            type="password"
            title="Password"
            value={password}
            onChange={(e: string) => setPassword(e)}
            onIcon={<ShowOnIcon />}
            offIcon={<ShowOffIcon />}
          />
          <Button
            disabled={loading}
            text={"Login"}
            loading={loading}
            handleSubmit={handleLogin}
            sx={"h-[40px] bg-[#1DB954]"}
          />
          {/* <p
            onClick={() => navigate("/audio-login")}
            className="cursor-pointer text-right text-slate-300"
          >
            Login with audio 🗣
          </p> */}
        </div>
        {/* <p className="text-slate-400 text-center mt-3">or</p>
        <Button
          disabled={loading}
          text={"Login as Guest"}
          handleSubmit={() => navigate("/")}
          sx={"h-[40px] bg-transparent"}
        /> */}
        <div className="text-white text-center my-2">OR</div>
        <GoogleAuth />
        <div className="mt-[10px] h-[80px] border-2 border-[#161B22] rounded-md flex gap-2 justify-center items-center">
          <h4 className="font-normal text-white ">
            New user?{" "}
            <span
              className="text-[#1DB954] cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
