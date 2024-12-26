import { useParams } from "react-router-dom";
import { socialMediaData } from "../utils/constants";
import bgImg from "../assets/6530.jpg";
import SampleLogo from "../components/SampleLogo";

function UserDemoPage({ links, selectedColor }: any) {
  let { username }: any = useParams();
  console.log(selectedColor);
  if (!username) {
    username = "UNILINKS";
  }
  if (links.length === 0) return <></>;

  return (
    <div
      style={{
        background: `${
          (selectedColor == "default" || selectedColor == "") && bgImg
            ? `url(${bgImg})`
            : selectedColor
        }`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[70vh] rounded-lg w-[300px]"
    >
      <div className="h-full w-full flex flex-col  items-center mt-[0px]">
        <div className="mt-[40px]">
          <SampleLogo letter={username[0]} />
        </div>
        <p className="mt-[20px] text-[20px] font-bold uppercase text-black bg-blend-difference">
          {username ?? ""}
        </p>
        <div className="flex gap-[20px] px-[40px] py-[20px] flex-wrap items-center justify-center">
          {links.map((link: any) => (
            <div className="mt-[10px]">
              <a href={link.siteUrl[0]} target="_blank" rel="noreferrer">
                <img
                  src={
                    link?.customImage
                      ? link?.customImage
                      : socialMediaData.find(
                          (item) => item.key === link.siteName
                        )?.logoUrl
                  }
                  className="border-[0px]"
                  width={"30px"}
                  height={"30px"}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDemoPage;
