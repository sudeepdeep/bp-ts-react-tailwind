import React from "react";
import LabelComponent from "./LabelComponent";

interface ImageContainerProps {
  url?: string | false;
  handleDelete?: () => void;
  title?: string | false;
  sx?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  url = false,
  handleDelete = () => {},
  title = false,
  sx = "",
}) => {
  return (
    <>
      <LabelComponent label={title || ""}>
        <div className="relative">
          {url ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img className={sx} src={url} alt="uploaded image" />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
            className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
            alt="delete"
            onClick={handleDelete}
          />
        </div>
      </LabelComponent>
    </>
  );
};

export default ImageContainer;
