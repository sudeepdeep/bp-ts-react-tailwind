import Cookies from "js-cookie";
import { UIStore } from "../Store";
import axios, { axiosErrorToast } from "../utils/axios";
import { urlPattern } from "./constants";

export function checkUserLoggedIn() {
  const userId = Cookies.get("userId") || "";
  const token = Cookies.get("token") || "";
  if (userId && userId !== "" && userId !== undefined && userId !== null) {
    //call api with userId to get the username
    if (token && token !== "" && token !== undefined && token !== null) {
      axios
        .get(`/unilinks/${userId}/get-links-by-userId`)
        .then((res) => {
          if (res.data.status === 200) {
            UIStore.update((s) => {
              s.userLoggedIn = true;
              s.userDetails = res?.data?.data;
            });
          }
        })
        .catch((err) => {
          window.location.replace("/login");
          axiosErrorToast(err);
        });
    }
  }
}

export function isValidURL(url: string): boolean {
  return urlPattern.test(url);
}
