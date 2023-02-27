import { Card } from "components";

import { MOCK_CITATION_DATA } from "./CitationSection.util";

import CitationGraph from "../CitationGraph/CitationGraph";
import CitationTable from "../CitationTable/CitationTable";

const CitationSection = () => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-6 text-xl font-bold text-gray-700">Citations</h2>

        <div className="flex  items-start justify-start gap-y-4 gap-x-4 mt-6">
          <div className="flex basis-2/3">
            <CitationGraph data={MOCK_CITATION_DATA.cited_by.graph} />
          </div>
          <div className="flex basis-1/3">
            <CitationTable data={MOCK_CITATION_DATA.cited_by.table} />
          </div>
        </div>

        <p className="text-sm text-gray-500 w-full text-center">
          Citations data obtained from Google Scholar, profile of Lee Xiao Koon.
        </p>
      </Card>
    </div>
  );
};

export default CitationSection;
