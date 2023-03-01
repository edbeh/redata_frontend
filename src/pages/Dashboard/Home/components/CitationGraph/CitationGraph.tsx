import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { GetMe, GetUserById } from "api/models";

import CitationChartTooltip from "../CitationGraphTooltip/CitationGraphTooltip";
import { useEffect, useState } from "react";

interface CitationGraphProps {
  data: GetMe.Graph[] | GetUserById.Graph[];
}

const CitationGraph = ({ data }: CitationGraphProps) => {
  const [modifiedData, setModifiedData] = useState<
    | {
        year: number;
        citations: number;
      }[]
    | null
  >(null);

  useEffect(() => {
    const modified = data?.map((item) => ({
      year: parseInt(item.year),
      citations: parseInt(item.citations),
    }));

    setModifiedData(modified);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!modifiedData) return null;

  return (
    <div className="flex flex-col max-h-[332px] w-full h-[332px] border-background">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={730}
          height={332}
          margin={{ top: 5, right: 5, bottom: 5, left: -25 }}
          data={modifiedData}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00BAF3" stopOpacity={1.0} />
              <stop offset="100%" stopColor="#00BAF3" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <Bar dataKey="citations" fill="url(#barGradient)" />
          <XAxis
            minTickGap={10}
            dataKey="year"
            axisLine={false}
            tickLine={false}
            style={{
              fontFamily: "Montserrat",
              fontSize: 12,
              fontWeight: 400,
              opacity: 0.6,
            }}
          />
          <YAxis
            type="number"
            interval={0}
            tickCount={5}
            axisLine={false}
            tickLine={false}
            style={{
              fontFamily: "Montserrat",
              fontSize: 10,
              fontWeight: 600,
            }}
          />
          <Tooltip
            content={CitationChartTooltip}
            cursor={{ fill: "none" }}
            wrapperStyle={{ outline: "none" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CitationGraph;
