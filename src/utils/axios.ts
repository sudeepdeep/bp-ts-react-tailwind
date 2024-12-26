import Axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Define a type for the error response structure
interface ErrorResponse {
  message: string | string[]; // message can be a string or an array of strings
}

const token = Cookies.get("token") || ""; // Default to an empty string if token is not found
console.log(token, "axiostoken");
const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: `Bearer ${token}`,
    Application: "unilinks",
  },
});

export default axios;

// Define the type for the error and fallback message
export const axiosErrorToast = (
  error: AxiosError<ErrorResponse>,
  fallback?: string
): string | void => {
  const fallbackMessage = fallback ?? "Something went wrong.";

  const errorMessage =
    typeof error?.response?.data?.message !== "string"
      ? error?.response?.data?.message?.join("\n") ?? fallbackMessage
      : error?.response?.data?.message;

  toast.error(errorMessage);

  return errorMessage;
};
