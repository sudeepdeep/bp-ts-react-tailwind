import React from "react";

interface Option {
  value: string | number;
  name: string;
}

interface SelectProps {
  onChange?: (val: string | number) => void;
  title?: string;
  options?: Option[];
  value?: string | number;
}

const Select: React.FC<SelectProps> = ({
  onChange = () => {},
  title = "",
  options = [],
  value = "",
}) => {
  function handleSectionChange(val: string | number) {
    if (onChange) {
      onChange(val);
    }
  }

  return (
    <div className="w-full ">
      <label
        htmlFor="select"
        className="block text-sm font-medium leading-6 text-white"
      >
        {title}
      </label>
      <select
        id="select"
        name="select"
        autoComplete="off"
        className="block font-normal rounded-md w-full border-0 py-1.5 p-2 text-white bg-[#0D1117] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => handleSectionChange(e.target.value)}
        value={value}
      >
        {options?.map((option, index) => (
          <option
            key={index}
            disabled={index === 0 ? true : false}
            value={option.value}
            className="ng-star-inserted"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
