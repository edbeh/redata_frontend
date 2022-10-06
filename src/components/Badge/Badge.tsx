interface BadgeProps {
  text: string;
  onClickBadge?: (item: string) => void;
  variant?: "normal" | "small";
  isBolded?: boolean;
  isLowerCase?: boolean;
}

const Badge = ({
  text,
  onClickBadge,
  variant = "normal",
  isBolded = false,
  isLowerCase = false,
}: BadgeProps) => {
  return (
    <div
      onClick={() => {
        typeof onClickBadge === "function" && onClickBadge(text);
      }}
      className={`rounded-lg text-sm
                overflow-hidden text-ellipsis whitespace-nowrap ${
                  typeof onClickBadge === "function"
                    ? "cursor-pointer bg-primary-100 text-primary-900"
                    : "bg-slate-100 cursor-not-allowed"
                }
                ${variant === "small" ? "p-2" : "p-3"}
                ${isBolded ? "font-semibold bg-yellow-100" : "font-normal"}
                ${isLowerCase ? "" : "capitalize"}`}
    >
      {text}
    </div>
  );
};

export default Badge;
