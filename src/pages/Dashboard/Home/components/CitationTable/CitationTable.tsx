import { useEffect } from "react";
import { Citation } from "../CitationSection/CitationSection.model";

interface CitationTableProps {
  data: any;
}

const CitationTable = ({ data }: CitationTableProps) => {
  const transformCitations = (data: any) => {
    console.log("data", data);

    const citations: Record<string, number | string>[] = [];
    data.map((element: any) => {
      console.log(element);
    });
  };

  useEffect(() => {
    transformCitations(data);
  }, [data]);

  return null;
};

export default CitationTable;
