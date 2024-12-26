import React, { useEffect, useState } from "react";
import { checkUserLoggedIn } from "../utils/service";
import { useParams } from "react-router-dom";
import axios, { axiosErrorToast } from "../utils/axios";
import { UserBadge } from "../assets/Icons";
import { allowedProfiles, socialMediaData } from "../utils/constants";
import bgImg from "../assets/6530.jpg";
import SampleLogo from "../components/SampleLogo";
import Loading, { AnimationLoading } from "../components/Loading";

function UserPage() {
  let { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  useEffect(() => {
    axios
      .get(`/unilinks/${username}/get-by-username`)
      .then((res) => {
        setLoading(false);
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }, [username]);

  console.log(userDetails);

  if (loading) return <AnimationLoading />;

  if (!userDetails) return <></>;

  return (
    <div className="bg-black h-[100vh] w-auto flex flex-col items-center justify-center">
      <div
        style={{
          background: `${
            (userDetails?.bannerUrl == "default" ||
              userDetails?.bannerUrl == "") &&
            bgImg
              ? `url(${bgImg})`
              : userDetails?.bannerUrl
          }`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[70vh] rounded-lg w-[300px]"
      >
        <div className="h-full w-full flex flex-col  items-center mt-[40px]">
          <div>
            <SampleLogo letter={userDetails?.username[0]} />
          </div>
          <p className="mt-[40px] text-[20px] font-bold uppercase text-black bg-blend-difference">
            {userDetails?.username ?? ""}
          </p>
          <div className="flex gap-[10px] flex-wrap items-center justify-center">
            {userDetails.socialMediaLinks.map((link: any) => (
              <div className="w-[60px] border-[1px] h-[60px] flex justify-center items-center flex-wrap">
                <a href={link.siteUrl[0]} target="_blank">
                  <img
                    src={
                      link?.customImage
                        ? link?.customImage
                        : socialMediaData.find(
                            (item) => item.key === link.siteName
                          )?.logoUrl
                    }
                    width={"60px"}
                    height={"60px"}
                    alt=""
                  />
                </a>

                <div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-white absolute z-20 text-[14px] bottom-0 opacity-40">
        Created with unilinks.me
      </p>
    </div>
  );
}

export default UserPage;
