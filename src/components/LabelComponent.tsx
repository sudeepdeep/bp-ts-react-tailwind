import React from "react";

interface LabelComponentProps {
  children: React.ReactNode; // To accept any valid JSX elements
  label?: string; // Optional label prop
}

const LabelComponent: React.FC<LabelComponentProps> = ({
  children,
  label = "",
}) => {
  return (
    <div className="my-2">
      {label && (
        <label
          htmlFor="about" // Consider making this dynamic based on props if necessary
          className="block text-sm font-medium leading-6 text-white"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export default LabelComponent;
