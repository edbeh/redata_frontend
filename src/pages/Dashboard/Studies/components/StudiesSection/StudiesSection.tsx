import { Card } from "components";
import { imgNoData } from "assets";
import { SingleResearch } from "api/models";

interface StudiesSectionProps {
  data: SingleResearch[];
  withHeader?: boolean;
}

const StudiesSection = ({ data, withHeader }: StudiesSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        {withHeader && (
          <h2 className="mb-6 text-xl font-bold text-gray-800">Studies</h2>
        )}

        {data.length === 0 ? (
          <div className="flex flex-col w-full my-10">
            <img
              className="self-center"
              src={imgNoData}
              alt="not-found"
              width={130}
              height={130}
            />
            <p className="text-center font-semibold mt-4">No studies found</p>
            <p className="text-center mt-2">
              There are no saved studies in the profile yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full ml-[-10px] sm:mt-2 sm:ml-0"></div>
        )}
      </Card>
    </div>
  );
};

export default StudiesSection;
