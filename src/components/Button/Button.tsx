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
      className={`transition duration-300 hover:scale-[1.03] border-primary-600 text-base p-3  rounded-lg w-full box-border disabled:bg-disabled disabled:border-disabled border-[1px] disabled:text-white disabled:cursor-not-allowed flex justify-center ${
        variant === "primary"
          ? "bg-primary-600 text-white"
          : "bg-white text-primary-600"
      } ${disabled ? "bg-slate-200" : ""}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <MoonLoader color="white" size={24} /> : children}
    </button>
  );
};

export default Button;
