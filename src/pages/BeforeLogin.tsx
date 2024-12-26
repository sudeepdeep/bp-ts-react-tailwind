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
import DummyLinkCard from "../components/DummyLinkCard";

export interface LinkDetails {
  siteUrl: string[];
  siteName: string;
  isPromotionalContent: boolean;
  description: string;
}

function BeforeLogin() {
  const [showTextField, setShowTextField] = useState(false);
  const [showOn, setShowOn] = useState(false);
  const { width, height } = useWindowSize();
  const [firstTime, setFirstTime] = useState(false);
  const [linkDetails, setLinkDetails] = useState<LinkDetails>({
    siteUrl: [],
    siteName: "",
    isPromotionalContent: showOn,
    description: "",
  });
  const [links, setLinks] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState("default");

  function handleShowTextField() {
    console.log("called");
    setShowTextField(true);
  }

  useEffect(() => {
    setLinkDetails({
      ...linkDetails,
      isPromotionalContent: showOn,
    });
  }, [showOn]);

  function handleSaveChanges() {
    setLinks((prevItems: any) => [...prevItems, linkDetails]);

    setLinkDetails({
      siteUrl: [],
      siteName: "",
      isPromotionalContent: showOn,
      description: "",
    });
    setShowTextField(false);

    // redirect to login
    sessionStorage.setItem("existingLinks", JSON.stringify([linkDetails]));
    window.location.href = "/login";
  }

  function handleCancel() {
    setLinkDetails({
      siteUrl: [],
      siteName: "",
      isPromotionalContent: showOn,
      description: "",
    });
    setShowTextField(false);
  }

  function handleAddLink() {
    const isValid = isValidURL(linkDetails.siteUrl[0]);

    if (!isValid) {
      toast.error("Invalid URL");
      return;
    }

    console.log(linkDetails, "linmkndetails");

    setLinks((prevItems: any) => [...prevItems, linkDetails]);

    setLinkDetails({
      siteUrl: [],
      siteName: "",
      isPromotionalContent: showOn,
      description: "",
    });
    setShowTextField(false);
  }

  useEffect(() => {
    if (firstTime) {
      const timer = setTimeout(() => {
        setFirstTime(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [firstTime]);

  useEffect(() => {
    const elinks = JSON.parse(sessionStorage.getItem("existingLinks") ?? "[]");
    if (elinks && elinks.length > 0) {
      window.location.href = "/login";
      // sessionStorage.removeItem("existingLinks");
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      {showTextField ? (
        <div className="md:w-[400px] w-[80%] flex flex-col gap-[10px] justify-center">
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
          <div className="flex gap-[10px] w-full">
            <Button text="Add" sx="w-[50%]" handleSubmit={handleSaveChanges} />
            <Button text="Cancel" sx="w-[50%]" handleSubmit={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="md:w-[100%] w-[50%] mt-[10px] flex justify-center mx-auto">
          {firstTime && <Confetti width={width} height={height} />}
          {!showTextField && (
            <div className="flex flex-col gap-[12px] items-center">
              <div className="flex gap-[20px]">
                <Button
                  handleSubmit={handleShowTextField}
                  text="+ Add Link"
                  sx="md:w-[400px] w-[300px]"
                />

                {/* <Button
                handleSubmit={handleSaveChanges}
                text="Save changes"
                sx="md:w-[400px] w-[300px]"
              /> */}
              </div>

              <div className="md:w-[100%] w-[80%]">
                <LinkCard
                  links={links ?? []}
                  setLinks={setLinks}
                  uiStore={[]}
                />
              </div>
              <div className="w-[100%] flex flex-col items-center gap-3">
                <CollorPallete
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  uiStore={[]}
                />
                <UserDemoPage links={links} selectedColor={selectedColor} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BeforeLogin;
