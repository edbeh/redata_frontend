import { ImgCircleLoadingOutline } from "assets";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "red" | "small";
  isLoading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  loadingText = "",
  children,
  ...rest
}) => {
  const { disabled } = rest;

  return (
    <button
      className={`transition duration-300 hover:scale-[1.03] border-primary-600 text-base p-3 
                  rounded-lg w-full box-border disabled:bg-disabled disabled:border-disabled 
                  border-[1px] disabled:text-white flex cursor-pointer
                  justify-center whitespace-nowrap font-medium ${
                    variant === "primary"
                      ? "bg-primary-600 text-white"
                      : variant === "red"
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-primary-600"
                  } ${disabled ? "bg-slate-200" : ""}
                  ${
                    isLoading
                      ? "cursor-progress"
                      : disabled
                      ? "cursor-not-allowed"
                      : ""
                  }`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className="flex space-x-2 items-center">
          <ImgCircleLoadingOutline
            width={21}
            height={21}
            className="text-white animate-spin"
          />
          {loadingText && <p>{loadingText}</p>}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
