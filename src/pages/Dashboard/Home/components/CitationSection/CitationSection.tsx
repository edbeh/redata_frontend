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
        <h2 className="mb-6 text-xl font-bold text-gray-800">Citations</h2>

        <div className="flex items-center flex-col sm:flex-row sm:items-start sm:justify-start gap-y-4 gap-x-4 mt-6">
          <CitationGraph data={data.graph} />
          <CitationTable data={data.table} />
        </div>

        <p className="text-sm text-gray-500 w-full text-center">
          Citation data obtained from Google Scholar, profile of {data.name}.
        </p>
      </Card>
    </div>
  );
};

export default CitationSection;
