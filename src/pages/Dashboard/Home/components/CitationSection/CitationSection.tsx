import { Card } from "components";
import { GetMe, GetUserById } from "api/models";

import CitationGraph from "../CitationGraph/CitationGraph";
import CitationTable from "../CitationTable/CitationTable";

interface CitationSectionProps {
  data: GetMe.GoogleScholar | GetUserById.GoogleScholar;
}

const CitationSection = ({ data }: CitationSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <h2
          className="mb-6 text-xl font-bold text-gray-800"
          onClick={() => {
            throw new Error("Testing gmail forwarding!");
          }}
        >
          Citations
        </h2>

        <div className="flex  items-start justify-start gap-y-4 gap-x-4 mt-6">
          <div className="flex basis-2/3">
            <CitationGraph data={data.graph} />
          </div>
          <div className="flex basis-1/3">
            <CitationTable data={data.table} />
          </div>
        </div>

        <p className="text-sm text-gray-500 w-full text-center">
          Citations data obtained from Google Scholar, profile of {data.name}.
        </p>
      </Card>
    </div>
  );
};

export default CitationSection;
