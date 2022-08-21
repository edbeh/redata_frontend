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
      className={`transition duration-300 hover:scale-[1.01] border-primary text-base p-3  rounded-lg w-full box-border disabled:bg-disabled disabled:border-disabled border-[1px] disabled:text-white ${
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-white text-primary"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
