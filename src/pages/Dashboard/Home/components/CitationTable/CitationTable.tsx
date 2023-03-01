import { useEffect, useState } from "react";

interface CitationTableProps {
  data: any;
}

const CitationTable = ({ data }: CitationTableProps) => {
  const [periods, setPeriods] = useState<string[]>([]);
  const [citations, setCitations] = useState<string[][]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const citations: string[][] = [];

      data.map((item: any) => {
        const dataType: string[] = Object.keys(item);
        const period: string[] = Object.keys(item[dataType[0]]);
        const count: string[] = Object.values(item[dataType[0]]);

        setPeriods(["", ...period]);
        return citations.push([...dataType, ...count]);
      });

      setCitations(citations);
    }
  }, [data]);

  return (
    <table className="text-center mb-8">
      <thead>
        <tr>
          {periods.map((period, i) => (
            <th className="min-w-[80px] first-letter:capitalize" key={i}>
              {period.replace("_", " ")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {citations.map((citation, i) => (
          <tr key={`${citation.join("")}-${i}`}>
            {citation.map((item, i) => (
              <td
                key={`${item}-${i}`}
                className={
                  item.includes("index") ? "" : "first-letter:capitalize" // do not capitalise indices
                }
              >
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CitationTable;
