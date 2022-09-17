import { GetMe } from "api/models";
import { Card, Badge } from "components";

interface PubMedNamesSectionProps {
  data: GetMe.Data;
}

const PubMedNamesSection = ({ data }: PubMedNamesSectionProps) => {
  if (!data?.pubmedNames) return null;

  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-5 text-xl font-semibold text-gray-700">
          PubMed Names
        </h2>

        <div className="flex flex-wrap items-center justify-start gap-y-4 gap-x-4">
          {data?.pubmedNames?.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PubMedNamesSection;
