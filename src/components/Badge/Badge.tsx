interface BadgeProps {
  text: string;
  onClick?: (item: string) => void;
}

const Badge = ({ text, onClick }: BadgeProps) => {
  return (
    <div
      onClick={() => {
        typeof onClick === "function" && onClick(text);
      }}
      className={`p-3 capitalize font-semibold rounded-lg text-sm 
                overflow-hidden text-ellipsis whitespace-nowrap ${
                  typeof onClick === "function"
                    ? "cursor-pointer bg-primary-100 text-primary-900"
                    : "bg-slate-100 cursor-not-allowed"
                }`}
    >
      {text}
    </div>
  );
};

export default Badge;
