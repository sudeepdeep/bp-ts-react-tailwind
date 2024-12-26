import Lottie from "lottie-react";
import React from "react";
import articleLoading from "../assets/loading.json";

function Loading() {
  return (
    <>
      <div className="loading w-full h-[100vh] mt-10 bg-black flex flex-col gap-5 items-center justify-start">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="border border-blue-300 shadow rounded-md p-4 w-full h-[250px] mx-auto"
            >
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-[140px] bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Loading;

export const EditProfileLoading: React.FC = () => {
  return (
    <div className="loading w-full h-[100vh] mt-10 bg-black flex flex-col gap-5 items-center justify-start">
      <div className="border shadow rounded-md p-4 max-w-sm w-full h-[350px] mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2 py-1">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-[20px] w-20 bg-slate-700 rounded"></div>
                  <div className="h-[30px] bg-slate-700 rounded"></div>
                </div>
              ))}
            <div className="h-[120px] w-28 bg-slate-700 rounded"></div>
            <div className="h-[35px] w-20 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileLoading: React.FC = () => {
  return (
    <div className="loading w-full h-[100vh] mt-10 bg-black flex flex-col gap-5 items-center justify-start">
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full h-[350px] mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="h-[120px] w-64 mx-auto bg-slate-700 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-700 rounded col-span-2"></div>
              </div>
              <div className="h-4 bg-slate-700 rounded"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="h-7 bg-slate-700 rounded col-span-1"></div>
              <div className="h-7 bg-slate-700 rounded col-span-1"></div>
              <div className="h-7 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-[30px] bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnimationLoadingProps {
  animation?: object;
  loop?: boolean;
  autoplay?: boolean;
  styles?: string;
}

export const AnimationLoading: React.FC<AnimationLoadingProps> = ({
  animation = articleLoading,
  loop = true,
  autoplay = true,
  styles = "w-[200px] mx-auto md:w-[230px]",
}) => {
  return (
    <Lottie
      animationData={animation}
      className={styles}
      loop={loop}
      autoplay={autoplay}
    />
  );
};
