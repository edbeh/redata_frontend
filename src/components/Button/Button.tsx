import MoonLoader from "react-spinners/MoonLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  children,
  ...rest
}) => {
  const { disabled } = rest;

  return (
    <button
      className={`transition duration-300 hover:scale-[1.03] border-primary-600 text-base p-3 
                  rounded-lg w-full box-border disabled:bg-disabled disabled:border-disabled 
                  border-[1px] disabled:text-white flex 
                  justify-center whitespace-nowrap ${
                    variant === "primary"
                      ? "bg-primary-600 text-white"
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
      {isLoading ? <MoonLoader color="black" size={16} /> : children}
    </button>
  );
};

export default Button;
