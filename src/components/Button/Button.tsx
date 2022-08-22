interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  return (
    <button
      className={`tracking-wider transition duration-300 hover:scale-[1.01] border-primary-600 text-base p-3  rounded-lg w-full box-border disabled:bg-disabled disabled:border-disabled border-[1px] disabled:text-white disabled:cursor-not-allowed ${
        variant === "primary"
          ? "bg-primary-600 text-white"
          : "bg-white text-primary-600"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
