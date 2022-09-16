interface BadgeProps {
  text: string;
  onClickBadge?: (item: string) => void;
}

const Badge = ({ text, onClickBadge }: BadgeProps) => {
  return (
    <div
      onClick={() => {
        typeof onClickBadge === "function" && onClickBadge(text);
      }}
      className={`p-3 capitalize font-semibold rounded-lg text-sm 
                overflow-hidden text-ellipsis whitespace-nowrap ${
                  typeof onClickBadge === "function"
                    ? "cursor-pointer bg-primary-100 text-primary-900"
                    : "bg-slate-100 cursor-not-allowed"
                }`}
    >
      {text}
    </div>
  );
};

export default Badge;
