import { Card, Badge } from "components";

interface PubMedNamesSectionProps {
  data: string[];
}

const PubMedNamesSection = ({ data }: PubMedNamesSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-5 text-xl font-semibold text-gray-700">
          My PubMed Names
        </h2>

        <div className="flex flex-wrap items-start justify-start gap-y-4 gap-x-4">
          {data.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PubMedNamesSection;
