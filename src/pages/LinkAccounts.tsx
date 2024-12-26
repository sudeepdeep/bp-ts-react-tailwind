import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import TextField from "../components/TextField";
import Select from "../components/Select";
import { allowedProfiles } from "../utils/constants";
import { checkUserLoggedIn, isValidURL } from "../utils/service";
import { toast } from "react-toastify";
import axios, { axiosErrorToast } from "../utils/axios";
import ToggleSwitch from "../components/ToggleSwitch";
import LinkCard from "../components/LinkCard";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import UserDemoPage from "./UserDemo";
import CollorPallete from "../components/CollorPallete";
import Cookies from "js-cookie";
import ImageContainer from "../components/ImageContainer";
import { UploadPhoto } from "../components/ImageUpload";

export interface LinkDetails {
  siteUrl: string[];
  siteName: string;
  isPromotionalContent: boolean;
  description: string;
  customImage?: string;
}

function LinkAccounts({ uiStore }: any) {
  const [showTextField, setShowTextField] = useState(false);
  const [showOn, setShowOn] = useState(false);
  const { width, height } = useWindowSize();
  const [firstTime, setFirstTime] = useState(false);
  const [linkDetails, setLinkDetails] = useState<LinkDetails>({
    siteUrl: [],
    siteName: "",
    isPromotionalContent: showOn,
    description: "",
    customImage: "",
  });
  console.log(uiStore.userDetails);
  const [userDetails, setUserDetails] = useState(
    uiStore.userDetails ? uiStore.userDetails[0] : []
  );

  const [links, setLinks] = useState("");
  const [ownImageLink, setOwnImageLink] = useState("");
  const [selectedColor, setSelectedColor] = useState(["default"]);

  function handleShowTextField() {
    console.log("called");
    setShowTextField(true);
  }

  useEffect(() => {
    console.log(uiStore?.userDetails, "asajdajjj");
    if (uiStore?.userDetails && uiStore?.userDetails.length > 0) {
      setUserDetails(uiStore.userDetails ? uiStore.userDetails[0] : []);
      if (uiStore?.userDetails[0]?.socialMediaLinks) {
        setLinks(uiStore?.userDetails[0]?.socialMediaLinks);
        setSelectedColor([uiStore?.userDetails[0]?.bannerUrl ?? ["default"]]);
      }

      const eLinks = JSON.parse(
        sessionStorage.getItem("existingLinks") ?? "[]"
      );
      if (eLinks && eLinks.length > 0) {
        let eeLinks = links ?? [];
        if (eeLinks && eeLinks.length > 0) {
          eeLinks.concat(eLinks);
        } else {
          eeLinks = eLinks;
          setLinks(eLinks);
        }
        handleAddLink(uiStore?.userDetails[0], eeLinks);
        sessionStorage.removeItem("existingLinks");
      }
    }
  }, [uiStore.userDetails]);

  useEffect(() => {
    setLinkDetails({
      ...linkDetails,
      isPromotionalContent: showOn,
    });
  }, [showOn]);

  function handleAddLink(user: any = {}, eLinks: any = []) {
    if (
      userDetails?.socialMediaLinks &&
      userDetails?.socialMediaLinks.length > 0
    ) {
      const isValid = isValidURL(linkDetails.siteUrl[0]);

      console.log(linkDetails, "linkddd23");

      if (!isValid) {
        toast.error("Invalid URL");
        return;
      }

      const linkId = userDetails._id;

      const postData: any = {
        username: userDetails.username,
        userId: userDetails.userId,
        socialMediaLinks: [...userDetails.socialMediaLinks, linkDetails],
      };

      axios
        .put(`/unilinks/${linkId}/update-link`, postData)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success(res.data.message);
            setShowTextField(false);
            checkUserLoggedIn();
          }
        })
        .catch((err) => {
          axiosErrorToast(err);
        });
    } else {
      const postData: any = {
        username: userDetails?.username ?? user?.username,
        userId: userDetails?.userId ?? user?.userId,
        userType: "common",
        linksClick: 0,
        socialMediaLinks:
          Object.keys(linkDetails).length > 0 ? [linkDetails] : eLinks,
        orderOfLinks: [],
        bannerUrl: "",
        profileUrl: "",
        coverUrl: "",
      };

      axios
        .post("/unilinks", postData)
        .then((res) => {
          if (res.data.status === 200) {
            console.log(!userDetails.socialMediaLinks, "asda");
            if (!userDetails.socialMediaLinks) {
              toast.success("Successfully linked your first account🎉.");
              setFirstTime(true);
            }
            toast.success(res.data.message);
            setShowTextField(false);
            checkUserLoggedIn();
          }
        })
        .catch((err) => {
          axiosErrorToast(err);
        });
    }
  }

  useEffect(() => {
    if (firstTime) {
      const timer = setTimeout(() => {
        setFirstTime(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [firstTime]);

  console.log(links);

  function handleCancel() {
    setShowTextField(false);
  }

  function handleCopyLink() {
    // Define the base URL
    const baseUrl = window.location.origin; // Gets the current domain (e.g., https://example.com)

    // Construct the full URL
    const fullUrl = `${baseUrl}/${userDetails?.username}`;

    // Copy the full URL to the clipboard
    navigator.clipboard.writeText(fullUrl).then(
      () => {
        toast.success("UniCard copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy the link to clipboard:", err);
      }
    );
  }

  useEffect(() => {
    console.log("called3");
  }, [uiStore.userDetails]);

  if (uiStore.userDetails.length === 0) return <></>;

  return (
    <div className="w-[100%] h-auto overflow-y-auto mt-[10px] flex justify-center mx-auto">
      {firstTime && <Confetti width={width} height={height} />}
      {!showTextField ? (
        <div className="flex flex-col w-full gap-[12px] md:pb-0 pb-[90px] items-start">
          <div className="w-[100%] flex md:flex-row flex-col items-center gap-[10px]">
            <Button
              handleSubmit={handleShowTextField}
              text="+ Add Link"
              sx="md:w-[30%] w-[300px]"
            />

            <Button
              handleSubmit={handleCopyLink}
              text="Copy UniCard 🔗"
              sx="md:w-[30%] w-[300px]"
            />
          </div>

          <div className="w-[100%] flex flex-col md:flex-row md:items-start items-center">
            <div className="md:w-[60%] w-[80%] h-auto">
              <LinkCard
                links={!links ? [] : links}
                setLinks={setLinks}
                uiStore={uiStore}
              />
            </div>
            <div className="md:w-[40%] w-[80%] h-auto flex flex-col items-center gap-3">
              <CollorPallete
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                uiStore={userDetails}
              />
              <UserDemoPage
                links={!links ? [] : links}
                selectedColor={selectedColor}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="md:w-[400px] w-[300px] flex flex-col gap-[10px]">
            <TextField
              title="Enter site url"
              sx="p-[5px]"
              placeholder="https://www.example.com"
              value={linkDetails.siteUrl[0]}
              onChange={(e) =>
                setLinkDetails({
                  ...linkDetails,
                  siteUrl: [e],
                })
              }
            />

            <Select
              title="Select site name"
              onChange={(e) =>
                setLinkDetails({
                  ...linkDetails,
                  siteName: e.toString(),
                })
              }
              value={linkDetails.siteName}
              options={allowedProfiles}
            />

            <ToggleSwitch
              isOn={showOn}
              setIsOn={setShowOn}
              title="Promotional Content"
            />

            <TextField
              rows={5}
              title="Description"
              sx="p-[5px]"
              value={linkDetails.description}
              onChange={(e) =>
                setLinkDetails({
                  ...linkDetails,
                  description: e,
                })
              }
            />

            <div className="my-10">
              {linkDetails?.customImage ? (
                <div className="col-span-full">
                  <ImageContainer
                    url={linkDetails?.customImage}
                    title={"Upload Custom Image"}
                    handleDelete={() => {
                      setLinkDetails({
                        ...linkDetails,
                        customImage: "",
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="col-span-full">
                  <UploadPhoto
                    title={"Upload Custom Image"}
                    handleChange={(e) => {
                      setLinkDetails({
                        ...linkDetails,
                        customImage: e,
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-[10px]">
              <Button
                text="Cancel"
                sx="w-[100px]"
                handleSubmit={handleCancel}
              />
              <Button text="Add" sx="w-[100px]" handleSubmit={handleAddLink} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LinkAccounts;
