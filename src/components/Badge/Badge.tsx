interface BadgeProps {
  text: string;
  onClick?: () => void;
}

const Badge = ({ text, onClick }: BadgeProps) => {
  return (
    <div
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
