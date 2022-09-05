import { Card, Badge } from "components";

interface CommonSectionProps {
  title: string;
  data: string[];
}

const CommonSection = ({ title, data }: CommonSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-5 text-xl font-bold text-gray-700">{title}</h2>

        <div className="flex space-x-4">
          {data.map((item) => (
            <Badge text={item} onClick={() => {}} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CommonSection;
