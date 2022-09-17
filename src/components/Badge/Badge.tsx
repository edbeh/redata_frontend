interface BadgeProps {
  text: string;
  onClickBadge?: (item: string) => void;
  variant?: "normal" | "small";
  isBolded?: boolean;
}

const Badge = ({
  text,
  onClickBadge,
  variant = "normal",
  isBolded = false,
}: BadgeProps) => {
  return (
    <div
      onClick={() => {
        typeof onClickBadge === "function" && onClickBadge(text);
      }}
      className={`capitalize rounded-lg text-sm
                overflow-hidden text-ellipsis whitespace-nowrap ${
                  typeof onClickBadge === "function"
                    ? "cursor-pointer bg-primary-100 text-primary-900"
                    : "bg-slate-100 cursor-not-allowed"
                }
                ${variant === "small" ? "p-2" : "p-3"}
                ${isBolded ? "font-semibold" : "font-normal"}`}
    >
      {text}
    </div>
  );
};

export default Badge;
