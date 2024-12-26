import { UIStore } from "../Store";
import { allowedProfiles, socialMediaData } from "../utils/constants";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import axios, { axiosErrorToast } from "../utils/axios";
import { Button } from "./Button";
import TextField from "./TextField";
import Select from "./Select";
import ToggleSwitch from "./ToggleSwitch";
import { checkUserLoggedIn } from "../utils/service";

interface LinkDetails {
  siteUrl: string[];
  siteName: string;
  isPromotionalContent: boolean;
  description: string;
}

function DummyLinkCard({ links, setLinks, uiStore }: any) {
  console.log(links, setLinks, uiStore);
  const unLinks = uiStore.userDetails && uiStore.userDetails[0];
  const [editLink, setEditLink] = useState<any>({});
  const [showOn, setShowOn] = useState(false);

  const [linkDetails, setLinkDetails] = useState<LinkDetails>({
    siteUrl: [],
    siteName: "",
    isPromotionalContent: showOn,
    description: "",
  });

  const copyText = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Link copied...");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleOpen = (url: any) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const newLinks = Array.from(links);
    const [draggedItem] = newLinks.splice(result.source.index, 1);
    newLinks.splice(result.destination.index, 0, draggedItem);
    setLinks(newLinks);
  }

  function handleEditLink(link: any) {
    if (editLink?.siteName === link.siteName) {
      setEditLink("");
    } else {
      setEditLink(link);
      if (link.isPromotionalContent) {
        setShowOn(true);
      }
      setLinkDetails({
        ...linkDetails,
        siteUrl: link.siteUrl,
        siteName: link.siteName,
        isPromotionalContent: link.isPromotionalContent,
        description: link.description,
      });
    }
  }

  function handleUpdateLink(link: any) {
    console.log(linkDetails, "asdasd");
    const linkId = unLinks.siteName;
    const postData: any = {
      socialMediaLinks: [...links, linkDetails],
    };

    console.log(links, "asdaajsja");

    // axios
    //   .put(`/unilinks/${linkId}/update-link`, postData)
    //   .then((res) => {
    //     if (res.data.status === 200) {
    //       toast.success(res.data.message);
    //       handleEditLink(link);
    //       checkUserLoggedIn();
    //     }
    //   })
    //   .catch((err) => {
    //     axiosErrorToast(err);
    //   });
  }

  // if (uiStore.userDetails.length === 0) return <></>;
  return (
    <div className="text-black">
      {links && links?.length > 0 && (
        <div className="">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="socialLinks">
              {(provided) => (
                <div
                  className="w-auto h-[100px] p-4 flex flex-wrap gap-[50px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {links.map((link: any, index: any) => (
                    <Draggable
                      draggableId={link.siteName.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <>
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            className="bg-white rounded-lg w-[100%] h-[50px] flex items-center justify-between gap-[10px] p-2"
                          >
                            <div className="flex gap-[10px]">
                              <svg
                                width="30px"
                                height="30px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect width="24" height="24" fill="white" />
                                <circle
                                  cx="9.5"
                                  cy="6"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="9.5"
                                  cy="10"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="9.5"
                                  cy="14"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="9.5"
                                  cy="18"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="14.5"
                                  cy="6"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="14.5"
                                  cy="10"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="14.5"
                                  cy="14"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="14.5"
                                  cy="18"
                                  r="0.5"
                                  stroke="#000000"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <img
                                className="h-[30px] w-auto"
                                src={
                                  socialMediaData.find(
                                    (item) => item.key === link.siteName
                                  )?.logoUrl
                                }
                                alt=""
                              />
                              <p className="flex font-bold items-center gap-2">
                                {
                                  socialMediaData.find(
                                    (item) => item.key === link.siteName
                                  )?.name
                                }

                                {link.isPromotionalContent && (
                                  <p
                                    title="promotional content"
                                    className="bg-red-700 text-white text-[10px] rounded-full w-[20px] h-[20px] flex items-center justify-center"
                                  >
                                    P
                                  </p>
                                )}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 cursor-pointer"
                                onClick={() => handleOpen(link.siteUrl)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 cursor-pointer"
                                onClick={() => copyText(link.siteUrl)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 cursor-pointer"
                                onClick={() => handleEditLink(link)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                              </svg>
                            </div>
                          </div>
                          {editLink?.siteName === link.siteName && (
                            <div className="w-full h-[200px] flex rounded-lg bg-gray-900">
                              <div className="left-logo flex justify-center items-center w-[30%] h-full">
                                <img
                                  className="p-3 h-[130px] w-auto"
                                  src={
                                    socialMediaData.find(
                                      (item) =>
                                        item.key === linkDetails.siteName
                                    )?.logoUrl
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="right-content h-full w-[70%] flex flex-col justify-between">
                                <div className="top-content h-[300px] p-3 overflow-y-auto">
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
                                    onChange={(e) =>
                                      setLinkDetails({
                                        ...linkDetails,
                                        siteName: e.toString(),
                                      })
                                    }
                                    value={linkDetails.siteName}
                                    options={allowedProfiles}
                                    title="Select site name"
                                  />
                                  <div className="mt-3">
                                    <ToggleSwitch
                                      isOn={showOn}
                                      setIsOn={setShowOn}
                                      title="Promotional Content"
                                    />
                                  </div>

                                  <TextField
                                    title="Description"
                                    rows={5}
                                    sx="p-[5px] text-black"
                                    value={linkDetails.description}
                                    onChange={(e) =>
                                      setLinkDetails({
                                        ...linkDetails,
                                        description: e,
                                      })
                                    }
                                  />
                                </div>
                                <div className="footer-content h-[50px] w-full flex items-center justify-end pr-3">
                                  <button
                                    className="btn  bg-slate-300 mr-2 px-3 py-2 rounded-md"
                                    onClick={() => handleEditLink(link)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleUpdateLink(link)}
                                    className="btn text-white bg-[#1db954e1] px-3 py-2 rounded-md"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}

export default DummyLinkCard;
