import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
  title: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  setIsOn,
  title,
}) => {
  return (
    <div className="flex gap-[5px]">
      <label
        htmlFor="select"
        className="block text-sm font-medium leading-6 text-white"
      >
        {title}
      </label>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={() => setIsOn(!isOn)} // Toggle the state by calling setIsOn
      >
        <div
          className={` w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-6 bg-white" : "bg-black"
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
