import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import CitationChartTooltip from "../CitationGraphTooltip/CitationGraphTooltip";

import { Citation } from "../CitationSection/CitationSection.model";

interface CitationGraphProps {
  data: Citation.Graph[];
}

const CitationGraph = ({ data }: CitationGraphProps) => {
  return (
    <div className="flex flex-col max-h-[332px] w-full h-[332px] border-background">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={730}
          height={332}
          margin={{ top: 5, right: 5, bottom: 5, left: -30 }}
          data={data}
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
