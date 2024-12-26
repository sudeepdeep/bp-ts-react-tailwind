import React from "react";

function SampleLogo({ letter }: any) {
  return (
    <div className="w-[70px] flex justify-center items-center h-[70px] bg-purple-700 rounded-full">
      <p className="uppercase text-[30px] font-bold text-purple-300">
        {letter}
      </p>
    </div>
  );
}

export default SampleLogo;
