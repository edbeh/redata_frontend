import { ReactNode } from "react";

interface BadgeProps {
  text: string;
  html?: ReactNode;
  onClickBadge?: (item: string) => void;
  variant?: "normal" | "small" | "extra small";
  isBolded?: boolean;
  isLowerCase?: boolean;
}

const Badge = ({
  text,
  html,
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
      className={`rounded-lg ${
        variant === "extra small" ? "text-[11px]" : "text-sm"
      }
                overflow-hidden text-ellipsis whitespace-nowrap ${
                  typeof onClickBadge === "function"
                    ? "cursor-pointer bg-primary-100 text-primary-900"
                    : "bg-slate-100 cursor-not-allowed"
                }
                ${
                  variant === "extra small"
                    ? "p-1"
                    : variant === "small"
                    ? "p-2"
                    : "p-3"
                }
                ${
                  isBolded
                    ? "font-semibold text-black bg-yellow-100"
                    : "font-normal"
                }
                ${isLowerCase ? "" : "capitalize"}`}
    >
      {text}
      {html}
    </div>
  );
};

export default Badge;
