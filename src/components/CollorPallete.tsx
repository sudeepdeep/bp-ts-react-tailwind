import React, { useState } from "react";
import bgImg from "../assets/6530.jpg";
import axios, { axiosErrorToast } from "../utils/axios";
import { toast } from "react-toastify";

function CollorPallete({ selectedColor, setSelectedColor, uiStore }: any) {
  const colors = ["#475569", "#059669", "#FBBF24", "#EF4444", "#A78BFA"];

  function handleSelectClick(color: any) {
    if (!selectedColor.includes(color)) {
      setSelectedColor(color);
    }

    const postData: any = {
      username: uiStore.username,
      userId: uiStore.userId,
      bannerUrl:
        typeof selectedColor == "string" ? selectedColor : selectedColor[0],
    };

    const linkId = uiStore._id;

    axios
      .put(`/unilinks/${linkId}/update-link`, postData)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        axiosErrorToast(err);
      });
  }
  return (
    <>
      <div className="flex gap-[10px] items-center h-[50px]">
        {colors.map((color, index) => (
          <>
            {index - 1 === -1 && (
              <>
                <div
                  className={`w-[30px] h-[30px] rounded-full cursor-pointer ${
                    selectedColor.includes("default") ||
                    (selectedColor.includes("") && "border-[2px] border-white")
                  }`}
                  style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleSelectClick("default")}
                ></div>
              </>
            )}
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer ${
                selectedColor.includes(color) && "border-[2px] border-white"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleSelectClick(color)}
            ></div>
          </>
        ))}
        <span className="cursor-pointer">+ more</span>
      </div>
    </>
  );
}

export default CollorPallete;
