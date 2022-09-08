import { Card, Badge } from "components";
import { ImgPlusCircleOutline, ImgPencilSquareOutline } from "assets";

interface PubMedNamesSectionProps {
  data: string[];
}

const PubMedNamesSection = ({ data }: PubMedNamesSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <div className="flex flex-wrap items-center justify-start gap-y-4 gap-x-4">
          {data.map((item) => (
            <Badge key={item} text={item} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PubMedNamesSection;
