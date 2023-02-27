import { Card, Badge } from "components";

interface CommonSectionProps {
  title: string;
  data: string[];
  onClickBadge?: (item: string) => void;
}

const CommonSection = ({ title, data, onClickBadge }: CommonSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-6 text-xl font-bold text-gray-700">{title}</h2>

        <div className="flex flex-wrap items-start justify-start gap-y-4 gap-x-4">
          {data.map((item) => (
            <Badge key={item} text={item} onClickBadge={onClickBadge} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CommonSection;
