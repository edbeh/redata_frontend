import { TooltipProps } from "recharts";

type ValueType = number | string | Array<number | string>;
type NameType = number | string;

const CitationChartTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const year = payload[0]?.payload?.year;
    const citations = payload[0]?.payload?.citations;

    return (
      <div className="flex flex-col px-4 py-2 bg-darkBlue text-white rounded text-xs font-semibold">
        {year}
        {typeof citations === "number" && (
          <p>
            Cited {citations} {citations > 1 ? "times" : "time"}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default CitationChartTooltip;
