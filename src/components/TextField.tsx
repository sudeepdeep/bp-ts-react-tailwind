import React, { useState } from "react";
import LabelComponent from "./LabelComponent";

interface TextFieldProps {
  onChange?: (value: string) => void;
  name?: string;
  title?: string;
  subtitle?: string;
  rows?: number;
  type?: string;
  value?: string;
  placeholder?: string;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  sx?: string;
  toolTip?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  onChange = () => {},
  name = "",
  title = "",
  subtitle = "",
  rows = 0,
  type = "text",
  value = "",
  placeholder = "",
  onIcon = null,
  offIcon = null,
  sx = "",
  toolTip = "",
}) => {
  const [passwordView, setPasswordView] = useState(false);

  function handleTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    onChange(e.target.value);
  }

  function handlePasswordChange() {
    setPasswordView(!passwordView);
  }

  return (
    <LabelComponent label={title}>
      <div className="mt-2">
        {rows > 0 ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            className="block font-normal w-full rounded-md border-0 py-1.5 bg-[#0D1117] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleTextChange}
          />
        ) : (
          <div className="relative">
            <input
              type={type && !passwordView ? type : "text"}
              name={name}
              id={name}
              value={value}
              placeholder={placeholder}
              className={`block w-full font-normal rounded-md border-0 py-1.5 text-white bg-[#0D1117] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${sx}`}
              onChange={handleTextChange}
            />
            <div
              className="cursor-pointer absolute z-50 right-2 top-2"
              onClick={handlePasswordChange}
              title={toolTip}
            >
              {passwordView ? offIcon : onIcon}
            </div>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-sm leading-6 text-gray-600 font-semibold">
          {subtitle}
        </p>
      )}
    </LabelComponent>
  );
};

export default TextField;
