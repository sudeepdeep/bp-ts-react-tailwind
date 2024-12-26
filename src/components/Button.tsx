import { AnimationLoading } from "./Loading";
import buttonLoading from "../assets/buttonloading.json";

interface ButtonProps {
  disabled?: boolean;
  text?: string;
  handleSubmit?: () => void;
  loading?: boolean;
  sx?: string;
  btnHeight?: string;
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  text = "submit",
  handleSubmit,
  loading = false,
  sx = "",
}) => {
  return (
    <div
      onClick={handleSubmit}
      className={`p-3 text-center relative my-3 flex items-center justify-center  ${
        disabled ? "cursor-wait" : "cursor-pointer"
      }  text-white hover:bg-[#1db954e1] border-[1px] border-[#1db954e1] rounded-md transition duration-300 ease-in-out ${sx}`}
    >
      <button disabled={disabled}>{text}</button>
      {loading && (
        <div className="absolute z-50 right-0 top-0">
          <AnimationLoading animation={buttonLoading} styles="w-[70px]" />
        </div>
      )}
    </div>
  );
};
